const express = require('express');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/test', testRoutes);
app.use('/tasks', taskRoutes);

module.exports = app;