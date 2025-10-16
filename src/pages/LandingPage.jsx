import React, { useState } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';


const translations = {
  english: {
    mainTitle: 'SasyaYojana',
    mainTagline: 'Smart Farm Planning & Financial Insights',
    whyTitle: 'Why SasyaYojana?',
    whySubtitle:
      'Complete farm planning platform that combines financial analysis with agroforestry design and multi-cropping strategies',
    feature1Title: 'Financial Analysis',
    feature1Text:
      "Get 10-year income projections, cost breakdowns, break-even analysis, and ROI calculations. Understand your farm's profitability from year one.",
    feature2Title: 'Agroforestry Trees',
    feature2Text:
      'Get expert recommendations on selecting agroforestry trees suited to your region, climate, and soil. Learn income and conservation benefits.',
    feature3Title: 'Multi-Crop Design',
    feature3Text:
      'Design optimal multi-cropping combinations for maximum yield and soil health. Get combinations that work together, not against each other.',
    feature4Title: 'Land Planning Layout',
    feature4Text:
      'Visualize your entire farm layout with trees, crops, and irrigation placement. See exactly how your multi-cropping plan will look in reality.',
    feature5Title: 'Smart Insights',
    feature5Text:
      'Get actionable advice on cost management, profit optimization, and farming best practices. Data-driven recommendations tailored to your farm.',
    feature6Title: 'Local Language Support',
    feature6Text:
      'Available in English and Kannada. Complete farm planning tool that speaks your language.',
    ctaTitle: 'Ready to Plan Your Sustainable Farm?',
    ctaText:
      'Design your multi-crop, agroforestry farm with complete financial planning. Free, no login required. Available in English and Kannada.',
    ctaBtn: 'Start Planning Now',
    footerText:
      '© 2025 SasyaYojana. Empowering farmers with clear planting strategies, economic foresight and visual guidance',
  },
  kannada: {
    mainTitle: 'ಸಸ್ಯಯೋಜನ',
    mainTagline: 'ಸ್ಮಾರ್ಟ್ ಜಮೀನಿನ ಯೋಜನೆ ಮತ್ತು ಆರ್ಥಿಕ ಒಳನೋಟ',
    whyTitle: 'ಸಸ್ಯಯೋಜನ ಏಕೆ?',
    whySubtitle:
      'ಆರ್ಥಿಕ ವಿಶ್ಲೇಷಣೆ, ಕಾಂತರ ಕೃಷಿ ವೃಕ್ಷ ಮತ್ತು ಬಹುಫಸಲು ಯೋಜನೆಯನ್ನು ಸಂಯೋಜಿಸುವ ಸಂಪೂರ್ಣ ಜಮೀನಿನ ಯೋಜನೆ ವೇದಿಕೆ',
    feature1Title: 'ಆರ್ಥಿಕ ವಿಶ್ಲೇಷಣೆ',
    feature1Text:
      '10 ವರ್ಷದ ಆದಾಯ ಪ್ರಕ್ಷೇಪಣ, ಖರ್ಚ ವಿಭಜನೆ, ಬ್ರೇಕ್-ಇವನ್ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ROI ಲೆಕ್ಕಾಚಾರ ಪಡೆಯಿರಿ. ಪ್ರಥಮ ವರ್ಷದಿಂದ ನಿಮ್ಮ ಜಮೀನಿನ ಲಾಭಜನಕತೆ ಅರ್ಥ ಮಾಡಿಕೊಳ್ಳಿ.',
    feature2Title: 'ಕಾಂತರ ಕೃಷಿ ಮರಗಳು',
    feature2Text:
      'ನಿಮ್ಮ ಪ್ರದೇಶ, ಹವಾಮಾನ ಮತ್ತು ಮಣ್ಣಿಗೆ ಸೂಕ್ತವಾದ ಕಾಂತರ ಕೃಷಿ ಮರಗಳನ್ನು ಆರಿಸುವುದರ ವಿಷಯದಲ್ಲಿ ತಜ್ಞ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ.',
    feature3Title: 'ಬಹುಫಸಲು ವಿನ್ಯಾಸ',
    feature3Text:
      'ಗರಿಷ್ಠ ಇಳುವರಿ ಮತ್ತು ಮಣ್ಣಿನ ಆರೋಗ್ಯಕ್ಕಾಗಿ ಅಗ್ರ ಬಹುಫಸಲು ಸಂಯೋಜನೆಗಳನ್ನು ಡಿಜೈನ್ ಮಾಡಿ.',
    feature4Title: 'ಭೂಮಿ ಯೋಜನೆಯ ವಿನ್ಯಾಸ',
    feature4Text:
      'ಮರಗಳು, ಫಸಲುಗಳು ಮತ್ತು ನೀರಾವರೆ ತೋಳುಗಳ ಜೊತೆಗೆ ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಜಮೀನಿನ ವಿನ್ಯಾಸವನ್ನು ದೃಶ್ಯೀಕರಿಸಿ.',
    feature5Title: 'ಸ್ಮಾರ್ಟ್ ಒಳನೋಟ',
    feature5Text:
      'ಖರ್ಚ ನಿರ್ವಹಣೆ, ಲಾಭ ಅನುಕೂಲನ ಮತ್ತು ಕೃಷಿ ಉತ್ತಮ ಅಭ್ಯಾಸಗಳ ವಿಷಯದಲ್ಲಿ ಕ್ರಿಯಾಶೀಲ ಸಲಹೆ ಪಡೆಯಿರಿ.',
    feature6Title: 'ಸ್ಥಳೀಯ ಭಾಷೆ ಬೆಂಬಲ',
    feature6Text:
      'ಇಂಗ್ರಿಜಿ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ ಲಭ್ಯ. ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಮಾತನಾಡುವ ಸಂಪೂರ್ಣ ಜಮೀನಿನ ಯೋಜನೆ ಸಾಧನ.',
    ctaTitle: 'ನಿಮ್ಮ ಟಾಳೆಯೊಗ್ಲೂ ಜಮೀನಿನ ಯೋಜನೆ ಮಾಡಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
    ctaText:
      'ಸಂಪೂರ್ಣ ಆರ್ಥಿಕ ಯೋಜನೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಬಹುಫಸಲು, ಕಾಂತರ ಕೃಷಿ ಜಮೀನಿನ ವಿನ್ಯಾಸ ಮಾಡಿ. ಉಚಿತ, ಲಾಗಿನ್ ಅಗತ್ಯವಿಲ್ಲ.',
    ctaBtn: 'ಈಗ ಯೋಜನೆ ಪ್ರಾರಂಭಿಸಿ',
    footerText:
      '© 2025 SasyaYojana. Empowering farmers with clear planting strategies, economic foresight and visual guidance',
  },
};

