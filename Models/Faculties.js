import mongoose from 'mongoose';

const ClassesSchema = mongoose.Schema(
    {
        subject: {
            type: String,
            required: [true, 'Please enter the subject name'],
            trim: true,
            lowercase: true,
        },
        batch: {
            type: Number,
            required: [true, 'Please enter batch year'],
            trim: true,
        },
        branch: {
            type: String,
            required: [true, 'Please enter branch name'],
            trim: true,
            lowercase: true,
        }
    }
);

const FacultySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter your name'],
        trim: true,
        lowercase: true,
    },
    designation: {
        type: String,
        required: [true, 'Please enter your designation'],
        lowercase: true,
        trim: true
    },
    classes: [ClassesSchema]

}, { timeStamp: true });

const Faculty = mongoose.model('faculty', FacultySchema);

export default Faculty;