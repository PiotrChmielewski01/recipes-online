import { PrismaClient } from "@prisma/client";
import { Inject, Service } from "typedi";
import { CONTAINER_ID } from "../../config/constants";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Service()
export class AuthService {
    constructor(
        @Inject(CONTAINER_ID.PRISMA_CLIENT)
        private readonly _db: PrismaClient
    ){}
    async registerUser(payload: {email: string, password: string, userName: string}) {
        try {
            const newUser = await this._db.user.create({
                data: {
                    ...payload,
                }
            });
            return newUser;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log("User with this email adress already exists");
                }
            }
            throw error;
        }
    }
}
