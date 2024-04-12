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
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let { userId, limit = 8, page = 1 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    if (!userId) {
        return res.send({ status: 400, message: "ERROR GET TASK: Missing UserID" });
    }
    try {
        const skip = (page - 1) * limit;
        const user = yield UserModel_1.default.findOne({
            userId: userId.toString(),
        })
            .limit(limit)
            .skip(skip)
            .exec();
        return res.status(200).json({
            data: user === null || user === void 0 ? void 0 : user.tasks,
            currentPage: page,
            totalPages: Math.ceil((_b = (_a = user === null || user === void 0 ? void 0 : user.tasks) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0 / limit),
            totalCount: (_c = user === null || user === void 0 ? void 0 : user.tasks) === null || _c === void 0 ? void 0 : _c.length,
        });
    }
    catch (error) {
        res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
    }
});
exports.getAllTasks = getAllTasks;
const searchTasksByText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.send({
                status: 400,
                message: "ERROR GET TASK: Missing UserID",
            });
        }
        const searchText = req.query.text;
        const user = yield UserModel_1.default.findOne({
            userId: userId.toString(),
        });
        const tasks = (_d = user === null || user === void 0 ? void 0 : user.tasks) === null || _d === void 0 ? void 0 : _d.filter((task) => {
            var _a;
            return ((_a = task.description) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchText.toLowerCase())) ||
                task.taskName.toLowerCase().includes(searchText.toLowerCase());
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
