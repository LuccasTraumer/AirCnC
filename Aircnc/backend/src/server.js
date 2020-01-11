// PRONTAS
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

// Internas
const routes = require('./routes.js')

// Usadas
const app = express();
const server = http.Server(app);
const io = socketio(server);



mongoose.connect('******',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectUsers = {};
io.on('connection',socket =>{
    const { user_id } = socket.handshake.query;
    connectUsers[user_id] = socket.id;
    
});

app.use((req,res,next) => {
    req.io = io;
    req.connectUsers = connectUsers;

    return next();
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


server.listen(3333);
