import { createExpressServer } from "routing-controllers";

const PORT = process.env.PORT || 3000;

const app = createExpressServer({
    cors: {
        origin: "*",
    },
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});