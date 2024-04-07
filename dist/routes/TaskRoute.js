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
const GetTask_1 = require("../services/TaskService/GetTask");
const router = express_1.default.Router();
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
const GetTask_1 = require("../services/TaskService/GetTask");
const router = express_1.default.Router();
router.delete("/deleteToDo", DeleteTask_1.deleteTask);
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
