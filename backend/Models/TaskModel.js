const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskModelSchema = new Schema({
    taskName:{
        type: String,
        required: true
    },
    isDone:{
        type: Boolean,
        required: true
    }
})

const TaskModel = mongoose.model('todos',TaskModelSchema);
module.exports = TaskModel;