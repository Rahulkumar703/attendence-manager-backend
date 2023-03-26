import { Router } from 'express';
import { addStudent, getStudent, getStudents } from '../Controllers/studentsController.js';


const studentRoutes = Router();



// Fetch Students
studentRoutes.get('/students', getStudents)


// Fetch Student
studentRoutes.get('/student/:_id', getStudent)


// Add Student
studentRoutes.post('/student', addStudent);










export default studentRoutes;