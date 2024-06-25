import "reflect-metadata";
import 'dotenv/config';
import app from './app';
import { AppDataSource } from "./data-source";

const port = process.env.PORT;

AppDataSource.initialize()
    .then(() => {
        app.listen(port || 3000, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log(error));
