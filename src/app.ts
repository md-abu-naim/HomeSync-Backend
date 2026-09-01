import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type NextFunction, type Application, type Request, type Response } from "express";
import httpStatus from "http-status";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(
    cors({
        // origin: config.frontend_url,
        credentials: true,
    }),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.get("/test", async (req: Request, res: Response, next: NextFunction) => {
    try {


        res.status(httpStatus.OK).json({
            success: true,
            message: "Testing ",
            data: {}
        });
    } catch (error) {
        console.log(error);
        next(error)
    }
})

// Basic route
app.get("/", async (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: "Welcome to NexusField System Backend",
    });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;