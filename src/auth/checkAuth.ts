import { IApiKey } from "@/models/apikey.model";
import { ApiKeyService } from "@/services/apikey.service";
import { NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

export async function apiKey(req: any, res: any, next: any) {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbiden Error",
      });
    }
    //check objKey
    const objKey = await ApiKeyService.findByKey(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbiden Error",
      });
    }
    req.objKey = objKey;
    return next();
  } catch (error) {
    next(error);
  }
}

export const permission = (permission: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      const objKey: HydratedDocument<IApiKey> = req.objKey;
      if (objKey.permissions.includes(permission)) {
        return next();
      }
      console.log("permissions:::", objKey.permissions);

      return res.status(403).json({
        message: "Permission denied",
      });
    } catch (error) {
      next(error);
    }
  };
};
