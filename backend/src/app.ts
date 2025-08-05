
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola mundoooo desde Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
