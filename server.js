const express = require('express');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.send('Bem vindo a API');
});

app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
