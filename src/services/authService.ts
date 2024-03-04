import httpStatus from 'http-status';
import { tokenService, userService } from '../services';
import Token from '../models/token.model';
import ApiError from '../utils/ApiError';
import tokenTypes from '../config/token';
import bcrypt from 'bcrypt';

const login = async (username: string, password: string) => {
  const user = await userService.getUserByUsernamePassword(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
  }
  return user;
};

const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.deleteOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
};

const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.deleteOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};


export default {
  login,
  logout,
  refreshAuth
};