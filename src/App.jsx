import { useState } from 'react';
import PlotForm from './components/Inputs/PlotForm';
import LandCanvas from './components/Viz/LandCanvas';
import { useTranslation } from 'react-i18next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './i18n';
import { useNavigate } from "react-router-dom";

const CROP_CONFIG = {
  maize: { color: '#FFD700', name: 'Maize', spacing: 0.75 },
  sorghum: { color: '#CD853F', name: 'Sorghum', spacing: 0.45 },
  legumes: { color: '#90EE90', name: 'Legumes', spacing: 0.30 },
  cotton: { color: '#F5F5DC', name: 'Cotton', spacing: 0.90 },
  ragi: { color: '#8B4513', name: 'Ragi', spacing: 0.20 }
};

const TREE_CONFIG = {
  mango: { color: '#FF8C00', name: 'Mango', spacing: 6 },
  neem: { color: '#228B22', name: 'Neem', spacing: 5 },
  coconut: { color: '#8B4513', name: 'Coconut', spacing: 7 },
  tamarind: { color: '#654321', name: 'Tamarind', spacing: 8 }
};

// Helper to parse spacing value
const parseSpacing = (spacingStr, isTree = false) => {
  if (typeof spacingStr === 'number') return spacingStr;
  if (!spacingStr) return isTree ? 6 : 0.75;
  
  const str = String(spacingStr).toLowerCase().trim();
  const num = parseFloat(str);
  
  if (str.includes('cm')) return num / 100;
  if (str.includes('m')) return num;
  return isTree ? 6 : 0.75;
};

// Helper to format spacing for display
const formatSpacing = (spacingMeters, isTree = false) => {
  if (spacingMeters >= 1) return `${spacingMeters}m`;
  return `${(spacingMeters * 100).toFixed(0)}cm`;
};

