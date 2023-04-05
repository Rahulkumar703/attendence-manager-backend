import mongoose from 'mongoose';


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
    facultyId: {
        type: mongoose.ObjectId,
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
            required: [true, 'Please enter your name'],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: Number,
            trim: true,
        },
        password: {
            type: String,
            select: false,
        },
        isLE: {
            type: Boolean,
            default: false
        },
        batch: {
            type: Number,
            required: [true, 'Please enter your batch'],
            trim: true
        },
        branch: {
            type: String,
            required: [true, 'Please enter your Branch'],
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
