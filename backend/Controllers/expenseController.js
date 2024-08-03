import Expense from './../models/Expense.js'

// Get all expenses for a specific user
export const getExpenses = async (req, res) => {
  const userId = req.params.userId;
  const { tripId } = req.body;

  try {
    const expenses = await Expense.find({ userId, tripId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

// Add a new expense for a specific user
export const addExpense = async (req, res) => {
  const {description, amount, date, tripId } = req.body;
  const {userId} = req.params;
  
  try {
    const newExpense = new Expense({ userId, description, amount, date, tripId });
    await newExpense.save();
    res.status(201).json({ message: 'Expense Added'});
  } catch (error) {
    res.status(500).json({ message: 'Failed to add expense' });
  }
};
