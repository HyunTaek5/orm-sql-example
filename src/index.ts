import express, { Express, Request, Response } from "express";
import { MikroORM } from "@mikro-orm/core";
import config from "src/mikro-orm.config";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
    const orm = await MikroORM.init(config);
    await orm.getMigrator().up();

    const app: Express = express();
    const port = process.env.PORT || 8000;

    app.use(express.json());
    app.set('orm', orm);

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello World!");
    });

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
