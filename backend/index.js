const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require("dotenv").config();
connectDB()
const app = express();

//parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(cors());
app.use('/uploads', express.static('uploads'))
//routes
// app.use('/', require("./routes"))
app.use('/', require('./routes'))
app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});
