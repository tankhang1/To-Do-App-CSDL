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
exports.getPaginatedTasks = exports.searchTasksByText = exports.getAllTasks = void 0;
const TaskModel_1 = __importDefault(require("../../models/TaskModel"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    console.log("userId", userId);
    if (!userId) {
        return res.send({ status: 400, message: "ERROR GET TASK: Missing UserID" });
    }
    try {
        const tasks = yield TaskModel_1.default.find({ taskName: "Đi ngủ" });
        res.send({ status: 200, message: tasks });
    }
    catch (error) {
        res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
    }
});
exports.getAllTasks = getAllTasks;
const searchTasksByText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.send({
                status: 400,
                message: "ERROR GET TASK: Missing UserID",
            });
        }
        const searchText = req.query.text;
        const tasks = yield TaskModel_1.default.find({
            userId,
            $or: [
                { taskName: { $regex: searchText, $options: "i" } },
                { description: { $regex: searchText, $options: "i" } },
            ],
        });
        res.send({ status: 200, message: tasks });
    }
    catch (error) {
        res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
    }
});
exports.searchTasksByText = searchTasksByText;
const getPaginatedTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { page = 1, limit = 3 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    try {
        const skip = (page - 1) * limit;
        const tasks = yield TaskModel_1.default.find().limit(limit).skip(skip).exec();
        const totalCount = yield TaskModel_1.default.countDocuments();
        return res.status(200).json({
            data: tasks,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
        });
    }
    catch (error) {
        console.error("ERROR GET PAGINATED TASKS:", error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
});
exports.getPaginatedTasks = getPaginatedTasks;
