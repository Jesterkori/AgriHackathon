// src/data/karnatakaDistricts.js
export const KARNATAKA_DISTRICTS = {
  "Bagalkot": {
    rainfall: 580,
    soil: "black",
    majorCrops: ["cotton", "maize", "sorghum"],
    notes: "Drought-prone; cotton is dominant."
  },
  "Bangalore Rural": {
    rainfall: 950,
    soil: "red",
    majorCrops: ["ragi", "maize", "vegetables"],
    notes: "Good rainfall; supports diverse crops."
  },
  "Belgaum": {
    rainfall: 750,
    soil: "black",
    majorCrops: ["sugarcane", "maize", "ragi"],
    notes: "High sugarcane production."
  },
  "Bellary": {
    rainfall: 600,
    soil: "red",
    majorCrops: ["groundnut", "cotton", "sorghum"],
    notes: "Low rainfall; drought-resistant crops preferred."
  },
  "Bidar": {
    rainfall: 730,
    soil: "black",
    majorCrops: ["maize", "sorghum", "pulses"],
    notes: "Known for maize production."
  },
  "Chamarajanagar": {
    rainfall: 850,
    soil: "red",
    majorCrops: ["sugarcane", "ragi", "cotton"],
    notes: "Moderate rainfall; mixed cropping."
  },
  "Chikmagalur": {
    rainfall: 1900,
    soil: "laterite",
    majorCrops: ["coffee", "pepper", "arecanut"],
    notes: "High rainfall; ideal for plantation crops."
  },
  "Chitradurga": {
    rainfall: 550,
    soil: "red",
    majorCrops: ["ragi", "groundnut", "cotton"],
    notes: "Arid region; ragi is staple."
  },
  "Dakshina Kannada": {
    rainfall: 3500,
    soil: "laterite",
    majorCrops: ["arecanut", "coconut", "cashew"],
    notes: "Very high rainfall; coastal crops."
  },
  "Dharwad": {
    rainfall: 800,
    soil: "black",
    majorCrops: ["maize", "sugarcane", "onion"],
    notes: "Maize research hub."
  },
  "Gadag": {
    rainfall: 550,
    soil: "black",
    majorCrops: ["cotton", "sorghum", "pulses"],
    notes: "Low rainfall; cotton dominant."
  },
  "Gulbarga": {
    rainfall: 700,
    soil: "black",
    majorCrops: ["jowar", "cotton", "pulses"],
    notes: "Traditional sorghum-growing region."
  },
  "Hassan": {
    rainfall: 800,
    soil: "red",
    majorCrops: ["ragi", "coffee", "sugarcane"],
    notes: "Mixed cropping; ragi widely grown."
  },
  "Haveri": {
    rainfall: 650,
    soil: "black",
    majorCrops: ["cotton", "maize", "sugarcane"],
    notes: "Cotton belt of Karnataka."
  },
  "Kodagu": {
    rainfall: 3000,
    soil: "laterite",
    majorCrops: ["coffee", "cardamom", "pepper"],
    notes: "Plantation crops dominate."
  },
  "Kolar": {
    rainfall: 650,
    soil: "red",
    majorCrops: ["mango", "ragi", "groundnut"],
    notes: "Famous for mango orchards."
  },
  "Mandya": {
    rainfall: 750,
    soil: "black",
    majorCrops: ["sugarcane", "rice", "ragi"],
    notes: "Sugarcane heartland (Cauvery basin)."
  },
  "Mysore": {
    rainfall: 750,
    soil: "red",
    majorCrops: ["ragi", "sugarcane", "maize"],
    notes: "Diverse agriculture; ragi staple."
  },
  "Raichur": {
    rainfall: 650,
    soil: "black",
    majorCrops: ["cotton", "pulses", "sorghum"],
    notes: "Cotton and pulse cultivation."
  },
  "Ramanagara": {
    rainfall: 800,
    soil: "red",
    majorCrops: ["sericulture", "ragi", "maize"],
    notes: "Silk production; ragi common."
  },
  "Shimoga": {
    rainfall: 1800,
    soil: "laterite",
    majorCrops: ["arecanut", "coffee", "rice"],
    notes: "High rainfall; arecanut dominant."
  },
  "Tumkur": {
    rainfall: 650,
    soil: "red",
    majorCrops: ["groundnut", "ragi", "coconut"],
    notes: "Groundnut is major crop."
  },
  "Udupi": {
    rainfall: 4000,
    soil: "laterite",
    majorCrops: ["arecanut", "coconut", "cashew"],
    notes: "Coastal; very high rainfall."
  },
  "Uttara Kannada": {
    rainfall: 3200,
    soil: "laterite",
    majorCrops: ["arecanut", "coconut", "rice"],
    notes: "Heavy rainfall; plantation crops."
  },
  "Vijayapura": {
    rainfall: 550,
    soil: "black",
    majorCrops: ["cotton", "sorghum", "pulses"],
    notes: "Drought-prone; cotton dominant."
  },
  "Yadgir": {
    rainfall: 650,
    soil: "black",
    majorCrops: ["cotton", "sorghum", "pulses"],
    notes: "Emerging cotton belt."
  }
};

// Helper: Normalize district name
export const normalizeDistrict = (input) => {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/(?:^|\s)(\w)/g, (match) => match.toUpperCase());
};