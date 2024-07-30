require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000
// const bodyParser=require('body-parser');
const cors = require('cors');
const productsRoutes = require('./routes/productsRouter')
const authRouter = require('./routes/authRouter')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Home")
})

app.use('/products', productsRoutes)
app.use('/auth', authRouter)

// mongoDB connection
const connectMongoDB =async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error Connecting to MongoDB: ",error.message)
    }
}

const startServer=()=>{
    //listening 
app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

connectMongoDB().then(startServer).catch((error)=>{
console.log("Error while starting server: ",error.message)
})