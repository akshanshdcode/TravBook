import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
   {
      userId: {
        type: String
      },
      tourName: {
         type: String,
      },
      date: {
         type: Date,
      },
   },
   { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);