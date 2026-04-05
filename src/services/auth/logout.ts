import { userModel } from 'src/models';
import { Types } from 'mongoose';

/**
 * @description Logout user by invalidating their refresh token.
 * @param userId - The ID of the user to logout
 * @returns Success message
 */
export const logout = async (userId: string | Types.ObjectId) => {
  await userModel.findByIdAndUpdate(userId, { refreshToken: null });
  return {
    message: 'User logged out successfully.',
  };
};
