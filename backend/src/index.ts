import "reflect-metadata";
import { useContainer, createExpressServer } from "routing-controllers";
import { AuthController } from "./controllers/AuthController";
import { PrismaClient } from "@prisma/client";
import { Container } from "typedi";
import { CONTAINER_ID } from "../config/constants";
import { BodyParser } from "./middleware/BodyParser";

const prisma = new PrismaClient();
Container.set(CONTAINER_ID.PRISMA_CLIENT, prisma);
useContainer(Container);

const PORT = process.env.PORT || 3000;

const controllers = [ AuthController ]

const app = createExpressServer({
    controllers,
    development: true,
    middlewares: [ BodyParser ],
    cors: {
        origin: "*",
    },
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});