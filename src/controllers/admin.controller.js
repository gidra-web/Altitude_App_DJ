import Profile from "../models/profile.model.js";
import DeletedProfile from "../models/deleteProfile.model.js";

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.render('../src/views/admin.ejs', { profiles, query: '' })
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving profiles" });
  }
};

export const searchProfiles = async (req, res) => {
  try {
    const { email = '', dateOfBirth = '' } = req.query;

    const query = {};
    if (email) query.email = email.toLowerCase().trim();

    if (dateOfBirth) {
      try {
        query.dateOfBirth = new Date(dateOfBirth);
      } catch (error) {
        return res.status(400).json({ message: 'Invalid date format for dateOfBirth' });
      }
    }

    const profiles = await Profile.find(query);

    if (profiles.length === 0) return res.status(404).json({ message: 'No profiles found matching your criteria.' });

    return res.status(200).json(profiles);
  } catch (error) {
    console.error('Error searching profiles:', error); 
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProfileById = async (req, res) => {
  const { id } = req.params;
  const profile = await Profile.findById(id);
  try {
    if (profile && profile.role === 'admin') {
      return res.status(400).json({ message: 'Admin cannot be deleted' });
    }

    await DeletedProfile.create({
      name: profile.name,
      email: profile.email, 
      password: profile.password,
      deletedAt: new Date(), 
      reason: 'Admin deletion', 
    });

    await Profile.findByIdAndDelete(id);
    res.redirect('/admin');
  } catch (error) {
      res.status(500).send({ message: 'Error deleting profile' });
      console.error('Error deleting profile:', error);
  }
};