export default function LandingPage() {
  const [lang, setLang] = useState('english');
  const t = translations[lang];

  return (
    <div className="landing">
      <div className="language-toggle">
        <button
          className={`lang-btn ${lang === 'english' ? 'active' : ''}`}
          onClick={() => setLang('english')}
        >
          English
        </button>
        <button
          className={`lang-btn ${lang === 'kannada' ? 'active' : ''}`}
          onClick={() => setLang('kannada')}
        >
          ಕನ್ನಡ
        </button>
      </div>

      <header className="header">
        <div className="logo">🌾 {t.mainTitle}</div>
        <p className="tagline">{t.mainTagline}</p>
      </header>

      <div className="hero-video">
        <div className="video-container">
          <video autoPlay muted loop playsInline>
            <source
              src="https://pixabay.com/videos/download/video-152740_tiny.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <section className="why-section">
        <h2 className="section-title">{t.whyTitle}</h2>
        <p className="section-subtitle">{t.whySubtitle}</p>

        <div className="features-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">
                {['📊', '🌳', '🌾', '🎨', '💡', '🌍'][i - 1]}
              </div>
              <h3>{t[`feature${i}Title`]}</h3>
              <p>{t[`feature${i}Text`]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaText}</p>
        <Link to="/app" className="cta-btn">
  {t.ctaBtn}
</Link>

      </section>

      <footer className="footer">
        <p className="footer-text">{t.footerText}</p>
      </footer>
    </div>
  );
}
