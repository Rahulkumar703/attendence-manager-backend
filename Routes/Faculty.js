const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { config } = require('dotenv')
config()

const FacultyModel = require('../Models/FacultyModel');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
        console.log(err);
    }
    else console.log("DB Connected SuccessFully");
})





const fetchData = async () => {
    try {
        const result = await FacultyModel.find();
        return { ...result, message: "Faculty Fetched SuccessFully", type: "success" };

    } catch (err) {
        return { error: err, message: "Can't fetch Facultys !", type: "failed" }
    }
}


// Read
router.get('/fetch', async (req, res) => {
    const result = await fetchData();
    res.send(result);
});





const insertData = async (data) => {
    try {
        const newFaculty = new FacultyModel(data);
        const result = await newFaculty.save();
        return { ...result._doc, message: "Faculty Added SuccessFully", type: "success" };
    }
    catch (err) {
        return { error: err, message: "Faculty Not Added !", type: "failed" }
    }

}


// Create
router.post('/add', async (req, res) => {
    const result = await insertData(req.body);
    res.json(result);
});







// Update
router.put('/update', (req, res) => {
    res.send('update-Facultys')
});





module.exports = router;