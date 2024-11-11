import { Router } from 'express';
import Profile from '../models/profile.model.js';
import passport from '../utils/googleauth.js';

const router = Router();

// Ruta za pokretanje prijave putem Google-a
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Povratna ruta nakon autentifikacije
router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`/profile?id=${req.user.id}`);  // Preusmeravanje nakon uspešne prijave
  }
);

export default router;
