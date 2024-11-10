import { Router } from 'express';
import passport from '../utils/googleauth.js';

const router = Router();

// Ruta za pokretanje prijave putem Google-a
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Povratna ruta nakon autentifikacije
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`/profile?id=${profile._id}`);  // Preusmeravanje nakon uspešne prijave
  }
);

export default router;
