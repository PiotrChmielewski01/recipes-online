import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import * as bodyParser from "body-parser";
import { NextFunction } from "express";
import { IncomingMessage, ServerResponse } from "node:http";
import { Service } from "typedi";

@Middleware({
    type: "before",
})
@Service()
export class BodyParser implements ExpressMiddlewareInterface {
    private jsonBodyParser;

    constructor() {
        this.jsonBodyParser = bodyParser.json();
    }

    use(req: IncomingMessage, res: ServerResponse, next: NextFunction) {
        this.jsonBodyParser(req, res, next);
    }
}