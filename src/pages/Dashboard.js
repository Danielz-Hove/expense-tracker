import React from "react";

const Dashboard = () => {
  return (
    <main style={dashboardStyle}>
      <section style={summarySectionStyle}>
        <h2>Dashboard Overview</h2>
        <p>Here, you can view your financial summary and recent transactions.</p>
      </section>

      <section style={contentStyle}>
        <div style={boxStyle}>
          <h3>Total Income</h3>
          <p>$1,000</p>
        </div>
        <div style={boxStyle}>
          <h3>Total Expenses</h3>
          <p>$450</p>
        </div>
        <div style={boxStyle}>
          <h3>Balance</h3>
          <p>$550</p>
        </div>
      </section>
    </main>
  );
};

const dashboardStyle = {
  margin: "20px auto",
  padding: "20px",
  maxWidth: "800px",
  background: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

const summarySectionStyle = {
  marginBottom: "20px",
  textAlign: "center",
};

const contentStyle = {
  display: "flex",
  justifyContent: "space-around",
  padding: "20px 0",
};

const boxStyle = {
  background: "#fff",
  padding: "15px",
  textAlign: "center",
  borderRadius: "8px",
  width: "30%",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

export default Dashboard;
