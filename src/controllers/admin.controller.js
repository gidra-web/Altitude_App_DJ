import Profile from "../models/profile.model.js";
import DeletedProfile from "../models/deleteProfile.model.js";

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    res.render('../src/views/admin.ejs', { profiles, query: '' })
    //res.render("../src/views/admin.ejs", { profiles });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving profiles" });
  }
};

export const searchProfiles = async (req, res) => {
  try {
    // Extract query parameters (handle potential absence gracefully)
    const { email = '', dateOfBirth = '' } = req.query;

    // Construct a dynamic filter object with proper type checking
    const query = {};
    if (email) {
      query.email = email.toLowerCase().trim(); // Sanitize email for case-insensitive search and trimming
    }
    if (dateOfBirth) {
      try {
        query.dateOfBirth = new Date(dateOfBirth);
      } catch (error) {
        return res.status(400).json({ message: 'Invalid date format for dateOfBirth' });
      }
    }

    // Query the database with the constructed filter
    const profiles = await Profile.find(query);

    // Handle successful and empty search results effectively
    if (profiles.length === 0) {
      return res.status(404).json({ message: 'No profiles found matching your criteria.' });
    }

    // Send successful response with proper status code and filtered profiles
    return res.status(200).json(profiles);
  } catch (error) {
    console.error('Error searching profiles:', error); // Log the error for debugging
    return res.status(500).json({ message: 'Internal server error' }); // Generic error message for security
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
