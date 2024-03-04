import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { authService, userService, tokenService } from '../services';

const register = catchAsync(async (req: any, res: any) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens })
})

const login = catchAsync(async (req: any, res: any) => {
  const { username, password } = req.body;
  console.log({ username, password });

  const user = await authService.login(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req: any, res: any) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req: any, res: any) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

export default {
  register,
  login,
  logout,
  refreshTokens
};