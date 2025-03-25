import { AuthService } from './AuthService';
import { UpdatePasswordData, UpdateProfileData } from '@/types/IUser.tsx';
import { User } from '@/types/IAuth.tsx';

export const UserService = {
  /**
   * Update the user's profile information
   */
  updateProfile: async (data: UpdateProfileData): Promise<{ message: string; user: User }> => {
    return AuthService.updateProfile(data);
  },

  /**
   * Update the user's password
   */
  updatePassword: async (data: UpdatePasswordData): Promise<{ message: string }> => {
    try {
      const api = AuthService.getAuthenticatedApi();
      const response = await api.put<{ message: string }>('/user/password', data);
      return response.data;
    } catch (error) {
      console.error('Error updating password:', error);
      throw new Error('Failed to update password');
    }
  },

  /**
   * Delete the user's account
   */
  deleteAccount: async (): Promise<{ message: string }> => {
    try {
      const api = AuthService.getAuthenticatedApi();
      const response = await api.delete<{ message: string }>('/user');
      return response.data;
    } catch (error) {
      console.error('Error deleting account:', error);
      throw new Error('Failed to delete account');
    }
  },

  /**
   * Enable two-factor authentication for the user
   */
  enableTwoFactor: async (): Promise<{ qr_code: string; setup_key: string }> => {
    try {
      const api = AuthService.getAuthenticatedApi();
      const response = await api.post<{ qr_code: string; setup_key: string }>(
        '/user/two-factor-authentication',
      );
      return response.data;
    } catch (error) {
      console.error('Error enabling two-factor authentication:', error);
      throw new Error('Failed to enable two-factor authentication');
    }
  },

  /**
   * Disable two-factor authentication for the user
   */
  disableTwoFactor: async (): Promise<{ message: string }> => {
    try {
      const api = AuthService.getAuthenticatedApi();
      const response = await api.delete<{ message: string }>('/user/two-factor-authentication');
      return response.data;
    } catch (error) {
      console.error('Error disabling two-factor authentication:', error);
      throw new Error('Failed to disable two-factor authentication');
    }
  },
};
