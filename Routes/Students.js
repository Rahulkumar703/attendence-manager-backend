const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { config } = require('dotenv')
config()

const StudentsModel = require('../Models/StudentsModel');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
        console.log(err);
    }
    else console.log("DB Connected SuccessFully");
})





const fetchData = async () => {
    try {
        const result = await StudentsModel.find();
        return { ...result, message: "Student Fetched SuccessFully", type: "success" };

    } catch (err) {
        return { error: err, message: "Can't fetch Students !", type: "failed" }
    }
}


// Read
router.get('/fetch', async (req, res) => {
    const result = await fetchData();
    res.send(result);
});





const insertData = async (data) => {
    try {
        const newStudent = new StudentsModel(data);
        const result = await newStudent.save();
        return { ...result._doc, message: "Student Added SuccessFully", type: "success" };
    }
    catch (err) {
        return { error: err, message: "Student Not Added !", type: "failed" }
    }

}


// Create
router.post('/add', async (req, res) => {
    const result = await insertData(req.body);
    res.json(result);
});







// Update
router.put('/update', (req, res) => {
    res.send('update-students')
});







// delete
router.delete('/remove', (req, res) => {
    res.send('remove-students')
});



module.exports = router;