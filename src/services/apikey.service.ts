import { apiKeyModel, apiKeySchema, IApiKey } from "@/models/apikey.model";
import { HydratedDocument } from "mongoose";

export class ApiKeyService {
  public static async findByKey(
    key: string
  ): Promise<HydratedDocument<IApiKey> | null> {
    const objKey: HydratedDocument<IApiKey> | null = await apiKeyModel
      .findOne({
        key: key,
        status: true,
      })
      .exec();

    //Get the data of the objKey
    return objKey;
  }
}
