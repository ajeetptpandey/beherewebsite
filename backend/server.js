const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:3001' }));

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Here you can perform validation and other necessary operations with the data

  // Save the data to a file
  const contactData = { name, email, subject, message };
  fs.appendFile('contactData.json', JSON.stringify(contactData) + '\n', 'utf8', (err) => {
    if (err) {
      console.error('Error saving contact data:', err);
      return res.status(500).json({ error: 'An error occurred while saving the contact data.' });
    }
    res.json({ message: 'We will be in touch shortly.', data: { name, email, subject, message } });
  });
});

app.get('/contact', (req, res) => {
  res.send('This is the contact page');
});

app.get('/contactData', (req, res) => {
    fs.readFile('contactData.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading contact data:', err);
        return res.status(500).json({ error: 'An error occurred while reading the contact data.' });
      }
  
      const contactData = data.split('\n').filter((line) => line.trim() !== '');
      res.json({ contactData });
    });
  });
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
