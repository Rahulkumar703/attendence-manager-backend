import mongoose from 'mongoose';

const FacultySchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    classes: {
        type: Array
    }

}, { timeStamp: true });

module.exports = mongoose.model('faculty', FacultySchema);