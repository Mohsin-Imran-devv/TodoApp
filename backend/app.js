const express = require("express");
const path = require("path");
const rootDir = require("./utils/pathUtil");
const cors = require("cors");
const mongoose = require("mongoose");
const todoItemsRouter = require("./routes/todoItemsRouter");
const errorController = require('./controllers/errorsController');

const MONGO_URL = process.env.MONGO_URL;

const app = express();

// YEH LINE CHANGE KARO - apna actual frontend URL dalo
app.use(cors({
  origin: 'https://todo-app-frontend-liart-ten.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

// Database connection
const connectToDatabase = async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");
  }
};

// Health check
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

// Vercel handler
module.exports = async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};