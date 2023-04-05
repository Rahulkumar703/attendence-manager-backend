import { Router } from 'express'
import { addClasses, addFaculties, getAttendence, getClasses, getFaculties, takeAttendence } from './../Controllers/facultiesController.js'

const facultyRoutes = Router();

facultyRoutes.get('/faculties', getFaculties);
facultyRoutes.post('/faculty', addFaculties);
facultyRoutes.get('/classes', getClasses);
facultyRoutes.post('/classes', addClasses);
facultyRoutes.get('/attendence', getAttendence);
facultyRoutes.post('/attendence', takeAttendence);





export default facultyRoutes