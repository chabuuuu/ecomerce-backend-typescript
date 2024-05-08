import keytokenModel from "@/models/keytoken.model";

class KeyTokenService {

    static async createKeyToken(
        userId: string,
        publicKey: any
    ){
        try {
            const publicKeyString = publicKey.toString();
            const token = await keytokenModel.create({
                user: userId,
                publicKey: publicKeyString
            })

            return token ? token.publicKey : null;
        } catch (error) {
            return error;
        }
    }

}

export default KeyTokenService;