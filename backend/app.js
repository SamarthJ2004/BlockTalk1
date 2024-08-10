const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

app.set('view engine', 'ejs');

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());


const URL = "mongodb+srv://anushka:anushkas@cluster0.w2aa386.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(URL)
    .then(() => {
        console.log("You are connected to MongoDB");
    })
    .catch((err) => {
        console.error("Oops!! Some error occurred: ", err);
    });


const AccountSchema = new mongoose.Schema({
    account: { type: String, required: true, unique: true },
    timestamp: { type: Date, default: Date.now }
});

const AccountModel = mongoose.model('Account', AccountSchema);


app.get('/api/data', (req, res) => {
    res.json({ message: 'CORS is enabled!' });
});



app.post('/api/account', (req, res) => {
    const { account } = req.body;

    
    if (!account) {
        return res.status(400).json({ message: 'Account is required' });
    }

    
    const newAccount = new AccountModel({ account });

    
    newAccount.save()
        .then(data => {
            res.status(201).json({ message: 'Account saved successfully', data });
        })
        .catch(err => {
            console.error('Error saving account:', err);
            if (err.code === 11000) {
                res.status(400).json({ message: 'Account already exists' });
            } else {
                res.status(500).json({ message: 'Error saving account', error: err });
            }
        });
});


app.get('/communities', (req,res)=>{
    AccountModel.find()
    .then(()=>{console.log("done")} )
    .catch((err)=>{console.log(err)})
    
})


app.listen(3010, () => {
    console.log('Server is running on port 3010');
});
