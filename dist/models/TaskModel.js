"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchemma = new mongoose_1.Schema({
    taskName: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
        required: false,
    },
    createdAt: {
        type: "Number",
        required: true,
        default: new Date().getTime(),
    },
    updatedAt: {
        type: "Number",
        required: true,
        default: new Date().getTime(),
    },
    userId: {
        type: "String",
        required: true,
    },
    status: {
        type: "Boolean",
        required: true,
        default: false,
    },
});
const TaskModel = (0, mongoose_1.model)("Task", TaskSchemma);
exports.default = TaskModel;
