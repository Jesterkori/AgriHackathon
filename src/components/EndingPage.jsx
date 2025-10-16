import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const EndingPage = () => {
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("income");

  const translations = {
    en: {
      title: "Farm Economic Analysis",
      subtitle: "10-year income projection and cost breakdown",
      storyBox: "📖 Your Story: Raj is a farmer. He invested ₹1,20,000 to start his agroforestry farm. Today we'll see how much money he'll make in 10 years.",
      
      card1Label: "Initial Investment",
      card1Explain: "One-time setup cost",
      card1Example: "Average farm setup cost",
      
      card2Label: "Breakeven Year",
      card2Explain: "When you start making profit",
      card2Example: "Profit starts from Year 2 onwards",
      
      card3Label: "10-Year Total",
      card3Explain: "Total cumulative earnings",
      card3Example: "Average ₹1,04,500/year profit",
      
      understandingTitle: "🎯 What does all this mean?",
      understanding1: "❌ Year 1 is tough: You won't get income because the farm is being set up.",
      understanding2: "✅ From Year 2 onwards: You can earn ₹1,50,000 or more.",
      understanding3: "✅ After 10 years: In year 10, you could earn up to ₹1,47,500.",
      understanding4: "✅ Total profit: Over 10 years, earn ₹11,75,000.",
      
      tab1: "Income Projection",
      tab2: "Cost Breakdown",
      tab3: "Detailed Table",
      
      incomeTitle: "Year-wise Income Projection",
      incomeSubtitle: "Your income grows consistently from Year 2 onwards",
      incomeExplanation: "Your income starts at zero in year 1 and grows steadily. By year 10, you reach ₹14,75,000 in annual income. This shows strong farm potential.",
      
      costTitle: "Annual Cost Breakdown",
      costSubtitle: "Where your money goes each year",
      costExplanation: "Labor is your largest expense (37% of costs). Seeds and fertilizer account for 18%. By managing these big expenses, you can improve profits.",
      
      tableTitle: "Year-by-Year Financial Breakdown",
      tableSubtitle: "See exactly how much you earn and spend each year",
      
      finalMessage: "🎉 Remember: All of this depends on working properly. Take care of your farm regularly, keep soil healthy, and plant/harvest at the right time. Then you will definitely succeed!",
      
      year: "Year",
      income: "Income (₹)",
      cost: "Cost (₹)",
      profit: "Profit (₹)",
    },
    kn: {
      title: "ಕೃಷಿ ಆರ್ಥಿಕ ವಿಶ್ಲೇಷಣೆ",
      subtitle: "10 ವರ್ಷದ ಆದಾಯ ಪ್ರಜೆಕ್ಷನ್ ಮತ್ತು ಖರ್ಚ ವಿಭಜನೆ",
      storyBox: "📖 ನಿಮ್ಮ ಕತೆ: ರಾಜ್ ಒಬ್ಬ ರೈತ. ಅವನು ತನ್ನ ಜಮೀನು ಪ್ರಾರಂಭಿಸಲು ₹1,20,000 ಹೂಡಿದ. ಇಂದು 10 ವರ್ಷಗಳಲ್ಲಿ ಅವನಿಗೆ ಎಷ್ಟು ಹಣ ಬರುತ್ತದೆ ಎಂದು ನೋಡುತ್ತೇವೆ.",
      
      card1Label: "ಆರಂಭಿಕ ಹೂಡಿಕೆ",
      card1Explain: "ಒಂದು ಬಾರಿ ಸೆಟಪ್ ಖರ್ಚ",
      card1Example: "ಜಮೀನು ಸೆಟಪ್ ಸರಾಸರಿ ಖರ್ಚ",
      
      card2Label: "ಸಮತೋಲನ ವರ್ಷ",
      card2Explain: "ನೀವು ಲಾಭ ಗಳಿಸಲು ಪ್ರಾರಂಭಿಸುವ ವರ್ಷ",
      card2Example: "ವರ್ಷ 2 ರಿಂದ ಲಾಭ ಪ್ರಾರಂಭ",
      
      card3Label: "10 ವರ್ಷ ಒಟ್ಟು",
      card3Explain: "ಒಟ್ಟು ಸಂಚಿತ ಆದಾಯ",
      card3Example: "ಸರಾಸರಿ ₹1,04,500/ವರ್ಷ ಲಾಭ",
      
      understandingTitle: "🎯 ಇದೆಲ್ಲ ಅರ್ಥ ಏನು?",
      understanding1: "❌ ವರ್ಷ 1 ಕಷ್ಟವಾಗಿರುತ್ತದೆ: ಜಮೀನು ತಯಾರಾಗುವುದರಿಂದ ಆದಾಯ ಬರುವುದಿಲ್ಲ.",
      understanding2: "✅ ವರ್ಷ 2 ರಿಂದ: ನೀವು ₹1,50,000 ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು ಗಳಿಸಬಹುದು.",
      understanding3: "✅ 10 ವರ್ಷ ನಂತರ: ವರ್ಷ 10 ರಲ್ಲಿ ₹1,47,500 ಗಳಿಸಬಹುದು.",
      understanding4: "✅ ಒಟ್ಟು ಲಾಭ: 10 ವರ್ಷಗಳಲ್ಲಿ ₹11,75,000 ಗಳಿಸಬಹುದು.",
      
      tab1: "ಆದಾಯ ಪ್ರಜೆಕ್ಷನ್",
      tab2: "ಖರ್ಚ ವಿಭಜನೆ",
      tab3: "ವಿವರವಾದ ಕೋಷ್ಟಕ",
      
      incomeTitle: "ವರ್ಷ-ನುಸಾರ ಆದಾಯ ಪ್ರಜೆಕ್ಷನ್",
      incomeSubtitle: "ವರ್ಷ 2 ರಿಂದ ನಿಮ್ಮ ಆದಾಯ ಸ್ಥಿರವಾಗಿ ಬೆಳೆಯುತ್ತದೆ",
      incomeExplanation: "ನಿಮ್ಮ ಆದಾಯ ವರ್ಷ 1 ರಲ್ಲಿ ಶೂನ್ಯ ಮತ್ತು ಸ್ಥಿರವಾಗಿ ಬೆಳೆಯುತ್ತದೆ. ವರ್ಷ 10 ರಲ್ಲಿ ₹14,75,000 ವಾರ್ಷಿಕ ಆದಾಯ. ಬಲವಾದ ಜಮೀನಿನ ಸಂಭಾವ್ಯತೆ.",
      
      costTitle: "ವಾರ್ಷಿಕ ಖರ್ಚ ವಿಭಜನೆ",
      costSubtitle: "ನಿಮ್ಮ ಹಣ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ",
      costExplanation: "ಶ್ರಮ ನಿಮ್ಮ ಅತಿದೊಡ್ಡ ಖರ್ಚ (37%). ಬೀಜ ಮತ್ತು ರಸ 18%. ಈ ದೊಡ್ಡ ಖರ್ಚಗಳನ್ನು ನಿರ್ವಹಿಸಿದರೆ ಲಾಭ ಹೆಚ್ಚಾಗುತ್ತದೆ.",
      
      tableTitle: "ವರ್ಷ-ಪ್ರತಿ-ವರ್ಷ ಆರ್ಥಿಕ ವಿಭಜನೆ",
      tableSubtitle: "ಪ್ರತಿ ವರ್ಷ ನೀವು ಎಷ್ಟು ಗಳಿಸುತ್ತೀರಿ ಮತ್ತು ಖರ್ಚ ಮಾಡುತ್ತೀರಿ ನೋಡಿ",
      
      finalMessage: "🎉 ನೆನಪಿಸಿಕೊಳ್ಳಿ: ಎಲ್ಲ ಇದು ಸರಿಯಾಗಿ ಕೆಲಸ ಮಾಡುವುದರ ಮೇಲೆ ಅವಲಂಬಿತ. ಕ್ರಮವಾಗಿ ಜಮೀನಿನ ಕಾಳಜಿ ತೆಗೆದುಕೊಳ್ಳಿ, ಮಣ್ಣನ್ನು ಆರೋಗ್ಯಕರ ಇಟ್ಟುಕೊಳ್ಳಿ. ಬಿತ್ತಿ-ಕೊಯ್ದುಕೊಳ್ಳಿ ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ. ನಂತರ ಖಂಡಿತ ಯಶಸ್ವಿ ಆಗುತ್ತೀರಿ!",
      
      year: "ವರ್ಷ",
      income: "ಆದಾಯ (₹)",
      cost: "ಖರ್ಚ (₹)",
      profit: "ಲಾಭ (₹)",
    }
  };

  const t = translations[lang];

  const incomeData = Array.from({ length: 10 }, (_, i) => ({
    year: `Year ${i + 1}`,
    income: i === 0 ? 0 : 150000 + i * 130000,
  }));

  const costData = [
    { name: "Labor", value: 37, color: "#559d3c" },
    { name: "Seeds & Fertilizer", value: 18, color: "#4fa3d1" },
    { name: "Equipment", value: 15, color: "#d4af37" },
    { name: "Irrigation", value: 8, color: "#a0825b" },
    { name: "Pesticides", value: 8, color: "#7fb3d5" },
    { name: "Other", value: 4, color: "#c9c9c9" },
  ];

  const tableData = Array.from({ length: 10 }, (_, i) => ({
    year: i + 1,
    income: i === 0 ? 0 : 150000 + i * 130000,
    cost: 120000 + i * 5000,
    profit: (i === 0 ? 0 : 150000 + i * 130000) - (120000 + i * 5000),
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", color: "#333" }}>
      {/* Language Toggle */}
      <div style={{
        position: "fixed",
        top: "25px",
        right: "25px",
        display: "flex",
        gap: "8px",
        background: "white",
        padding: "8px",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        zIndex: 1000,
        border: "1px solid #e5e5e5",
      }}>
        <button
          onClick={() => setLang("en")}
          style={{
            padding: "8px 18px",
            border: lang === "en" ? "1.5px solid #999" : "1.5px solid #d0d0d0",
            background: lang === "en" ? "#f0f0f0" : "white",
            color: lang === "en" ? "#333" : "#666",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95em",
            transition: "all 0.3s",
          }}
        >
          English
        </button>
        <button
          onClick={() => setLang("kn")}
          style={{
            padding: "8px 18px",
            border: lang === "kn" ? "1.5px solid #999" : "1.5px solid #d0d0d0",
            background: lang === "kn" ? "#f0f0f0" : "white",
            color: lang === "kn" ? "#333" : "#666",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95em",
            transition: "all 0.3s",
          }}
        >
          ಕನ್ನಡ
        </button>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "25px",
          background: "white",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #f0f0f0",
        }}>
          <h1 style={{ fontSize: "2.2em", fontWeight: "600", margin: "0 0 8px 0" }}>
            {t.title}
          </h1>
          <p style={{ fontSize: "1em", color: "#999", fontWeight: "400", margin: 0 }}>
            {t.subtitle}
          </p>
        </div>

        {/* Story Box */}
        <div style={{
          background: "#fffbf0",
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "25px",
          borderLeft: "4px solid #d4af37",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #f5ede0",
          fontSize: "0.95em",
          color: "#666",
          fontWeight: "500",
          lineHeight: "1.6",
        }}>
          {t.storyBox}
        </div>

        {/* Metrics Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}>
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "28px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #f0f0f0",
            borderLeft: "4px solid #559d3c",
          }}>
            <div style={{ fontSize: "2.5em", marginBottom: "12px" }}>💸</div>
            <div style={{ fontSize: "0.85em", color: "#999", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase" }}>
              {t.card1Label}
            </div>
            <div style={{ fontSize: "2em", fontWeight: "700", color: "#333", marginBottom: "8px" }}>
              ₹1,20,000
            </div>
            <div style={{ fontSize: "0.95em", color: "#666", marginBottom: "12px", fontWeight: "500" }}>
              {t.card1Explain}
            </div>
            <div style={{
              background: "#f5faf2",
              borderLeft: "3px solid #559d3c",
              padding: "10px 12px",
              borderRadius: "6px",
              fontSize: "0.9em",
              color: "#666",
              border: "1px solid #e8eee3",
            }}>
              {t.card1Example}
            </div>
          </div>

          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "28px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #f0f0f0",
            borderLeft: "4px solid #4fa3d1",
          }}>
            <div style={{ fontSize: "2.5em", marginBottom: "12px" }}>📈</div>
            <div style={{ fontSize: "0.85em", color: "#999", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase" }}>
              {t.card2Label}
            </div>
            <div style={{ fontSize: "2em", fontWeight: "700", color: "#333", marginBottom: "8px" }}>
              Year 2
            </div>
            <div style={{ fontSize: "0.95em", color: "#666", marginBottom: "12px", fontWeight: "500" }}>
              {t.card2Explain}
            </div>
            <div style={{
              background: "#f5faf2",
              borderLeft: "3px solid #559d3c",
              padding: "10px 12px",
              borderRadius: "6px",
              fontSize: "0.9em",
              color: "#666",
              border: "1px solid #e8eee3",
            }}>
              {t.card2Example}
            </div>
          </div>

          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "28px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid #f0f0f0",
            borderLeft: "4px solid #d4af37",
          }}>
            <div style={{ fontSize: "2.5em", marginBottom: "12px" }}>💹</div>
            <div style={{ fontSize: "0.85em", color: "#999", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase" }}>
              {t.card3Label}
            </div>
            <div style={{ fontSize: "2em", fontWeight: "700", color: "#333", marginBottom: "8px" }}>
              ₹11,75,000
            </div>
            <div style={{ fontSize: "0.95em", color: "#666", marginBottom: "12px", fontWeight: "500" }}>
              {t.card3Explain}
            </div>
            <div style={{
              background: "#f5faf2",
              borderLeft: "3px solid #559d3c",
              padding: "10px 12px",
              borderRadius: "6px",
              fontSize: "0.9em",
              color: "#666",
              border: "1px solid #e8eee3",
            }}>
              {t.card3Example}
            </div>
          </div>
        </div>

        {/* Understanding Box */}
        <div style={{
          background: "#fffbf0",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "25px",
          borderLeft: "4px solid #d4af37",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #f5ede0",
        }}>
          <h2 style={{ fontSize: "1.3em", color: "#c67f26", marginBottom: "16px", fontWeight: "700" }}>
            {t.understandingTitle}
          </h2>
          <p style={{ fontSize: "0.95em", color: "#666", lineHeight: "1.6", margin: "10px 0", fontWeight: "500" }}>
            {t.understanding1}
          </p>
          <p style={{ fontSize: "0.95em", color: "#666", lineHeight: "1.6", margin: "10px 0", fontWeight: "500" }}>
            {t.understanding2}
          </p>
          <p style={{ fontSize: "0.95em", color: "#666", lineHeight: "1.6", margin: "10px 0", fontWeight: "500" }}>
            {t.understanding3}
          </p>
          <p style={{ fontSize: "0.95em", color: "#666", lineHeight: "1.6", margin: "10px 0", fontWeight: "500" }}>
            {t.understanding4}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "25px" }}>
          {["income", "cost", "detail"].map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "16px 20px",
                border: activeTab === tab ? "none" : "1px solid #e5e5e5",
                background: activeTab === tab ? "#333" : "white",
                color: activeTab === tab ? "white" : "#666",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "0.95em",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: activeTab === tab ? "0 4px 12px rgba(51,51,51,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              {tab === "income" ? t.tab1 : tab === "cost" ? t.tab2 : t.tab3}
            </button>
          ))}
        </div>

        {/* Content Wrapper */}
        <div style={{
          background: "white",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #f0f0f0",
          marginBottom: "25px",
        }}>
          {/* Income Tab */}
          {activeTab === "income" && (
            <div>
              <h3 style={{ fontSize: "1.4em", fontWeight: "600", color: "#333", marginBottom: "6px" }}>
                {t.incomeTitle}
              </h3>
              <p style={{ fontSize: "0.95em", color: "#999", marginBottom: "25px", fontWeight: "400" }}>
                {t.incomeSubtitle}
              </p>
              <div style={{ height: "400px", marginBottom: "30px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={incomeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#999" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#999" }} />
                    <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                    <Line type="monotone" dataKey="income" stroke="#559d3c" strokeWidth={3} dot={{ fill: "#559d3c", r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div style={{
                background: "#f5faf2",
                borderLeft: "3px solid #559d3c",
                padding: "16px 18px",
                margin: "20px 0",
                borderRadius: "8px",
                fontSize: "0.95em",
                color: "#666",
                fontWeight: "500",
                lineHeight: "1.6",
                border: "1px solid #e8eee3",
              }}>
                {t.incomeExplanation}
              </div>
            </div>
          )}

          {/* Cost Tab */}
          {activeTab === "cost" && (
            <div>
              <h3 style={{ fontSize: "1.4em", fontWeight: "600", color: "#333", marginBottom: "6px" }}>
                {t.costTitle}
              </h3>
              <p style={{ fontSize: "0.95em", color: "#999", marginBottom: "25px", fontWeight: "400" }}>
                {t.costSubtitle}
              </p>
              <div style={{ height: "400px", marginBottom: "30px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={costData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`} outerRadius={80} dataKey="value">
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{
                background: "#f5faf2",
                borderLeft: "3px solid #559d3c",
                padding: "16px 18px",
                margin: "20px 0",
                borderRadius: "8px",
                fontSize: "0.95em",
                color: "#666",
                fontWeight: "500",
                lineHeight: "1.6",
                border: "1px solid #e8eee3",
              }}>
                {t.costExplanation}
              </div>
            </div>
          )}

          {/* Table Tab */}
          {activeTab === "detail" && (
            <div>
              <h3 style={{ fontSize: "1.4em", fontWeight: "600", color: "#333", marginBottom: "6px" }}>
                {t.tableTitle}
              </h3>
              <p style={{ fontSize: "0.95em", color: "#999", marginBottom: "25px", fontWeight: "400" }}>
                {t.tableSubtitle}
              </p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#f5f5f5" }}>
                      <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: "600", color: "#666", borderBottom: "2px solid #e5e5e5", fontSize: "0.9em", textTransform: "uppercase" }}>
                        {t.year}
                      </th>
                      <th style={{ padding: "14px 16px", textAlign: "right", fontWeight: "600", color: "#666", borderBottom: "2px solid #e5e5e5", fontSize: "0.9em", textTransform: "uppercase" }}>
                        {t.income}
                      </th>
                      <th style={{ padding: "14px 16px", textAlign: "right", fontWeight: "600", color: "#666", borderBottom: "2px solid #e5e5e5", fontSize: "0.9em", textTransform: "uppercase" }}>
                        {t.cost}
                      </th>
                      <th style={{ padding: "14px 16px", textAlign: "right", fontWeight: "600", color: "#666", borderBottom: "2px solid #e5e5e5", fontSize: "0.9em", textTransform: "uppercase" }}>
                        {t.profit}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "white", borderBottom: "1px solid #f0f0f0" }}>
                        <td style={{ padding: "13px 16px", color: "#666", fontSize: "0.95em", fontWeight: "500" }}>
                          <strong>{row.year}</strong>
                        </td>
                        <td style={{ padding: "13px 16px", textAlign: "right", color: "#666", fontSize: "0.95em", fontWeight: "500" }}>
                          ₹{row.income.toLocaleString()}
                        </td>
                        <td style={{ padding: "13px 16px", textAlign: "right", color: "#666", fontSize: "0.95em", fontWeight: "500" }}>
                          ₹{row.cost.toLocaleString()}
                        </td>
                        <td style={{
                          padding: "13px 16px",
                          textAlign: "right",
                          color: row.profit >= 0 ? "#559d3c" : "#d9534f",
                          fontSize: "0.95em",
                          fontWeight: "700",
                        }}>
                          ₹{row.profit.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Final Message */}
        <div style={{
          background: "#fffbf0",
          borderRadius: "12px",
          padding: "20px 24px",
          border: "1px solid #f5ede0",
          borderLeft: "4px solid #d4af37",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          fontSize: "0.95em",
          color: "#666",
          fontWeight: "500",
          lineHeight: "1.6",
        }}>
          {t.finalMessage}
        </div>
      </div>
    </div>
  );
};

export default EndingPage;