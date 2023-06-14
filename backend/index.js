// Importing necessary modules and libraries
import express from 'express'; // Express framework for creating the server
import 'dotenv/config'; // Loads environment variables from a .env file
import mongoose from 'mongoose'; // MongoDB object modeling tool
import morgan from 'morgan'; // HTTP request logger middleware
import cookieParser from 'cookie-parser'; // Parses cookies attached to the client request
import cors from 'cors'; // Middleware for handling Cross-Origin Resource Sharing
import allRoutes from './routes/index.js'; // Importing all routes from the routes directory

// Creating the Express app and setting the port number
const app = express();
const PORT = process.env.PORT || 8000;

// Getting the allowed client domains from environment variables
const CLIENT_URL_STRING = process.env.CLIENT_URL || 'http://localhost:3000';
const allowedDomains = CLIENT_URL_STRING.split(', ');
console.log(allowedDomains);

// Middleware setup
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      // Bypass the requests with no origin (like curl requests, mobile apps, etc)
      if (!origin) return callback(null, true);

      // Check if the origin is allowed
      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  }),
);
app.use(morgan('tiny')); // Use 'tiny' format for request logging
app.use(express.json()); // Parse JSON in the request body
app.use(cookieParser()); // Parse cookies from the request

// Mounting the routes
app.use('/api', allRoutes);

// Error handler middleware
app.use((err, req, res) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message, stack: err.stack });
});

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});