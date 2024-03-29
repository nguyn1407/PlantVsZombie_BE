import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { userService } from '../services';

const createUser = catchAsync(async (req: any, res: any) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req: any, res: any) => {
  const result = await userService.getAllUsers();
  res.send(result);
});

const getUser = catchAsync(async (req: any, res: any) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req: any, res: any) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req: any, res: any) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};