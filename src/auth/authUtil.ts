import jwt from "jsonwebtoken";

export async function createTokenPair(
  payload: any,
  publicKey: any,
  privateKey: any
) {
  try {
    //access token
    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    //refresh token
    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
}
