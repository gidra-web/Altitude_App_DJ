import express from 'express';
import session from 'express-session';
import passport from '../utils/googleauth.js';
import authRoutes from '../routes/authGoogle.route.js';

import routeLogin from './login.route.js';
import routeRegister from './register.route.js';
import routeProfile from './profile.route.js';
import routeAdmin from './admin.route.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.use('/', routeLogin );
router.use('/', routeRegister );
router.use('/admin', routeAdmin );
router.use('/profile', routeProfile );

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));
  
router.use(passport.initialize());
router.use(passport.session());
  
  // Dodaj rute za autentifikaciju
router.use('/', authRoutes);

export default router;