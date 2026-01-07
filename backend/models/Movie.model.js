import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    plot: {
      type: String,
      required: true
    },

    imdbrating: {
      type: Number,
      min: 0,
      max: 10
    },

    released: {
      type: Date
    },

    runtime: {
      type: Number // minutes
    },

    poster: {
      type: String
    }
  },
  { timestamps: true }
);

movieSchema.index({ title: "text", plot: "text" });
movieSchema.index({ imdbrating: -1 });
movieSchema.index({ released: -1 });

export default mongoose.model("Movie", movieSchema);
