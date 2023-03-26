import Student from '../Models/Students.js';

// ================ Handling Errors ================ //

const handelError = (e) => {
    let result = { message: '', type: '', errors: [] }

    if (e.code === 11000) {
        result = { type: "warning", message: "This Roll no already exists.", errors: null }
    }
    else if (e.message.includes('student validation failed')) {
        let errors = {};
        Object.values(e.errors).forEach(err => {
            errors[err.path] = err.message;
        })
        result = { message: 'Please fill all details correctly', type: 'error', errors }
    }
    else result = { message: 'Opps! Somthing went wrong, please try again.', type: 'error', errors: null }

    return result;
}

// ================ Handling Errors ================ //





// ================ Fetching Students ================ //

const getStudents = async (req, res) => {
    try {
        const response = await Student.find({}, { password: 0 })
        res.status(200).json(response);
    } catch (e) {
        const error = handelError(e);
        res.status(400).json(error)
    }

}

// ================ Fetching Students ================ //





// ================ Fetching Single Student by id================ //

const getStudent = async (req, res) => {
    const { _id } = req.params;
    try {
        const response = await Student.findOne({ _id })
        if (!response) return res.status(404).json({ message: 'Student with this name not found' });
        res.status(200).json(response);
    } catch (e) {
        const error = handelError(e);
        res.status(400).json(error)
    }

}

// ================ Fetching Single Student ================ //





// ================ Add Student ================ //

const addStudent = async (req, res) => {
    const { name, branch, batch, rollno, email, password } = req.body;


    try {
        const newStudent = await Student.create({ name, branch, batch, rollno, email, password });
        res.status(200).json(newStudent);
    }
    catch (e) {
        const error = handelError(e);
        res.status(400).json(error);
    }

}

// ================ Add Student ================ //




// ================ Function Exports ================ //

export { getStudents, getStudent, addStudent };