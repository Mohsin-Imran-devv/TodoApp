const express = require("express");
const path = require("path");
const rootDir = require("./utils/pathUtil");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const todoItemsRouter = require("./routes/todoItemsRouter");
const errorController = require('./controllers/errorsController')
const MONGO_URL =
  "mongodb+srv://root:7272@mcoding.9qq795b.mongodb.net/todo?retryWrites=true&w=majority&appName=CompleteCoding";

const app = express();
app.use(express.static(path.join(rootDir, "public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


app.use("/api/todo", todoItemsRouter);
app.use(errorController.pageNotFound);



const PORT = 3000;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Error while connecting to MongoDB:", err.message);
  });
