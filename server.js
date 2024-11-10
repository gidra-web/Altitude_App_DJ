import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import routes from './src/routes/index.js';
import conncetDB from './src/config/db.js';

dotenv.config( {path: '.env'});

const app = express();
const __dirname = path.resolve();

app.set('view engine', 'ejs');

// Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  //form url pars to object
app.use(express.json());
app.use(helmet({
    strictTransportSecurity: false
}));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));

// all routes
app.use('/', routes)

app.listen(process.env.PORT, async() => {
    console.log(`LINK: http://localhost:${process.env.PORT}`);
    await conncetDB();
});