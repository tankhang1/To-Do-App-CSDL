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
// export const deleteTask = async (taskId: string) => {
//   try {
//     const result = await Task.deleteOne({ _id: taskId });
//     return { success: true, deletedCount: result.deletedCount };
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal Server Error');
//   }
// };
const TaskModel_1 = __importDefault(require("../../models/TaskModel"));
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (!id) {
            return res.send({ status: 400, message: "ERROR GET TASK: Missing task ID" });
        }
        const result = yield TaskModel_1.default.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            return res.send({ status: 404, message: "ERROR GET TASK: Task not found" });
        }
        res.send({ success: true, deletedCount: result.deletedCount });
    }
    catch (err) {
        console.error("ERROR DELETE TASK:", err);
        res.send({ status: 500, message: "ERROR GET TASK: Internal Server Error" });
    }
});
exports.deleteTask = deleteTask;
exports.default = exports.deleteTask;
