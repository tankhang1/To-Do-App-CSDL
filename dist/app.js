"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const TaskRoute_1 = __importDefault(require("./routes/TaskRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.get("/", (req, res) => {
//   res.send("Hello");
// });
app.use("/", TaskRoute_1.default);
mongoose_1.default
  .connect(
    "mongodb+srv://doank3442:PXXVQjhHbhJ6LTZs@todoapp.ukcacxa.mongodb.net/Node-API?retryWrites=true&w=majority&appName=ToDoApp"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("server running on port 3000");
    });
  });
