import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { authService } from "./auth.container.js";
import { clearCookies, setCookies } from "../../utils/auth.helper.js";
import { sendResponse } from "../../utils/send-response.js";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body);

    setCookies(res, result.accessToken, result.refreshToken);

    sendResponse({
      res,
      statusCode: 201,
      message: "User Created Successfully",
      data: result,
    });
  },
);

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);

    setCookies(res, result.accessToken, result.refreshToken);

    sendResponse({
      res,
      statusCode: 201,
      message: "User LoggedIn Successfully",
      data: result,
    });
  },
);

export const getCurrentUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.getCurrentUser(req?.user.id as string);

    sendResponse({
      res,
      statusCode: 200,
      message: "User details fetched successfully",
      data: result,
    });
  },
);

export const logoutController = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    const result = await authService.logout(refreshToken);
    clearCookies(res);

    sendResponse({
      res,
      statusCode: 200,
      message: "User logout successfully",
      data: result,
    });
  },
);

export const logoutAllController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.logoutAll(req?.user.id as string);

    clearCookies(res);

    sendResponse({
      res,
      statusCode: 200,
      message: "All User logout successfully",
      data: result,
    });
  },
);
