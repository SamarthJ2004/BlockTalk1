const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();

app.use(cors());

const URL = "mongodb+srv://anushka:anushkas@cluster0.w2aa386.mongodb.net/sample_geospatial?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(URL)
    .then(() => {
        console.log("You are connected to MongoDB");
    })
    .catch((err) => {
        console.error("Oops!! Some error occurred: ", err);
    });




app.listen(3009, () => {
    console.log('Server is running on port 3009');
});
