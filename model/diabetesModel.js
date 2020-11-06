const mongoose = require("mongoose");
const schema = mongoose.Schema;
const diabetesKey = new schema(
  {
    state: {
      type: String
    },
    year: {
      type: Number,
    },
    Percentage: {
      type: Number,
    },
    LowerLimit: {
      type: Number,
    },
    UpperLimit: {
      type: Number,
    },
    isFavourite: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);
const dataModel = mongoose.model("diabetes", diabetesKey, "diabetes");


dataModel["CountiesData"] = async (field) => {
  try {
    const result = await dataModel.findOne({
      state: field,
    });
    if (result != null) {
      if (result.state == field) {
        return 1;
      }
    }
  } catch (error) {
    throw error
  }
};
module.exports = dataModel;