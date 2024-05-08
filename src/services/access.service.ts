import { createTokenPair } from "@/auth/authUtil";
import shopModel from "@/models/shop.model";
import KeyTokenService from "@/services/keyToken.service";
import { getInfoData } from "@/utils";
import bcrypt from "bcrypt";
import crypto from "crypto";

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static async signUp(payload: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      //step1: check if email exists?
      const holderShop = await shopModel
        .exists({ email: payload.email })
        .lean();

      console.log("not exists");

      if (holderShop) {
        return {
          code: "XXX",
          message: "Shop already registered",
          status: "error",
        };
      }

      //step 2: hash password
      const passwordHash = await bcrypt.hash(payload.password, 10);

      //step 3: create shop
      const newShop = await shopModel.create({
        name: payload.name,
        email: payload.email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // step 4: Create privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

        //Fact: pkcs1 = public key cryptography standard 1

        console.log({ privateKey, publicKey });

        //step 5: save public key for user
        const publicKeyString: any = await KeyTokenService.createKeyToken(
          newShop._id.toString(),
          publicKey
        );
        if (!publicKeyString) {
          return {
            code: "XXX",
            message: "Error creating key token",
            status: "error",
          };
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString);
        console.log("publicKeyObject", publicKeyObject);

        //step 6: create jwt token
        const tokens = await createTokenPair(
          {
            userId: newShop._id.toString(),
            email: newShop.email,
          },
          publicKeyObject,
          privateKey
        );
        console.log("Created token", tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: [
                "_id",
                "name",
                "email",
                "status",
                "verify",
                "roles",
                "createdAt",
                "updatedAt",
              ],
              object: newShop,
            }),
            tokens,
          },
        };
      }

      return {
        code: "XXX",
        message: null,
        status: "error",
      };
    } catch (error: any) {
      return {
        code: "XXX",
        messsage: error.message,
        status: "error",
      };
    }
  }
}

export default AccessService;
