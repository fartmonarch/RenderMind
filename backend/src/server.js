require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', msg: 'RenderMind backend is running!' });
});

// Setup routes here...

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
