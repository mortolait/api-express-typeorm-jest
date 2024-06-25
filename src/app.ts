import 'reflect-metadata'; // Certifique-se de que esta linha está presente
import express from "express";
import userRouter from "./routes/user.routes";
import productRouter from "./routes/product.routes";

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(productRouter)

app.get('/', (req, res) => {
    res.send("Hello world");
});

export default app;
