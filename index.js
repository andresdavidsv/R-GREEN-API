const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 8001;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/users', (req, res) => {
  const users = [
    {
      id: 1234,
      name: 'user green',
    },
  ];
  res.status(200).json({ success: true, data: users });
});

app.post('/api/users', (req, res) => {
  console.log(req.body);
  res.send('user created');
});
app.listen(PORT, () => {
  console.log('SERVER ON PORT:', PORT);
});
