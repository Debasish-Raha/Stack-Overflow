import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import userroutes from './routes/user.js';
import questionroutes from './routes/question.js';
import answerroutes from './routes/answer.js';

// Load environment variables
dotenv.config();

// Resolve the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Debugging: Check if the .env file exists and if variables are loaded correctly
const envPath = new URL('.env', import.meta.url).pathname;
if (fs.existsSync(envPath)) {
    console.log('.env file found at:', envPath);
} else {
    console.error('.env file not found. Ensure it is placed correctly in the server directory.');
}

console.log("Checking if environment variables are loaded correctly:");
console.log("MONGODB_URL:", process.env.MONGODB_URL || 'Not defined');
console.log("PORT:", process.env.PORT || 'Not defined');
console.log("JWT_SECRET:", process.env.JWT_SECRET || 'Not defined');

const app = express();

// Middleware settings
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// API routes
app.use('/user', userroutes);
app.use('/questions', questionroutes);
app.use('/answer', answerroutes);

// Root route
app.get('/', (req, res) => {
    res.send("Codequest is running perfectly");
});

// Debugging statements to check environment variables again
console.log('MONGODB_URL:', process.env.MONGODB_URL || 'Not defined');
console.log('PORT:', process.env.PORT || 'Not defined');

// Server configuration
const PORT = process.env.PORT || 5000;
const database_url = process.env.MONGODB_URL;

if (!database_url) {
    console.error("MONGODB_URL is not defined in the environment variables.");
    process.exit(1);  // Stop the process if no MongoDB URL is provided
}

// MongoDB connection
mongoose.connect(database_url)
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch((err) => console.error("MongoDB connection error:", err.message));
