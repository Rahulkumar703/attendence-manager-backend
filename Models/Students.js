import mongoose from 'mongoose';
import validator from 'validator'


const AttendenceSchema = mongoose.Schema({
    date: {
        type: Date,
        required: 'Attendance Date is Required'
    },
    isPresent: {
        type: Boolean,
        default: false
    }
});

const ClassesSchema = mongoose.Schema({
    faculty: {
        type: String,
        trim: true,
        required: 'Please enter your name'
    },
    subject: {
        type: String,
        lowercase: true,
        trim: true,
        required: 'Please enter the subject name'
    },
    attendance: [AttendenceSchema]
});

const StudentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: 'Please enter your name',
            trim: true
        },
        email: {
            type: String,
            required: 'Please provide a email to continue',
            trim: true,
            lowercase: true,
            validate: [(value) => validator.isEmail(value), 'Please enter a valid email']
        },
        password: {
            type: String,
            required: 'Please set a password to continue',
            select: false,
            minlength: [6, 'Password minimum length should be 6 character']
        },
        batch: {
            type: Number,
            required: 'Please enter your batch',
            trim: true
        },
        branch: {
            type: String,
            required: 'Please enter your Branch',
            trim: true,
            lowercase: true
        },
        rollno: {
            type: Number,
            required: [true, 'Please enter your roll no'],
            trim: true,
            unique: true
        },
        classes: [ClassesSchema]
    },
    { timestamps: true }
);

const Student = mongoose.model('student', StudentSchema);

export default Student;
