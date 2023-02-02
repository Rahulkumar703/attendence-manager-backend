const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    branch: {
        type: String,
        require: true
    },
    roll: {
        type: Number,
        unique: true,
        require: true
    },
    college: {
        type: String,
        require: true
    },
    semester: {
        type: Number,
        require: true
    },
    batch: {
        type: Number,
        require: true
    },
    attendence: [{
        subject: {
            type: String,
            require: true
        },
        faculty: {
            type: String,
            require: true
        },
        status: {
            type: Boolean,
            require: true
        },
        date: {
            type: Date,
            require: true
        },
    }],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('student', studentSchema);