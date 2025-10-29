import { Service } from "typedi";
import { UserService } from "./UserService";
import { UnauthorizedError } from "routing-controllers";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

export type Token<T> = {
    iat: number;
    exp: number;
} & T;

@Service()
export class AuthService {
    constructor(
        private readonly _userService: UserService,
    ) {}
    async validateUser(email: string, password: string) {
        const user = await this._userService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedError('Wrong login credentials');
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedError('Wrong login credentials');
        }

        return user;
    }

    async verify<T>(token: string): Promise<Token<T>> {
        return new Promise((resolve, reject) =>
            jwt.verify(token, config.jwt, (err: any, decoded: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            })
        );
    }

    async getTokens(userGuid: string) {
        const token = jwt.sign({ guid: userGuid }, config.jwt, {
            expiresIn: '1h', //TODO load from env
        });
        const refreshToken = jwt.sign({ guid: userGuid }, config.jwt, {
            expiresIn: '7d', //TODO load from env
        });
        return {
            token,
            refreshToken,
        };
    }
}