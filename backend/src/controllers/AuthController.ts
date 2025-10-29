import { Body, Controller, Post, Res, UnauthorizedError } from "routing-controllers";
import { UserService } from "../services/UserService";
import { Service } from "typedi";
import { createPasswordHash } from "../utils/createPasswordHash";
import { UserLoginDTO } from "../DTO/UserLoginDTO";
import { userRegisterDTO } from "../DTO/UserRegisterDTO";
import { AuthService } from "../services/AuthService";
import * as express from "express";

@Controller("/auth")
@Service()
export class AuthController {
    constructor(
        private readonly _userService: UserService,
        private readonly _authService: AuthService
    ) {}

    @Post("/register")
    async register(
        @Body() user: userRegisterDTO
    ){
        user.password = await createPasswordHash(user.password);
        await this._userService.createUser(user);
        return { message: "User created successfully" };
    }

    @Post("/login")
    async login(
        @Body() UserLoginDTO: UserLoginDTO, @Res() res: express.Response
    ) {
        try {
            const user = await this._authService.validateUser(UserLoginDTO.email, UserLoginDTO.password);

            const tokens = await this._authService.getTokens(user.guid);

            return res.status(200).send({ ...tokens, user });
        } catch (error) {
            throw new UnauthorizedError('Wrong login credentials');
        }
    }
}
