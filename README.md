# 🌾 SasyaYojana - Smart Farm Planning & Financial Insights

A comprehensive farm planning platform that combines financial analysis, agroforestry design, and multi-cropping strategies for Karnataka farmers.

**Platform:** Web Application (React + Vite)  
**Languages:** English & Kannada  
**Status:** Production Ready

---

## What is SasyaYojana?

SasyaYojana empowers farmers to make data-driven decisions about their land with a complete farm planning toolkit:

### Core Features

1. **Financial Analysis** 
   - 10-year income projections
   - Cost breakdowns and ROI calculations
   - Break-even analysis
   - Bilingual economic insights

2. **Agroforestry Planning**
   - AI-powered tree recommendations (Mango, Neem, Coconut, Tamarind)
   - Region & climate-specific suggestions
   - Income and conservation benefits analysis

3. **Multi-Crop Design**
   - Optimal crop combinations for your soil and water conditions
   - Crop options: Maize, Ragi, Legumes, Sorghum, Cotton
   - Compatible crop pairings for better yields

4. **Visual Farm Layout**
   - Interactive canvas visualization
   - Real-time plant spacing calculations
   - Three formation types: Block, Relay Cropping, Alley Cropping
   - See your entire farm plan before planting

5. **Smart Recommendations**
   - District-specific insights (Bangalore Rural, Chitradurga, Dharwad, etc.)
   - Water source assessment (Rainfed, Borewell, Pond, River)
   - Soil type optimization (Red, Clay, Loamy, Sandy)
   - Actionable farming tips based on regional practices

6. **Local Language Support**
   - Complete interface in English and Kannada
   - Farmer-friendly explanations
   - No login required, completely free

---

## Tech Stack

**Frontend:**
- React 18 + Vite (fast HMR, optimized builds)
- React Router (multi-page navigation)
- React Hook Form (form state management)
- Recharts (economic data visualization)
- Konva (interactive canvas rendering)
- i18next (bilingual translations)
- Tailwind CSS (responsive styling)

**AI & APIs:**
- Google Generative AI (Gemini 2.0 Flash)
- Context-aware prompt engineering for farming recommendations

**Build & Deployment:**
- Vite build tool
- Node.js 16+

---

## Installation & Setup

### Prerequisites
- Node.js 16 or higher
- npm or yarn
- Google Gemini API key (get it at [console.cloud.google.com](https://console.cloud.google.com))

### Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/Jesterkori/AgriHackathon.git
   cd landmanage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   VITE_GEMINI_KEY=your_actual_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

5. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

---

## How It Works

### User Journey

1. **Landing Page**
   - Learn about SasyaYojana's features
   - Choose language (English/Kannada)
   - Start farm planning

2. **Farm Configuration**
   - Enter plot dimensions (length × width in meters)
   - Select soil type (Red, Clay, Loamy, Sandy)
   - Specify annual rainfall
   - Choose water source
   - Select cropping formation

3. **AI Recommendations (Optional)**
   - Enable AI to suggest optimal crops/trees
   - Specify how many crop types and tree types
   - AI analyzes your district, rainfall, soil, water availability

4. **Visualization**
   - Interactive canvas shows your farm layout
   - Trees placed on borders for windbreak/shade
   - Crops arranged in center field
   - Real-time plant count calculations based on spacing

5. **Economic Analysis**
   - View 10-year income projections
   - Analyze cost distribution (labor, seeds, irrigation, etc.)
   - Detailed year-by-year breakdown
   - Understand profitability and break-even point

---

## Project Structure

```
landmanage/
├── src/
│   ├── components/
│   │   ├── Inputs/
│   │   │   └── PlotForm.jsx           # Farm details form
│   │   ├── Viz/
│   │   │   └── LandCanvas.jsx         # Konva visualization
│   │   └── EndingPage.jsx             # Economic dashboard
│   ├── pages/
│   │   └── LandingPage.jsx            # Home page
│   ├── data/
│   │   └── karnatakaDistri...js       # District database (31 districts)
│   ├── App.jsx                        # Main farm planner
│   ├── i18n.js                        # i18next configuration
│   └── main.jsx
├── public/                            # Static assets
├── .env.example                       # Environment template
├── .gitignore
├── vite.config.js
├── eslint.config.js
├── package.json
├── README.md
├── LICENSE
└── index.html
```

**Note:** `index3.html` is unused and can be deleted.

---

## Karnataka Districts Supported

Full coverage of all 31 districts with region-specific data:
- Rainfall patterns
- Common crops by district
- Soil type distribution
- Water availability
- Market demand

---

## Key Insights for Farmers

### Why AI Recommendations?
- Analyzes your specific district's climate & soil
- Recommends crops already proven successful in your area
- Considers water availability and sustainability
- Explains WHY each crop is recommended

### Economic Insights
- Year 1: Investment phase (low/no income)
- Year 2: Break-even and initial profits
- Year 3+: Steady income growth
- Year 10: Significant cumulative returns

### Multi-Cropping Benefits
- Better soil health through crop rotation
- Reduced pest pressure
- More stable income (not dependent on single crop)
- Optimal use of available land

---

## Future Roadmap

- [ ] Weather forecast integration
- [ ] Market price predictions
- [ ] Soil health monitoring
- [ ] Pest/disease calendar
- [ ] Government scheme eligibility checker
- [ ] PDF export for farm plans
- [ ] Mobile app (React Native)
- [ ] Farmer community forum
- [ ] Integration with agricultural departments

---

## Development Guide

### Adding New Districts
Edit `src/data/karnatakaDistricts.js` with new district data structure.

### Customizing Crop/Tree Options
Update `CROP_CONFIG` and `TREE_CONFIG` in `src/App.jsx`.

### Translating to New Languages
1. Add language object in `src/i18n.js`
2. Provide all translation keys
3. Update language toggle in components

### Modifying AI Prompts
Edit the Gemini prompt in `src/App.jsx` `handleSubmit()` function for different recommendations.

---

## Known Limitations

- Requires internet connection (for Gemini API)
- Economic projections are estimates (actual results vary)
- Designed specifically for Karnataka regions
- Canvas visualization optimized for modern browsers

---

## Testing

```bash
# Development testing
npm run dev

# Build and preview production
npm run build
npm run preview

# Linting
npm run lint
```

---

## License

MIT License - See LICENSE file for details.

This project is open-source and available for use, modification, and distribution under the MIT License.

---

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push branch: `git push origin feature/your-feature`
5. Open Pull Request

---

## Support & Feedback

- **Report Issues:** [GitHub Issues](https://github.com/Jesterkori/AgriHackathon/issues)
- **Feature Requests:** [Discussions](https://github.com/Jesterkori/AgriHackathon/discussions)

---

## Acknowledgments

- Google Gemini AI for intelligent recommendations
- Karnataka Agricultural Department for regional data
- React, Vite, and open-source communities
- Farmers who provided feedback during development

---

**Empowering farmers with clear planting strategies, economic foresight, and visual guidance.**

🌾 SasyaYojana - Farm Planning Made Simple
