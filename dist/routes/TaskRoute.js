"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DeleteTask_1 = require("../services/TaskService/DeleteTask");
const router = express_1.default.Router();
router.delete("/deleteTodo", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.query;
      const result = yield (0, DeleteTask_1.deleteTask)(
        id === null || id === void 0 ? void 0 : id.toString()
      );
      if (result.success) {
        res.send({ success: true, deletedCount: result.deletedCount });
      } else {
        res.status(404).json({ success: false, error: "Không tìm thấy task" });
      }
    } catch (error) {
      console.error(error);
      res.send({ success: false, error: "Lỗi" });
    }
  })
);
const GetTask_1 = require("../services/TaskService/GetTask");
router.get("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello");
  })
);
router.get("/tasks", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    try {
      const tasks = yield (0, GetTask_1.getAllTasks)(userId);
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
  })
);
router.get("/tasks/search", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    const searchText = req.query.text;
    try {
      const tasks = yield (0, GetTask_1.searchTasksByText)(userId, searchText);
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
  })
);
exports.default = router;
