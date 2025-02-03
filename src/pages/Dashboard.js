import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Body = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: -120, category: 'Food', date: '2024-03-15' },
    { id: 2, description: 'Salary', amount: 3000, category: 'Income', date: '2024-03-01' },
    { id: 3, description: 'Fuel', amount: -60, category: 'Transportation', date: '2024-03-16' },
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: '',
  });

  // Sample chart data
  const chartData = [
    { category: 'Food', amount: 420 },
    { category: 'Transportation', amount: 180 },
    { category: 'Entertainment', amount: 90 },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 pt-20"> {/* pt-20 to account for fixed header */}
      <div className="max-w-6xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">$1,240.00</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">$3,000.00</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Balance</h3>
            <p className="text-2xl font-bold text-blue-600">$1,760.00</p>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Description"
              className="p-2 border rounded"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="p-2 border rounded"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <select
              className="p-2 border rounded"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            >
              <option>Food</option>
              <option>Transportation</option>
              <option>Housing</option>
              <option>Entertainment</option>
              <option>Income</option>
            </select>
            <input
              type="date"
              className="p-2 border rounded"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
            />
            <button className="col-span-1 md:col-span-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Add Expense
            </button>
          </div>
        </div>

        {/* Expense Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
          <div className="h-64">
            <BarChart width={730} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <select className="p-2 border rounded">
              <option>All Categories</option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Housing</option>
            </select>
          </div>

          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{expense.description}</h3>
                  <p className="text-sm text-gray-500">
                    {expense.category} • {expense.date}
                  </p>
                </div>
                <div className={`text-lg ${expense.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ${Math.abs(expense.amount).toFixed(2)}
                </div>
                <button className="text-gray-400 hover:text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Body;