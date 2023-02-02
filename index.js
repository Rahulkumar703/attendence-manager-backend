const express = require('express');
const { config } = require('dotenv')
const userRoutes = require('./Routes/Students');
const facultyRoutes = require('./Routes/Faculty');
var cors = require('cors')
config();
const app = express();

// middleware
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT;
console.log();

app.use('/student', userRoutes);
app.use('/faculty', facultyRoutes);




app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
})