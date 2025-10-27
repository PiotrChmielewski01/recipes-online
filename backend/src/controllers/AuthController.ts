import { Body, Controller, Post } from "routing-controllers";
import { AuthService } from "../services/AuthService";
import { Service } from "typedi";
import { createPasswordHash } from "../utils/createPasswordHash";

@Controller("/auth")
@Service()
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) {}

    @Post("/register")
    async register(
        @Body() user: { userName: string; email: string; password: string }
    ){
        user.password = await createPasswordHash(user.password);
        await this._authService.registerUser(user);
        return { message: "User created successfully" };
    }
}
