// PRONTAS
const express = require('express');
const mongoose = require('mongoose');


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
app.use(express.json()); 
app.use(routes);


app.listen(3333);