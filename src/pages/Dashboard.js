import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Body = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: -120, category: 'Food', date: '2024-03-15' },
    { id: 2, description: 'Salary', amount: 3000, category: 'Income', date: '2024-03-01' },
    { id: 3, description: 'Fuel', amount: -60, category: 'Transportation', date: '2024-03-16' },
    { id: 4, description: 'Entertainment', amount: -100, category: 'Entertainment', date: '2024-03-16' },
    { id: 5, description: 'Rent', amount: -1000, category: 'Housing', date: '2024-03-05' },
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food',
    date: '',
  });

  const [chartData, setChartData] = useState([]);
  const [categoryThresholds, setCategoryThresholds] = useState({
    Food: 0.3,
    Transportation: 0.2,
    Housing: 0.5,
    Entertainment: 0.4,
  });

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    // Aggregate expenses by category
    const aggregatedData = {};
    expenses.forEach((expense) => {
      if (expense.amount < 0) {
        const category = expense.category;
        const amount = Math.abs(expense.amount);
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
  }, [expenses]);

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A9A9A9', '#ADD8E6']; // Keep the colors

  const categoryColors = {  // Map category names to colors
    Food: COLORS[0],
    Transportation: COLORS[1],
    Housing: COLORS[2],
    Entertainment: COLORS[3],
    // Add more categories and colors as needed.  Make sure these match the categories and the Pie Chart's colors.
  };


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

  const isCategoryOverThreshold = (category, amount) => {
    const threshold = categoryThresholds[category];
    if (!threshold) {
      return false;
    }
    const totalExpenseAmount = totalExpenses;
    if (totalExpenseAmount === 0) return false;
    const percentage = amount / totalExpenseAmount;
    return percentage > threshold;
  };

  // Calculate remaining budget for each category
  const categoryBudgets = () => {
    const budgets = {};
    let totalIncome = 0;

    expenses.forEach(expense => {
      if (expense.category === 'Income') {
        totalIncome += expense.amount;
      }
    });

    if (totalIncome === 0) {
      return budgets; // Prevent division by zero
    }

    for (const category in categoryThresholds) {
      const threshold = categoryThresholds[category];
      budgets[category] = totalIncome * threshold;
    }
    return budgets;
  };

  // Calculate the spent amount for each category
  const categorySpent = () => {
    const spent = {};
    expenses.forEach(expense => {
      if (expense.amount < 0) {
        const category = expense.category;
        const amount = Math.abs(expense.amount);
        spent[category] = (spent[category] || 0) + amount;
      }
    });
    return spent;
  };

  const remainingCategoryBudgets = () => {
    const budgets = categoryBudgets();
    const spent = categorySpent();
    const remaining = {};

    for (const category in budgets) {
      remaining[category] = budgets[category] - (spent[category] || 0);
    }
    return remaining;
  };

  const categorySpentPercentages = () => {
    const spent = categorySpent();
    const budgets = categoryBudgets();
    const percentages = {};

    for (const category in spent) {
      if (budgets[category] > 0) { // Avoid division by zero
        percentages[category] = Math.min(100, (spent[category] / budgets[category]) * 100);
      } else {
        percentages[category] = 0; // Or handle the case where budget is zero differently
      }
    }
    return percentages;
  };



  return (
    <main className="min-h-screen bg-white p-4 md:p-8 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Income</h3>
            <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Balance</h3>
            <p className="text-2xl font-bold text-blue-600">${balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="bg-gray-100 rounded-lg shadow p-6 mb-8">
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
        <div className="bg-gray-100 rounded-lg shadow p-6 mb-8">
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
                    chartData.map((entry, index) => {
                      const isOverThreshold = isCategoryOverThreshold(entry.category, entry.amount);
                      return (
                        <Cell key={`cell-${index}`} fill={isOverThreshold ? 'red' : COLORS[index % COLORS.length]} />
                      )
                    })
                  }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Cylindrical Bar Chart Display */}
          <div className="mt-4">
            <h3 className="font-semibold">Spending Levels by Category:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(categorySpentPercentages()).map(([category, percentage]) => {
                const isOverThreshold = isCategoryOverThreshold(category, (percentage / 100) * categoryBudgets()[category]);

                return (
                  <div key={category} className="relative h-12 bg-gray-200 rounded-full overflow-hidden shadow-md">  {/* Reduced height, rounded full */}
                    <div
                      className={`absolute top-0 left-0 h-full  transition-all duration-300`}
                      style={{ width: `${percentage}%`, backgroundColor: isOverThreshold ? 'red' : categoryColors[category] || '#808080'  /* Use category color or gray if not found */ }}
                    ></div>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-sm text-gray-700 pl-2"> {/* Percentage left aligned */}
                      {percentage.toFixed(0)}%
                    </div>
                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-sm font-semibold">  {/* Category right aligned */}
                      {category}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-gray-100 rounded-lg shadow p-6">
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
            {expenses.map((expense) => {
              const isOverThreshold = isCategoryOverThreshold(expense.category, Math.abs(expense.amount));
              return (
                <div
                  key={expense.id}
                  className={`flex justify-between items-center p-4 border rounded-lg hover:bg-white ${isOverThreshold ? 'border-red-500' : ''}`}
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
              )
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Body;