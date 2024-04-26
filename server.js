const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // JWT library
require('dotenv').config(); // Load environment variables (if using dotenv)

const verifyJWT = require('./auth'); // Import middleware function

// ... other code ...




const express = require('express');

const app = express();

// Your other server code goes here

// Start the server
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


const express = require('express');
const bodyParser = require('body-parser');
// ... other required modules (mongoose, user model, exam model, etc.)


app.use(bodyParser.json()); // Parse incoming JSON data in request bodies

// User Registration
app.post('/register', (req, res) => {
    // Implement user registration logic using data from req.body
    // ... (validation, database interaction, response)
  });
  
const User = mongoose.model('User', userSchema);

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed passwords using bcrypt.compare()
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Login successful (generate JWT, etc.)
    // ... (your logic for generating JWT and sending response)

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

  
  // Exam Creation (assuming user is authenticated)
  app.post('/exams', (req, res) => {
    // Implement exam creation logic using data from req.body and user information
    // ... (validation, database interaction, response)
  });
  
  // Exam Retrieval (assuming user is authenticated and authorized)
  app.get('/exams/:examId', (req, res) => {
    // Implement exam retrieval logic based on examId from req.params
    // ... (database interaction, authorization checks, response)
  });
  
  // ... Define other routes for functionalities like exam deletion, answer submission, etc.
  
  const mongoose = require('mongoose');

// Replace with your MongoDB connection string (including username and password if needed)
const connectionString = 'mongodb://localhost:27017/your_database_name';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define your routes and other server logic here

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true },
});

// Hash password before saving a new user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10; // Adjust salt rounds based on security needs
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});


const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['multiple-choice', 'short-answer', 'essay'], required: true },
  options: { type: Array, required: function() { return this.type === 'multiple-choice'; } }, // Only required for multiple-choice questions
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  duration: { type: Number, required: true }, // In minutes
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const resultSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  marks: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);
const Exam = mongoose.model('Exam', examSchema);
const Result = mongoose.model('Result', resultSchema);

// Use these models in your routes and other server logic


const mongoose = require('mongoose');
// ... connection logic ...

const User = mongoose.model('User', userSchema);
const Question = mongoose.model('Question', questionSchema);
const Exam = mongoose.model('Exam', examSchema);
const Result = mongoose.model('Result', resultSchema);


// Create a User
async function createUser(userData) {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (err) {
    throw err; // Re-throw the error for handling in the route
  }
}

// Create a Question
async function createQuestion(questionData) {
  try {
    const question = new Question(questionData);
    await question.save();
    return question;
  } catch (err) {
    throw err; // Re-throw the error for handling in the route
  }
}

// ... similar functions for createExam and createResult ...


// Get all Users
async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw err; // Re-throw the error for handling in the route
  }
}

// Get a User by ID
async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    throw err; // Re-throw the error for handling in the route
  }
}

// ... similar functions for getExamById, getQuestionById, getResultById ...


// Update a User by ID
async function updateUserById(userId, updateData) {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }); // Return the updated document
    return user;
  } catch (err) {
    throw err; // Re-throw the error for handling in the route
  }
}

// ... similar functions for updateExamById, updateQuestionById, updateResultById ...



// Delete a User by ID
async function deleteUserById(userId) {
  try {
    await User.findByIdAndDelete(userId);
  } catch (err) {
    throw err; // Re-throw the error for handling in the route
  }
}

// ... similar functions for deleteExamById, deleteQuestionById, deleteResultById ...


// Protected route example
app.post('/exams', verifyJWT, async (req, res) => {
    // ... exam creation logic using req.user information ...
  });