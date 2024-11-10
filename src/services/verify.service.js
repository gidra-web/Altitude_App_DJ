import bcryptjs from 'bcryptjs';
import Profile from '../models/profile.model.js';
import 'dotenv/config';

export default {
  async verifyPassword(profileId, currentPassword) {
    const profile = await Profile.findById(profileId);
    if (!profile) throw new Error('Profile not found');
    const isMatch = await bcryptjs.compare(currentPassword, profile.password);
    if (!isMatch) throw new Error('Invalid current password');
    return profile;
  },

  async updatePassword(profile, newPassword) {
    profile.password = newPassword;
    await profile.save();
  }
};