import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AdminServices } from "./Admin.services";
import { sendResponse } from "../../utils/sendResponse";

const getUsers = catchAsync(async (req: Request, res: Response) => {

    const result = await AdminServices.getUsers(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users retrieved successfully",
        data: result
    });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id

    const result = await AdminServices.updateUserRole(userId as string, req.body.role);

    sendResponse(res, {
        statusCode: 200,
        success: true, message:
            "User role updated successfully",
        data: result
    });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id

    const result = await AdminServices.updateUserStatus(userId as string, req.body.status)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User status updated successfully",
        data: result
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id

    const result = await AdminServices.deleteUser(userId as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: result
    });
});

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {

    const result = await AdminServices.getDashboardStats();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Dashboard stats retrieved successfully",
        data: result
    });
});

export const AdminController = {
    getUsers, updateUserRole,
    updateUserStatus, deleteUser,
    getDashboardStats
};