import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";

const Dashboard = () => (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ExpenseForm />
      <ExpenseChart />
    </div>
    <ExpenseList />
  </div>
);

export default Dashboard;
