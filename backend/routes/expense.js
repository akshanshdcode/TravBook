import express from 'express';
import { getExpenses, addExpense } from '../Controllers/expenseController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:userId', getExpenses);
router.post('/addExpense/:userId', verifyUser, addExpense);

export default router;