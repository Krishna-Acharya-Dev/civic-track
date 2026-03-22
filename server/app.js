const express = require('express');
const authRoutes = require('./routes/auth');
const issuesRoutes = require('./routes/issues');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/issues', issuesRoutes);

module.exports = app;