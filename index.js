const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const cors = require('cors')

const app = express();
dotenv.config();

// Connect Database
connectDB();

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(express.json());

//app.use(express.json({extended:false}))

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/Order', require('./routes/api/Order'));
//app.use('/api/event', require('./routes/api/event'));
app.use('/api/DataInserted', require('./routes/api/DataInserted'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));