import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Body = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: -120, category: 'Food', date: '2024-03-15' },
    { id: 2, description: 'Salary', amount: 3000, category: 'Income', date: '2024-03-01' },
    { id: 3, description: 'Fuel', amount: -60, category: 'Transportation', date: '2024-03-16' },
    { id: 4, description: 'Entertainment', amount: -100, category: 'Entertainment', date: '2024-03-16' },
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: '',
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Aggregate expenses by category
    const aggregatedData = {};
    expenses.forEach((expense) => {
      if (expense.amount < 0) { // Only consider expenses, not income for the chart
        const category = expense.category;
        const amount = Math.abs(expense.amount); // Use absolute value for expenses
        if (aggregatedData[category]) {
          aggregatedData[category] += amount;
        } else {
          aggregatedData[category] = amount;
        }
      }
    });

    // Convert aggregated data to array format for recharts
    const chartDataArray = Object.entries(aggregatedData).map(([category, amount]) => ({
      category,
      amount,
    }));
    setChartData(chartDataArray);
  }, [expenses]); // Update chart data whenever expenses change


  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let expensesSum = 0;
    let incomeSum = 0;

    expenses.forEach(item => {
      if (item.amount < 0) {
        expensesSum += Math.abs(item.amount);
      } else {
        incomeSum += item.amount;
      }
    });

    setTotalExpenses(expensesSum);
    setTotalIncome(incomeSum);
    setBalance(incomeSum - expensesSum);

  }, [expenses]);


  const addExpense = () => {
    const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    const newExpenseToAdd = { ...newExpense, amount: parseFloat(newExpense.amount), id: newId };

    setExpenses([...expenses, newExpenseToAdd]);
    setNewExpense({
      description: '',
      amount: '',
      category: 'Food',
      date: '',
    });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A9A9A9', '#ADD8E6'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  return (
    <main className="min-h-screen bg-white p-4 md:p-8 pt-20"> {/* Changed here */}
      <div className="max-w-6xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow">  {/* Changed here */}
            <h3 className="text-gray-500 text-sm">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow"> {/* Changed here */}
            <h3 className="text-gray-500 text-sm">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow"> {/* Changed here */}
            <h3 className="text-gray-500 text-sm">Balance</h3>
            <p className="text-2xl font-bold text-blue-600">${balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="bg-gray-100 rounded-lg shadow p-6 mb-8"> {/* Changed here */}
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
            <button className="col-span-1 md:col-span-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition" onClick={addExpense}>
              Add Expense
            </button>
          </div>
        </div>

        {/* Expense Chart - Now a Pie Chart */}
        <div className="bg-gray-100 rounded-lg shadow p-6 mb-8"> {/* Changed here */}
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {
                    chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-gray-100 rounded-lg shadow p-6"> {/* Changed here */}
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
                className="flex justify-between items-center p-4 border rounded-lg hover:bg-white"  /* Changed here */
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
                <button className="text-gray-400 hover:text-red-600" onClick={() => deleteExpense(expense.id)}>
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