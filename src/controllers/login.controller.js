import bcryptjs from "bcryptjs";
import  Profile  from '../models/profile.model.js';
import  DeletedProfile  from '../models/deleteProfile.model.js';

export const getLogin = (req, res) => {
  res.render('../src/views/login.ejs');
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const profile = await Profile.findOne({ email });
    if (!profile) return handleDeletedProfile(email, password, res);

    const isPasswordMatch = await bcryptjs.compare(password, profile.password);
    if (!isPasswordMatch) return res.status(400).json({ message: 'Password doesn\'t match' });

    const redirectUrl = profile.role === 'admin' ? '/admin' : `/profile?id=${profile._id}`;
    return res.redirect(redirectUrl);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in' });
  }
};

const handleDeletedProfile = async (email, password, res) => {
  const deletedProfile = await DeletedProfile.findOne({ email });
  
  if (!deletedProfile) return res.status(404).json({ message: 'Profile not found' });

  const isPasswordMatch = await bcryptjs.compare(password, deletedProfile.password);
  if (isPasswordMatch) return res.status(400).json({ message: 'Your account has been deleted by the admin.' });

  return res.status(400).json({ message: 'Invalid credentials' });
};
