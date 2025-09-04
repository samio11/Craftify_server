import passport from "passport";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../errors/AppError";
import { createUserToken } from "../../utils/userToken";
import { setCookie } from "../../utils/setCookies";
import { sendResponse } from "../../utils/sendResponse";

const credentialLogin = catchAsync(async (req, res, next) => {
  passport.authenticate("local", async (err: any, user: any, info: any) => {
    if (err) {
      return next(new AppError(401, err));
    }
    if (!user) {
      return next(new AppError(401, info.message));
    }
    const token = createUserToken(user);
    setCookie(res, token);
    sendResponse(res, {
      success: true,
      message: "User Login Done",
      statusCode: 200,
      data: {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      },
    });
  })(req, res, next);
});
const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  sendResponse(res, {
    success: true,
    message: "User Logout Done",
    statusCode: 200,
    data: "",
  });
});

export const authController = { credentialLogin, logout };
