import { Body, Controller, Post } from "routing-controllers";
import { AuthService } from "src/services/AuthService";
import { Service } from "typedi";
import * as bcrypt from "bcrypt";

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
        user.password = await bcrypt.hash(user.password, 10);
        await this._authService.registerUser(user);
    }
}
