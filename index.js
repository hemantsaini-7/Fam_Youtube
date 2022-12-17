import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import videosRoutes from './routes/videos.js'
import {continousFetch, getVideos} from './utils/continousFetch.js'
import path from 'path';

// For accesing .env variables
dotenv.config();

//Connecting with our database
connectDB();

const app = express()

//Rendering dashboard
const __dirname = path.resolve();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Body Parser
app.use(express.json())

//Routes
app.use('/', videosRoutes)

//Public folder access to .ejs files
app.use('/public', express.static('public'));

// running getVideos for first time data fetch
getVideos();

//running continousFetch for continous fetch
continousFetch();

//Port of application
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
