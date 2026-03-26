const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const issuesRoutes = require('./routes/issue');
const statsRoutes = require('./routes/stats');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/issues', issuesRoutes);
app.use('/api/stats', statsRoutes);

module.exports = app;