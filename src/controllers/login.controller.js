import bcryptjs from "bcryptjs";
import  Profile  from '../models/profile.model.js';
import  DeletedProfile  from '../models/deleteProfile.model.js';

export const getLogin = (req, res) => {
  res.render('../src/views/login.ejs');
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    let profile = await Profile.findOne({ email });

    if (!profile) {

      const deletedProfile = await DeletedProfile.findOne({ email });

      if (deletedProfile) {

        const isPasswordMatch = await bcryptjs.compare(password, deletedProfile.password);
        
        if (isPasswordMatch) {
          return res.status(400).json({ message: 'Your account has been deleted by the admin.' });
        }

        return res.status(400).json({ message: 'Invalid credentials' });
      }

      return res.status(404).json({ message: 'Profile not found' });
    }
    const isPasswordMatch = await bcryptjs.compare(password, profile.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (profile.role === 'admin') {
      return res.redirect('/admin');
    }
    res.redirect(`/profile?id=${profile._id}`);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};