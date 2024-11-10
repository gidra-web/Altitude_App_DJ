import express from 'express';
import Profile from '../models/profile.model.js';

export const getRegister = async (req, res) => {
    res.render('../src/views/register.ejs');
}

export const createProfile = async (req, res) => {
    try {
        await Profile.create(req.body);
        res.render('../src/views/login.ejs', { message: 'Profile created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error creating profile' });
    }
};

