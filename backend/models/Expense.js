import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
   {
      userId: {
        type: String
      },
      description: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
      },
      tripId: {
        type: String,
      },
   },
   { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);