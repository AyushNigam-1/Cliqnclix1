const express = require('express');
const app = express();
const path = require("path")
const mongoose = require('mongoose');
const userRouter = require('./Routes/userRoutes')
const assetRouter = require('./Routes/assetRoutes')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use('/users', userRouter);
app.use('/assets', assetRouter);
const MONGO_URI = '';
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.listen("3001", () => {
    console.log(`Server is listening on port 3001`);
});