"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = void 0;
const TaskModel_1 = __importDefault(require("../../models/TaskModel"));
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, taskName, description, createdAt, updatedAt, userId, status } = req.query;
        if (!taskName || !description || !createdAt || !updatedAt || !userId || !status) {
            return res.status(400).send("ERROR ADD TASK: Missing required fields");
        }
        const updatedTask = yield TaskModel_1.default.findByIdAndUpdate(id, {
            taskName,
            description,
            createdAt,
            updatedAt,
            userId,
            status,
        }, { new: true });
        if (!updatedTask) {
            return res.status(404).send("ERROR UPDATE TASK: Task not found");
        }
        res.status(200).json({ updatedTask });
    }
    catch (error) {
        console.error("ERROR UPDATE TASK:", error);
        res.status(500).send("ERROR UPDATE TASK: Internal Server Error");
    }
});
exports.updateTask = updateTask;
