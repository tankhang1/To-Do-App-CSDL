import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello");
});

mongoose
  .connect(
    "mongodb+srv://doank3442:PXXVQjhHbhJ6LTZs@todoapp.ukcacxa.mongodb.net/Node-API?retryWrites=true&w=majority&appName=ToDoApp"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  });
