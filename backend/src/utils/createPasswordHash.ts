import * as bcrypt from "bcrypt";
import  { config } from "../../config/config";

export const createPasswordHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, config.salt )
}