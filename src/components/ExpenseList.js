import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  return (
    <div className="mt-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex justify-between items-center bg-white p-4 mb-2 rounded shadow"
        >
          <div>
            <h4 className="font-bold">{expense.title}</h4>
            <p className="text-sm">{expense.category}</p>
          </div>
          <div>
            <p>${expense.amount.toFixed(2)}</p>
            <button
              onClick={() => deleteExpense(expense.id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
