//dependencias
const express = require('express');
//init
const app = express();
//middleware, 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//port
const PORT = 8001;
//path
app.get('/', (req, res) => {  //ruta raiz
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
  const user = req.body;
  res.status(200).json({ success: true, message: 'user created', data: user });
});
app.listen(PORT, () => {
  console.log('SERVER ON PORT:', PORT);
});
