"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GetTask_1 = require("../services/TaskService/GetTask");
const router = express_1.default.Router();
router.get("/tasks", GetTask_1.getAllTasks);
router.get("/tasks/search", GetTask_1.searchTasksByText);
exports.default = router;
