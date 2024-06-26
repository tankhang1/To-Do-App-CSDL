"use strict";
// import Task from '../../models/TaskModel';
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
exports.deleteTask = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { _id, userId } = req.query;
        // const result = await Task.deleteOne({ _id: id });
        // if (result.deletedCount === 0) {
        //    return res.send({ status: 404, message: "ERROR GET TASK: Task not found" });
        // }
        console.log("new tasks ", _id);
        const user = yield UserModel_1.default.findOne({
            userId: userId === null || userId === void 0 ? void 0 : userId.toString(),
        });
        if (user) {
            const newTasks = (_a = user.tasks) === null || _a === void 0 ? void 0 : _a.filter((task) => task._id !== _id);
            console.log("new tasks ", newTasks);
            yield UserModel_1.default.findOneAndUpdate({ userId: userId === null || userId === void 0 ? void 0 : userId.toString() }, { tasks: newTasks }, // Remove all instances of the task with the specified _id
            { new: true });
            return res.send({ success: true });
        }
        return res.send({
            status: 500,
            message: "ERROR DELETE TASK: User id not found",
        });
    }
    catch (err) {
        console.error("ERROR DELETE TASK:", err);
        res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
    }
});
exports.deleteTask = deleteTask;
exports.default = exports.deleteTask;
