import mongoose from 'mongoose';

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Name is Required',
        trim: true
    },
    email: {
        type: String,
        required: 'Email is Required',
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: 'Password is Required'
    },
    batch: {
        type: Number,
        required: 'Batch is Required',
        trim: true,
    },
    branch: {
        type: String,
        required: 'Branch is Required',
        trim: true,
        lowercase: true,
    },
    rollno: {
        type: Number,
        required: [true, 'Roll No. is Required'],
        trim: true,
        unique: true,
    },
    classes: {
        type: [
            {
                faculty: {
                    type: String,
                    trim: true,
                    required: 'Faculty Name is Required'
                },
                subject: {
                    type: String,
                    lowercase: true,
                    trim: true,
                    required: 'Subject is Required'
                },
                attendence: {
                    type: [
                        {
                            date: {
                                type: Date,
                                required: 'Attendence Date is Required'
                            },
                            isPresent: {
                                type: Boolean,
                                default: false
                            }
                        }
                    ]
                }
            }
        ],
        required: false
    }

}, { timestamps: true });

const Student = mongoose.model('student', StudentSchema)

export default Student;