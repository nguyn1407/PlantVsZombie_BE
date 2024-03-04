import httpStatus from 'http-status';
import User from '../models/user.model';
import ApiError from '../utils/ApiError';
import bcrypt from 'bcrypt';

const createUser = async (userBody: any) => {
  const duplicate = await User.findOne({ username: userBody.username }).exec();
  if (duplicate) {
    throw new ApiError(409, 'User exited!');
  }
  // encrypt the password
  const hashedPwd = await bcrypt.hash(userBody.password, 10);
  // create and store the new user

  return User.create({
    "username": userBody.username,
    "password": hashedPwd
  })
};

const getUserByUsernamePassword = async (username: string) => {
  return User.findOne({ username: username });
}

const getAllUsers = async () => {
  return User.find();
}

const getUserById = async (id: string) => {
  return User.findById(id);
};

const updateUserById = async (userId: string, updateBody: any) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.deleteOne({ userId });
  return user;
};

export default {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByUsernamePassword
};