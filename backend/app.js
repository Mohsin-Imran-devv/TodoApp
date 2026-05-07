const express = require("express");
const path = require("path");
const rootDir = require("./utils/pathUtil");
const cors = require("cors");
const mongoose = require("mongoose");
const todoItemsRouter = require("./routes/todoItemsRouter");
const errorController = require('./controllers/errorsController');

const MONGO_URL = process.env.MONGO_URL;

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

// Database connection
let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  
  await mongoose.connect(MONGO_URL);
  cachedDb = mongoose.connection;
  console.log("✅ Connected to MongoDB");
  return cachedDb;
};

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend is running",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// API routes
app.use("/api/todo", todoItemsRouter);

// Error handling
app.use(errorController.pageNotFound);

// Export for Vercel
module.exports = async (req, res) => {
  // Connect to database before handling request
  if (mongoose.connection.readyState !== 1) {
    await connectToDatabase();
  }
  return app(req, res);
};