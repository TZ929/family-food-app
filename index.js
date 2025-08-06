const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const foodPostsRouter = require('./routes/foodPosts');

app.use('/users', usersRouter);
app.use('/food-posts', foodPostsRouter);

// Centralized error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Family Food & Recipe Sharing App API');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
}); 