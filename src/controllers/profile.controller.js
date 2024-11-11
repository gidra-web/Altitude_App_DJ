import express from 'express';
import Profile from '../models/profile.model.js';
import VerifyService from '../services/verify.service.js';

export const getProfile = async (req, res) => {
  const { id } = req.query;
  try {
    const profile = await Profile.findById(id); 
    res.render('../src/views/profile.ejs', { profile });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, name, lastname, dateOfBirth } = req.body;
    await Profile.findByIdAndUpdate(
      id,
      { name, lastname, dateOfBirth },
      { new: true }
    );
    res.redirect(`/profile?id=${id}`);
  } catch (error) {
    res.status(500).send('Server Error');
    console.log(error);
  }
}

export const changePassword = async (req, res) => {
  try {
    const { _id, currentPassword, newPassword } = req.body;
    const profile = await VerifyService.verifyPassword(_id, currentPassword);
    await VerifyService.updatePassword(profile, newPassword);

    res.send('Successfully updated password');
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error)
  }
}

export const uploadImage = async (req, res) => {
    res.json(req.file);
}