const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home - list jobs
app.get('/', (req, res) => {
  const jobs = db.getAllJobs();
  res.render('index', { jobs });
});

// New job form
app.get('/jobs/new', (req, res) => {
  res.render('new');
});

// Create job
app.post('/jobs', (req, res) => {
  const { title, company, location, description } = req.body;
  if (!title || !company) return res.status(400).send('title and company required');
  const id = db.createJob({ title, company, location, description });
  res.redirect(`/jobs/${id}`);
});

// View job
app.get('/jobs/:id', (req, res) => {
  const job = db.getJobById(req.params.id);
  if (!job) return res.status(404).send('Job not found');
  res.render('job', { job });
});

// Simple JSON API
app.get('/api/jobs', (req, res) => {
  res.json(db.getAllJobs());
});

app.get('/api/jobs/:id', (req, res) => {
  const job = db.getJobById(req.params.id);
  if (!job) return res.status(404).json({ error: 'not found' });
  res.json(job);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
