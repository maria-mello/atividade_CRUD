const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rota POST
app.post('/insert', (request, response) => {
  const result = db.insertNewName(request.body);
  result
    .then(data => response.json({ data: data }))
    .catch(err => console.error(err));
});

// Rota GET(Read)
app.get('/getAll', (request, response) => {
  const result = db.getAllData();
  result
    .then(data => response.json({ data: data }))
    .catch(err => console.error(err));
});

// ROTA PATCH(ATUALIZAR/EDUTAR)
app.patch('/update', (request, response) => {
  const result = db.updateNameById(request.body);
  result
    .then(data => response.json({ success: data }))
    .catch(err => console.error(err));
});

// ROTA DELETE(DELETAR/EXCLUIR)
app.delete('/delete/:id', (request, response) => {
  const { id } = request.params;

  const result = db.deleteRowById(id);
  result
    .then(data => response.json({ success: data }))
    .catch(err => console.error(err));
});

// ROTA GET(LER/BUSCAR)
app.get('/search/:name', (request, response) => {
  const { name } = request.params;
  const result = db.searchByName(name);
  result
    .then(data => response.json({ data: data }))
    .catch(err => console.error(err));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
