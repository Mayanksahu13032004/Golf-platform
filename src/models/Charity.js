import mongoose from "mongoose";

const CharitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    events: [
      {
        title: String,
        date: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Charity ||
  mongoose.model("Charity", CharitySchema);