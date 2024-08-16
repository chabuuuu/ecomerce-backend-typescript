import mongoose, { Schema } from "mongoose";

const DOCUMENT_NAME = "Apikey";
const COLLECTION_NAME = "Apikeys";

export interface IApiKey {
  key: string;
  status: boolean;
  permissions: Array<string>;
}

// Declare the Schema of the Mongo model
const apiKeySchema = new Schema<IApiKey>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "2222"],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
//Export the model
const apiKeyModel = mongoose.model<IApiKey>(DOCUMENT_NAME, apiKeySchema);

export { apiKeyModel, apiKeySchema };
