import { Router } from 'express';
import Student from '../Models/Students.js';


const studentRoutes = Router();



// Fetch Students
studentRoutes.get('/students', async (req, res) => {
    try {
        const response = await Student.find({}, { password: 0 })
        res.json(response);
    } catch (e) {
        console.log(e);
        res.json({ ...e, type: 'error', message: 'Opps! Somthing went wrong. ' })
    }
})


// Add Students
studentRoutes.post('/student', async (req, res) => {
    const { student } = req.body;

    try {
        const newStudent = await Student.insertMany(student, { password: 0 });
        res.json(newStudent);
    }
    catch (e) {
        console.log(e);
        res.json({ type: 'error', message: e.code === 11000 ? 'Student already exist' : 'Opps ! Somthing went wrog' })
    }

})










export default studentRoutes;