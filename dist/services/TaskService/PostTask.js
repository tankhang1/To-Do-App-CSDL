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
exports.addTask = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const crypto_1 = require("crypto");
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskName, description, priority, userId, status } = req.body;
        console.log(req.body);
        if (!taskName || !description || !userId) {
            return res.status(400).send("ERROR ADD TASK: Missing required fields");
        }
        const user = yield UserModel_1.default.findOne({ userId });
        if (!user) {
            const newTask = yield UserModel_1.default.create({
                userId,
                tasks: [
                    Object.assign(Object.assign({}, req.body), { _id: (0, crypto_1.randomUUID)(), createdAt: new Date().getTime(), updatedAt: new Date().getTime() }),
                ],
            });
            return res.status(200).json({ task: newTask === null || newTask === void 0 ? void 0 : newTask.tasks });
        }
        const updatedTasks = user.tasks ? [...user.tasks] : [];
        const updateUser = yield UserModel_1.default.findOneAndUpdate({ userId }, {
            tasks: [
                Object.assign(Object.assign({}, req.body), { _id: (0, crypto_1.randomUUID)(), createdAt: new Date().getTime(), updatedAt: new Date().getTime() }),
                ...updatedTasks,
            ],
        }, { new: true });
        if (updateUser === null || updateUser === void 0 ? void 0 : updateUser.tasks) {
            return res.status(200).json({ task: updateUser === null || updateUser === void 0 ? void 0 : updateUser.tasks[0] });
        }
        return res.status(400).send("Cannot add new task");
    }
    catch (err) {
        console.error("ERROR ADD TASK:", err);
        return res.status(500).send("ERROR ADD TASK: Internal Server Error");
    }
});
exports.addTask = addTask;
