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

app.get('/communities', async (req, res) => {
    try {
        console.log("Fetching communities...");
        res.setHeader('Content-Type', 'application/json');
        const data = await AccountModel.find();
        console.log('Data fetched:', data); // Log the fetched data
        res.json(data); // Ensure data is sent as JSON
    } catch (error) {
        console.error('Error fetching communities:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const BookmarkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  });
  
  const BookmarkModel = mongoose.model('Bookmark', BookmarkSchema);

  app.post('/api/bookmarks', async (req, res) => {
    const { userId, postId } = req.body;
  
    if (!userId || !postId) {
      return res.status(400).json({ message: 'User ID and Post ID are required' });
    }
  
    try {
      const bookmark = new BookmarkModel({ userId, postId });
      await bookmark.save();
      res.status(201).json({ message: 'Bookmark saved successfully', bookmark });
    } catch (error) {
      console.error('Error saving bookmark:', error);
      res.status(500).json({ message: 'Error saving bookmark', error });
    }
  });
  

app.listen(3011, () => {
    console.log('Server is running on port 3011');
});