import Profile from '../models/profile.model.js';
import bcryptjs from 'bcryptjs';
import 'dotenv/config';

// Admin credentials

export const addAdmin  = async () => {
  try {
    // Check if the admin already exists
    const existingAdmin = await Profile.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin already exists.');
      return;
    }

    // Create a new admin user
    new Profile({
      name: process.env.ADMIN_USERNAME,
      lastname: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      dateOfBirth: new Date(),
      role: 'admin',
    }).save();

    console.log('Admin added successfully.');
  } catch (error) {
    console.error('Error adding admin:', error);
  }
};