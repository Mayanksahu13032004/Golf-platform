import mongoose from "mongoose";

const WinnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    drawId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draw",
    },

    matchCount: Number,

    amount: Number,

  status: {
  type: String,
  enum: [
    "PENDING",
    "APPROVED",
    "REJECTED",
    "PAID"
  ],
  default: "PENDING"
},
   proofImage: {
  type: String,
  default: "",
},

adminRemark: {
  type: String,
  default: "",
},

verifiedAt: Date,

paidAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Winner ||
  mongoose.model(
    "Winner",
    WinnerSchema
  );