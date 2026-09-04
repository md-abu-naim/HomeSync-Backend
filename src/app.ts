import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type NextFunction, type Application, type Request, type Response } from "express";
import httpStatus from "http-status";
import { notFound } from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { UserRoutes } from "./app/module/user/user.route";
import { OwnerRoutes } from "./app/module/owner/owner.route";
import { PropertyRouers } from "./app/module/property/property.route";
import { RoomRoutes } from "./app/module/room/room.route";

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

// Basic route
app.get("/", async (req: Request, res: Response) => {
    res.status(httpStatus.OK).json({
        success: true,
        message: "Welcome to NexusField System Backend",
    });
});

app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/owner', OwnerRoutes)
app.use('/api/v1/properties', PropertyRouers)
app.use('/api/v1/rooms', RoomRoutes)

// For Testing
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
app.use(globalErrorHandler);
app.use(notFound);

export default app;