import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = "Keys";
const COLLECTION_NAME = "Keys";

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shop",
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
//Export the model
export = mongoose.model(DOCUMENT_NAME, keyTokenSchema);
