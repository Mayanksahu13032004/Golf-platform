import mongoose from "mongoose";

const DrawSchema = new mongoose.Schema(
  {
    month: String,

    year: Number,

    winningNumbers: [Number],

    prizePool: {
      type: Number,
      default: 0,
    },

    jackpotAmount: {
      type: Number,
      default: 0,
    },

    rolloverAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "SIMULATED",
        "PUBLISHED",
      ],
      default: "SIMULATED",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Draw ||
  mongoose.model("Draw", DrawSchema);