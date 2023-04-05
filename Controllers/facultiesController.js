import Faculty from "../Models/Faculties.js";
import Student from "../Models/Students.js";

const handelError = (e) => {
    let result = { message: '', type: '', errors: [] }

    if (e.code === 11000) {
        result = { type: "warning", message: "You are already registered. You can add your classes", errors: null }
    }
    else if (e.message.includes('faculty validation failed')) {
        let errors = {};
        Object.values(e.errors).forEach(err => {
            errors[err.path] = err.message;
        })
        result = { message: 'Please fill all details correctly', type: 'error', errors }
    }
    else result = { message: 'Opps! Somthing went wrong, please try again.', type: 'error', errors: null }

    return result;
}





// ================ Fetch Faculties ================ //

async function getFaculties(req, res) {
    try {
        const faculties = await Faculty.find();
        res.status(200).json(faculties)
    }
    catch (e) {
        const error = handelError(e);
        res.status(400).json(error)
    }
}

// ================ Fetch Faculties ================ //






// ================ Add Faculties ================ //

async function addFaculties(req, res) {
    const { name, designation } = req.body;


    try {
        const newFaculty = await Faculty.create({ name, designation });
        res.status(200).json(newFaculty);
    }
    catch (e) {
        const error = handelError(e);
        res.status(400).json(error);
    }

}

// ================ Add Faculties ================ //






// ================ Fetch Classes ================ //

async function getClasses(req, res) {
    const { _id } = req.body;


    try {
        const faculties = await Faculty.find({ _id }, { classes: true });
        res.status(200).json(faculties)
    }
    catch (e) {
        const error = handelError(e);
        res.status(400).json(error);
    }

}

// ================ Fetch Classes ================ //






// ================ Add Classes ================ //

async function addClasses(req, res) {
    const { _id, subject, branch, batch } = req.body;


    try {
        const isAlreadyExist = await Faculty.findOne(
            {
                $and: [
                    { "classes.subject": subject },
                    { "classes.branch": branch },
                    { "classes.batch": batch }
                ],
                _id
            }
            , { classes: true })

        console.log(!isAlreadyExist);


        if (!isAlreadyExist) {
            const newClass = await Faculty.updateOne({ _id }, { $addToSet: { classes: { subject, branch, batch } } });
            const addSubjectToStudent = await Student.updateMany({ branch, batch }, { $addToSet: { classes: { subject, facultyId: _id } } })
            res.status(200).json({ newClass, addSubjectToStudent });
        }
        else {
            res.status(409).json({ type: 'warning', message: 'This Class is already added', error: isAlreadyExist });

        }
    }
    catch (e) {
        console.log(e);
        const error = handelError(e);
        res.status(400).json(error);
    }

}

// ================ Add Classes ================ //






// ================ Take Attendence ================ //

async function takeAttendence(req, res) {
    const { facultyId } = req.body;


    try {
        const classes = await Student.find({ "classes.facultyId": facultyId })
        res.json(classes)
    }
    catch (e) {
        console.log(e);
        const error = handelError(e);
        res.status(400).json(error);
    }

}

// ================ Take Attendence ================ //






// ================ Fetch Attendence ================ //

async function getAttendence(req, res) {
    const { facultyId } = req.body;


    try {
        const classes = await Student.find({ "classes.facultyId": facultyId }, { "classes.attendance": true })
        res.json(classes)
    }
    catch (e) {
        console.log(e);
        const error = handelError(e);
        res.status(400).json(error);
    }

}

// ================ Fetch Attendence ================ //


export { getFaculties, addFaculties, getClasses, addClasses, takeAttendence, getAttendence };