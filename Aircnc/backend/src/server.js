// PRONTAS
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Internas
const routes = require('./routes.js')

// Usadas
const app = express();
mongoose.connect('mongodb+srv://lucas:luccas@oministack-zdfzq.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// require.query = Acessa a visualizacao dos Paramatros do link, Metodos GET(para filtros)
// require.params = Acessa os Parametros passados na URL, Metodo POST(para edição e delete)
// require.body = Acessa o Corpo da Requisição (para edição e criaçãos)

// Visualizar com json
app.use(cors());
app.use(express.json()); 
const local = express.static(path.resolve(__dirname, '..','uploads'))
app.use('/files', local)
app.use(routes);


app.listen(3333);