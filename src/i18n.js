// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          app: { title: 'Sustainable Land Planner' },
          lang: { toggle: 'Switch to Kannada' },
          inputs: {
            title: 'Enter Plot Details',
            district: {
              label: 'District (Karnataka)',
              placeholder: 'e.g., Mandya, Belgaum',
              autoFilled: 'Auto-filled from district'
            },
            length: { label: 'Length (meters)', placeholder: '50' },
            width: { label: 'Width (meters)', placeholder: '30' },
            soil: { 
              label: 'Soil Type', 
              loamy: 'Loamy', 
              clay: 'Clay',
              sandy: 'Sandy',
              red: 'Red Soil'
            },
            trees: {
              label: 'Select Trees (for borders)',
              options: [
                { value: 'mango', label: 'Mango Tree' },
                { value: 'neem', label: 'Neem Tree' },
                { value: 'coconut', label: 'Coconut Tree' },
                { value: 'tamarind', label: 'Tamarind Tree' }
              ]
            },
            crops: {
              label: 'Select Crops (for center)',
              options: [
                { value: 'maize', label: 'Maize' },
                { value: 'sorghum', label: 'Sorghum' },
                { value: 'legumes', label: 'Legumes (N-fixing)' },
                { value: 'cotton', label: 'Cotton' },
                { value: 'ragi', label: 'Ragi (Finger Millet)' }
              ]
            },
            waterSource: {
              label: 'Water Source',
              rainfed: 'Rainfed (No irrigation)',
              borewell: 'Borewell',
              pond: 'Pond/Tank',
              river: 'River/Stream'
            },
            numCrops: {
              label: "How many crops do you want to grow?",
              placeholder: "e.g., 2"
            },
            numTrees: {
              label: "How many tree types do you want to grow?",
              placeholder: "e.g., 1"
            },
            formation: {
              label: 'Cropping Formation',
              standard: 'Block Formation (Trees on Border)',
              intercropping: 'Relay Cropping (Sequential Crops)',
              alley: 'Alley Cropping (Crops Between Tree Rows)'
            },
            rainfall: { label: 'Annual Rainfall (mm)', placeholder: '600' },
            submit: 'Draw & Plan',
            validation: {
              select: 'Please select at least one tree or crop'
            }
          },
          viz: { title: 'Your Land Layout' }
        }
      },
      kn: {
        translation: {
          app: { title: 'ಸುಸ್ಥಿರ ಜಮೀನು ಯೋಜನೆ' },
          lang: { toggle: 'English ಗೆ ಬದಲಾಯಿಸಿ' },
          inputs: {
            title: 'ಜಮೀನು ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ',
            district: {
              label: 'ಜಿಲ್ಲೆ (ಕರ್ನಾಟಕ)',
              placeholder: 'ಉದಾ: ಮಂಡ್ಯ, ಬೆಳಗಾವಿ',
              autoFilled: 'ಜಿಲ್ಲೆಯಿಂದ ಸ್ವಯಂ-ಭರ್ತಿ'
            },
            length: { label: 'ಉದ್ದ (ಮೀಟರ್)', placeholder: '50' },
            width: { label: 'ಅಗಲ (ಮೀಟರ್)', placeholder: '30' },
            soil: { 
              label: 'ಮಣ್ಣಿನ ವಿಧ', 
              loamy: 'ಹಳ್ಳು ಮಣ್ಣು', 
              clay: 'ಜೇಡಿಮಣ್ಣು',
              sandy: 'ಮರಳು ಮಣ್ಣು',
              red: 'ಕೆಂಪು ಮಣ್ಣು'
            },
            trees: {
              label: 'ಮರಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ (ಗಡಿಗಾಗಿ)',
              options: [
                { value: 'mango', label: 'ಮಾವಿನ ಮರ' },
                { value: 'neem', label: 'ಬೇವಿನ ಮರ' },
                { value: 'coconut', label: 'ತೆಂಗಿನ ಮರ' },
                { value: 'tamarind', label: 'ಹುಣಸೆ ಮರ' }
              ]
            },
            crops: {
              label: 'ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ (ಮಧ್ಯಕ್ಕಾಗಿ)',
              options: [
                { value: 'maize', label: 'ಜೋಳ' },
                { value: 'sorghum', label: 'ಜೋಳ (ಸೋರ್ಗಮ್)' },
                { value: 'legumes', label: 'ಅವರೆಕಾಳು (ಸಾರಜನಕ)' },
                { value: 'cotton', label: 'ಹತ್ತಿ' },
                { value: 'ragi', label: 'ರಾಗಿ' }
              ]
            },
            waterSource: {
              label: 'ನೀರಿನ ಮೂಲ',
              rainfed: 'ಮಳೆನೀರು (ಯಾವುದೇ ಸಿಂಚನ ಇಲ್ಲ)',
              borewell: 'ಬೋರ್ವೆಲ್',
              pond: 'ಕೊಳ / ಟ್ಯಾಂಕ್',
              river: 'ನದಿ / ಹಳ್ಳ'
            },
            numCrops: {
              label: "ನೀವು ಎಷ್ಟು ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯಲು ಬಯಸುತ್ತೀರಿ?",
              placeholder: "ಉದಾ: 2"
            },
            numTrees: {
              label: "ನೀವು ಎಷ್ಟು ಮರಗಳನ್ನು ಬೆಳೆಯಲು ಬಯಸುತ್ತೀರಿ?",
              placeholder: "ಉದಾ: 1"
            },
            formation: {
              label: 'ಬೆಳೆ ವ್ಯವಸ್ಥೆ',
              standard: 'ಪ್ರಮಾಣಿತ (ಗಡಿಯಲ್ಲಿ ಮರಗಳು)',
              intercropping: 'ರಿಲೇ ಕ್ರಾಪಿಂಗ್ (ಅನುಕ್ರಮ ಬೆಳೆಗಳು)',
              alley: 'ಆಲಿ ಕ್ರಾಪಿಂಗ್ (ಮರಗಳ ನಡುವೆ ಬೆಳೆಗಳು)'
            },
            rainfall: { label: 'ವಾರ್ಷಿಕ ಮಳೆ (ಮಿ.ಮೀ)', placeholder: '600' },
            submit: 'ಚಿತ್ರಿಸಿ & ಯೋಜಿಸಿ',
            validation: {
              select: 'ಕನಿಷ್ಠ ಒಂದು ಮರ ಅಥವಾ ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ'
            }
          },
          viz: { title: 'ನಿಮ್ಮ ಜಮೀನು ವಿನ್ಯಾಸ' }
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;