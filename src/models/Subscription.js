import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    plan: {
      type: String,
      enum: ["MONTHLY", "YEARLY"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    charityPercentage: {
      type: Number,
      default: 10,
    },

    prizePoolContribution: {
      type: Number,
      required: true,
    },

    charityContribution: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
      required: true,
    },

paymentIntent: {
  type: String,
  unique: true,
},

    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "CANCELLED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Subscription ||
  mongoose.model(
    "Subscription",
    SubscriptionSchema
  );