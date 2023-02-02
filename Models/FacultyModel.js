const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    classes: [
        {
            branch: {
                type: String,
                require: true
            },
            subject: {
                type: String,
                require: true
            },
            batch: {
                type: Number,
                require: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('faculty', facultySchema);