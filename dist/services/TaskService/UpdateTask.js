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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = void 0;
const UserModel_1 = __importDefault(require("../../models/UserModel"));
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { _id, userId } = _a, body = __rest(_a, ["_id", "userId"]);
        console.log("update", req.body);
        const user = yield UserModel_1.default.findOne({ userId });
        if (!user) {
            return res.status(404).send("ERROR UPDATE TASK: User not found");
        }
        const tasks = user.tasks;
        const newTasks = tasks === null || tasks === void 0 ? void 0 : tasks.map((task) => {
            if (task._id === _id)
                return Object.assign({}, req.body);
            return task;
        });
        console.log("new", newTasks);
        yield UserModel_1.default.findOneAndUpdate({ userId }, { tasks: newTasks }, { new: true });
        //console.log("updateTask", updatedTask);
        return res.status(200);
    }
    catch (error) {
        console.error("ERROR UPDATE TASK:", error);
        return res.status(500).send("ERROR UPDATE TASK: Internal Server Error");
    }
});
exports.updateTask = updateTask;
