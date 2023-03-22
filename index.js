import express, { json } from 'express';
import { config } from 'dotenv';
import { set, connect } from 'mongoose';
import cors from 'cors';
import studentRoutes from './Routes/studentRoutes.js';
import bodyParser from 'body-parser';
config();
const app = express();

// middleware
app.use(express.json())
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
app.get('/', (req, res) => {
    res.json({ status: 200, message: 'welcome to attendence system API' })
})

app.use('/api/v1', studentRoutes)

app.get('*', (req, res) => {
    res.json({ status: 404, message: 'Sorry! this route not found' })
})


// MongoDB Connection
const PORT = process.env.PORT;
set('strictQuery', true);
connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Started at http://localhost:${PORT}/api/v1`);
        })
    })
    .catch(e => {
        console.log(e);
    })