function App() {
  const { t, i18n } = useTranslation();
  const [plotData, setPlotData] = useState(null);
  const [aiRecs, setAiRecs] = useState(null);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_GEMINI_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  const handleSubmit = async (data) => {
    setPlotData(data);
    setAiRecs(null);
    setError(null);
    setLoading(true);

    const area = data.width * data.length;
    const selectedTrees = data.trees || [];
    const selectedCrops = data.crops || [];

    // If NOT recommending crops, use manual selection directly (no AI needed)
    if (!data.recommendCrops && (selectedTrees.length > 0 || selectedCrops.length > 0)) {
      try {
        let normalizedZones = [];
        const formation = data.formation || 'block';

        // Add selected trees
        selectedTrees.forEach(tree => {
          const config = TREE_CONFIG[tree] || TREE_CONFIG.mango;
          const spacingM = config.spacing;
          const count = Math.max(1, Math.floor((area * 0.15) / (spacingM * spacingM)));
          normalizedZones.push({
            area: 'border-all',
            type: 'tree',
            color: config.color,
            label: config.name,
            icon: 'circle',
            count,
            reason: 'Selected for border planting.',
            spacing: formatSpacing(spacingM, true),
            spacingMeters: spacingM
          });
        });

        // Add selected crops
        selectedCrops.forEach(crop => {
          const config = CROP_CONFIG[crop] || CROP_CONFIG.maize;
          const spacingM = config.spacing;
          const count = Math.max(1, Math.floor((area * 0.85) / (spacingM * spacingM)));
          normalizedZones.push({
            area: 'center',
            type: 'crop',
            color: config.color,
            label: config.name,
            icon: 'dots',
            count,
            reason: 'Selected for planting.',
            spacing: formatSpacing(spacingM, false),
            spacingMeters: spacingM
          });
        });

        const finalRecs = {
          zones: normalizedZones,
          formation,
          economic: {
            yield: 'Based on selected crops',
            benefit: '+20% income from agroforestry',
            cost: '₹' + (area * 50)
          },
          tips: [
            'Maintain proper spacing between plants for optimal growth.',
            'Water regularly during dry seasons.',
            'Practice crop rotation to maintain soil fertility.'
          ]
        };

        setAiRecs(finalRecs);
        setLoading(false);
        return;
      } catch (err) {
        console.error('Manual selection error:', err);
        setError('Error processing manual selection');
        setLoading(false);
        return;
      }
    }

    // If recommendCrops is TRUE, use AI
    if (!genAI) {
      setError('AI not available: Missing API key (VITE_GEMINI_KEY)');
      setLoading(false);
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const numTreesRequested = data.numTrees || 1;
      const numCropsRequested = data.numCrops || 2;

      const prompt = `You are an expert agricultural advisor for smallholder farmers in Karnataka. Provide practical, farmer-friendly recommendations with LOCAL INSIGHTS.

User's Farm Details:
- District: ${data.district || 'Not specified'}
- Plot: ${data.width}m × ${data.length}m (${area}m²)
- Soil Type: ${data.soil}
- Annual Rainfall: ${data.rainfall}mm
- Water Source: ${data.waterSource || 'rainfed'}
- Cropping Formation: ${data.formation || 'block'}

CRITICAL REQUIREMENTS:
- Return EXACTLY ${numTreesRequested} tree type(s) if > 0
- Return EXACTLY ${numCropsRequested} different crop type(s) if > 0
- Each crop/tree MUST be in a separate zone entry
- Do NOT repeat crop types
- Include 3-4 actionable farming tips specific to this district and water situation

REQUIRED JSON (raw JSON, NO markdown):
{
  "zones": [
    ${numTreesRequested > 0 ? `{
      "tree_details": {
        "type": "Neem",
        "spacing_meters": 5,
        "count": 30,
        "reason": "Why this tree: Based on ${data.district} climate - provides windbreak, controls pests naturally. Common in region for 200+ years. Requires minimal water even in rainfed areas.",
        "local_benefit": "Medicinal value + shade + livestock feed"
      }
    }${numCropsRequested > 0 ? ',' : ''}` : ''}
    ${numCropsRequested > 0 ? Array.from({length: numCropsRequested}, (_, i) => `{
      "crop_details": {
        "type": "${['Maize', 'Ragi', 'Legumes', 'Sorghum', 'Cotton'][i]}",
        "spacing_meters": ${[0.75, 0.2, 0.3, 0.45, 0.9][i]},
        "count": ${Math.floor(area * 0.85 / Math.pow([0.75, 0.2, 0.3, 0.45, 0.9][i], 2))},
        "reason": "Why ${['Maize', 'Ragi', 'Legumes', 'Sorghum', 'Cotton'][i]}: Commonly grown in ${data.district}. Ideal for ${data.rainfall}mm rainfall. Works well with ${data.soil} soil. Market demand is high in this region. Fits your ${data.waterSource} water situation.",
        "yield_potential": "15-20 bags per season",
        "market_value": "Good demand locally"
      }
    }`).join(',\n    ') : ''}
  ],
  "water_assessment": {
    "current_source": "${data.waterSource}",
    "assessment": "${data.waterSource === 'rainfed' ? 'Your rainfed system works but choose drought-tolerant crops. Consider water harvesting to improve.' : data.waterSource === 'borewell' ? 'Reliable borewell access. Can grow water-intensive crops. Monitor groundwater levels in dry season.' : data.waterSource === 'pond' ? 'Pond storage is excellent. Sufficient for most crops year-round. Maintain pond regularly.' : 'River access is ideal. Plan irrigation schedule around monsoon. Check water rights.'}",
    "suggestion": "${data.waterSource === 'rainfed' ? 'Build farm pond or borewell for 1-2 additional crops in dry season' : data.waterSource === 'borewell' ? 'Check borewell depth and recharge capacity - may need upgrade if rainfall is low' : data.waterSource === 'pond' ? 'Maintain water level - pond can support ${numCropsRequested} crops' : 'Ensure legal river water access and plan sprinkler irrigation'}"
  },
  "regional_insights": {
    "district": "${data.district || 'Your area'}",
    "soil_note": "Your ${data.soil} soil suits ${['Maize', 'Ragi', 'Legumes'][Math.floor(Math.random()*3)]}. Add compost annually.",
    "common_crops_here": "Farmers in this region commonly grow 2-3 crops. You can follow same pattern.",
    "best_season": "${data.rainfall > 600 ? 'Kharif (monsoon) is your strongest season' : 'Rabi (winter) works better with dry conditions'}",
    "weather_risk": "${data.rainfall < 400 ? 'SEVERE DROUGHT RISK - plant only drought crops' : data.rainfall < 600 ? 'Moderate drought risk - water management critical' : 'Good rainfall - diversify crops'}"
  },
  "tips": [
    "${data.waterSource === 'rainfed' ? '💧 Water Tip: Practice mulching (2-3 inch organic matter) to retain soil moisture during dry spells.' : '💧 Water Tip: Irrigate 2-3 times per week based on soil moisture. Drip irrigation saves 40% water.'}",
    "🌱 Soil Tip: Add cow manure (5 tons/acre) before monsoon. Improves water holding capacity.",
    "📅 Timing: Plant during first rain of monsoon. Don't delay - affects entire harvest.",
    "🌾 Rotation: Follow this pattern - Legumes → Cereal → Legumes to fix nitrogen naturally.",
    "💰 Market: Sell produce to local mandis in ${data.district}. Form farmer groups for better prices."
  ]
}`;

      const result = await model.generateContent(prompt);
      let responseText = result.response.text().replace(/```json|```/g, '').trim();
      const parsedRecs = JSON.parse(responseText);

      let normalizedZones = [];
      let formation = data.formation || 'block';
      const addedCropNames = new Set(); // Track crop types to avoid duplicates

      if (Array.isArray(parsedRecs.zones)) {
        parsedRecs.zones.forEach(zone => {
          // Tree zone
          if (zone.tree_details) {
            const tree = zone.tree_details;
            const plantName = tree.type || 'Unknown';

            const treeMatch = Object.entries(TREE_CONFIG).find(([key, val]) =>
              plantName.toLowerCase().includes(key) || plantName.toLowerCase().includes(val.name.toLowerCase())
            );

            const config = treeMatch ? TREE_CONFIG[treeMatch[0]] : TREE_CONFIG.mango;
            const spacingMeters = typeof tree.spacing_meters === 'number' 
              ? tree.spacing_meters 
              : parseSpacing(tree.spacing_meters, true);
            const count = Math.max(1, Math.floor(tree.count || 10));

            normalizedZones.push({
              area: 'border-all',
              type: 'tree',
              color: config.color,
              label: config.name,
              icon: 'circle',
              count,
              reason: tree.reason || 'Recommended for your farm.',
              spacing: formatSpacing(spacingMeters, true),
              spacingMeters
            });
          }

          // Crop zone - avoid duplicates
          if (zone.crop_details) {
            const crop = zone.crop_details;
            const plantName = crop.type || 'Unknown';

            const cropMatch = Object.entries(CROP_CONFIG).find(([key, val]) =>
              plantName.toLowerCase().includes(key) || plantName.toLowerCase().includes(val.name.toLowerCase())
            );

            const config = cropMatch ? CROP_CONFIG[cropMatch[0]] : CROP_CONFIG.maize;
            
            // Skip if this crop type was already added
            if (addedCropNames.has(config.name)) {
              return;
            }
            addedCropNames.add(config.name);

            const spacingMeters = typeof crop.spacing_meters === 'number' 
              ? crop.spacing_meters 
              : parseSpacing(crop.spacing_meters, false);
            const count = Math.max(1, Math.floor(crop.count || 100));

            normalizedZones.push({
              area: 'center',
              type: 'crop',
              color: config.color,
              label: config.name,
              icon: 'dots',
              count,
              reason: crop.reason || 'Recommended for your farm.',
              spacing: formatSpacing(spacingMeters, false),
              spacingMeters
            });
          }

          if (zone.formation) {
            formation = zone.formation;
          }
        });
      }

      // Fallback
      if (normalizedZones.length === 0) {
        console.warn('No zones from AI - using fallback');
        (data.trees || []).forEach(tree => {
          const config = TREE_CONFIG[tree] || TREE_CONFIG.mango;
          const spacingM = config.spacing;
          const count = Math.max(1, Math.floor((area * 0.15) / (spacingM * spacingM)));
          normalizedZones.push({
            area: 'border-all',
            type: 'tree',
            color: config.color,
            label: config.name,
            icon: 'circle',
            count,
            reason: 'Planted on border for shade and windbreak.',
            spacing: formatSpacing(spacingM, true),
            spacingMeters: spacingM
          });
        });
        (data.crops || []).forEach(crop => {
          const config = CROP_CONFIG[crop] || CROP_CONFIG.maize;
          const spacingM = config.spacing;
          const count = Math.max(1, Math.floor((area * 0.85) / (spacingM * spacingM)));
          normalizedZones.push({
            area: 'center',
            type: 'crop',
            color: config.color,
            label: config.name,
            icon: 'dots',
            count,
            reason: 'Grown in center for maximum sunlight.',
            spacing: formatSpacing(spacingM, false),
            spacingMeters: spacingM
          });
        });
      }

      let normalizedTips = [];
      if (Array.isArray(parsedRecs.tips)) {
        normalizedTips = parsedRecs.tips
          .map(tip => typeof tip === 'string' ? tip : String(tip))
          .filter(t => t && t.length > 0);
      }

      const finalRecs = {
        zones: normalizedZones,
        formation,
        economic: {
          yield: parsedRecs.economic?.crop || 'See detailed plan',
          benefit: '+20% income from agroforestry',
          cost: '₹' + (area * 50)
        },
        tips: normalizedTips
      };

      if (!finalRecs.zones?.length) throw new Error('No zones generated');

      setAiRecs(finalRecs);
    } catch (err) {
      console.error('AI Error:', err);
      setError('AI failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'kn' : 'en';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'white', color: '#1a1a1a' }}>
      <header style={{
        background: '#2d5016',
        color: 'white',
        padding: '20px 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '600' }}>
              🌱 {t('app.title')}
            </h1>
            <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
              Plan your agroforestry layout for Karnataka farms
            </p>
          </div>
          <button
            onClick={toggleLang}
            style={{
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {t('lang.toggle')}
          </button>
        </div>
      </header>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'grid',
        gridTemplateColumns: '420px 1fr',
        gap: '40px'
      }}>
        <div style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
          <PlotForm onSubmit={handleSubmit} initialData={plotData} />
        </div>

        <div style={{ flex: '1', minWidth: '0' }}>
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#f8f9fa',
              borderRadius: '12px',
              border: '2px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
              <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
                Planning your farm layout...
              </p>
            </div>
          ) : error ? (
            <div style={{
              padding: '20px',
              background: '#ffebee',
              color: '#c62828',
              borderRadius: '12px',
              border: '2px solid #ef9a9a',
              textAlign: 'center'
            }}>
              ❌ {error}
            </div>
          ) : aiRecs ? (
            <>
              <h2 style={{
                margin: '0 0 20px 0',
                fontSize: '24px',
                color: '#2d5016',
                fontWeight: '600'
              }}>
                {t('viz.title')}
              </h2>

              <LandCanvas plot={plotData} recs={aiRecs} />

              <div style={{
                padding: '20px',
                background: '#e8f5e9',
                borderRadius: '12px',
                marginTop: '20px',
                border: '2px solid #2d5016'
              }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#2d5016', fontSize: '18px' }}>
                  💰 Expected Returns
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div style={{ fontSize: '14px' }}>
                    <strong>Yield:</strong> {aiRecs.economic.yield}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    <strong>Benefit:</strong> {aiRecs.economic.benefit}
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    <strong>Setup Cost:</strong> {aiRecs.economic.cost}
                  </div>
                </div>
              </div>

              <details open style={{ marginTop: '20px' }}>
                <summary style={{
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: '600',
                  padding: '15px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  color: '#2d5016',
                  border: '1px solid #e0e0e0'
                }}>
                  📋 Detailed Farm Plan
                </summary>
                <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                  {aiRecs.zones.map((z, i) => (
                    <div key={i} style={{
                      border: '1px solid #e0e0e0',
                      padding: '15px',
                      borderRadius: '8px',
                      borderLeft: `5px solid ${z.color}`,
                      background: 'white'
                    }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#2d5016', fontSize: '16px' }}>
                        {z.icon === 'circle' ? '🌳' : '🌾'} {z.label}
                      </h4>
                      <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                        <p style={{ margin: '5px 0' }}><strong>Quantity:</strong> {z.count} plants</p>
                        <p style={{ margin: '5px 0' }}><strong>Location:</strong> {z.area === 'border-all' ? 'Border (all sides)' : 'Center field'}</p>
                        <p style={{ margin: '5px 0' }}><strong>Spacing:</strong> {z.spacing}</p>
                        <p style={{ margin: '5px 0', color: '#555' }}><strong>Why:</strong> {z.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </details>

              {/* Water Assessment */}
              {aiRecs.water_assessment && (
                <div style={{
                  marginTop: '20px',
                  padding: '20px',
                  background: '#e3f2fd',
                  borderRadius: '12px',
                  border: '2px solid #1976d2'
                }}>
                  <h3 style={{ margin: '0 0 15px 0', color: '#1565c0', fontSize: '18px' }}>
                    💧 Water Source Assessment
                  </h3>
                  <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                    <p style={{ margin: '8px 0' }}>
                      <strong>Your Source:</strong> {aiRecs.water_assessment.current_source}
                    </p>
                    <p style={{ margin: '8px 0', color: '#1565c0', fontWeight: '500' }}>
                      {aiRecs.water_assessment.assessment}
                    </p>
                    <p style={{ margin: '8px 0', background: '#fff9e6', padding: '10px', borderRadius: '6px', borderLeft: '4px solid #ffc107' }}>
                      <strong>💡 Suggestion:</strong> {aiRecs.water_assessment.suggestion}
                    </p>
                  </div>
                </div>
              )}

              {/* Regional Insights */}
              {aiRecs.regional_insights && (
                <div style={{
                  marginTop: '20px',
                  padding: '20px',
                  background: '#f3e5f5',
                  borderRadius: '12px',
                  border: '2px solid #7b1fa2'
                }}>
                  <h3 style={{ margin: '0 0 15px 0', color: '#6a1b9a', fontSize: '18px' }}>
                    🌍 Regional Insights for {aiRecs.regional_insights.district}
                  </h3>
                  <div style={{ fontSize: '14px', lineHeight: '1.8', display: 'grid', gap: '12px' }}>
                    <div>
                      <strong>📍 Soil Compatibility:</strong> {aiRecs.regional_insights.soil_note}
                    </div>
                    <div>
                      <strong>🌾 Common Crops Here:</strong> {aiRecs.regional_insights.common_crops_here}
                    </div>
                    <div>
                      <strong>📅 Best Season:</strong> {aiRecs.regional_insights.best_season}
                    </div>
                    <div style={{ 
                      padding: '10px', 
                      background: aiRecs.regional_insights.weather_risk.includes('SEVERE') ? '#ffcdd2' : aiRecs.regional_insights.weather_risk.includes('Moderate') ? '#fff9e6' : '#c8e6c9',
                      borderRadius: '6px',
                      borderLeft: aiRecs.regional_insights.weather_risk.includes('SEVERE') ? '4px solid #d32f2f' : aiRecs.regional_insights.weather_risk.includes('Moderate') ? '4px solid #ffc107' : '4px solid #388e3c'
                    }}>
                      <strong>⚠️ Weather Risk:</strong> {aiRecs.regional_insights.weather_risk}
                    </div>
                  </div>
                </div>
              )}

              {/* Farming Tips */}
              {aiRecs.tips && aiRecs.tips.length > 0 && (
                <div style={{
                  marginTop: '20px',
                  padding: '20px',
                  background: '#fff9e6',
                  borderRadius: '12px',
                  border: '2px solid #ffd700'
                }}>
                  <h3 style={{ margin: '0 0 15px 0', color: '#2d5016', fontSize: '18px' }}>
                    💡 Farming Tips & Best Practices
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {aiRecs.tips.map((tip, i) => (
                      <li key={i} style={{ marginBottom: '10px', lineHeight: '1.6', fontSize: '14px' }}>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#f8f9fa',
              borderRadius: '12px',
              border: '2px dashed #d0d0d0'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌾</div>
              <p style={{ fontSize: '18px', color: '#666', margin: 0 }}>
                Configure your plot to see the layout visualization
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px", paddingBottom: "40px" }}>
        <button
          onClick={() => navigate("/ending")}
          style={{
            background: "#2d5016",
            color: "white",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          💹 Economy
        </button>
      </div>
    </div>
  );
}

export default App;