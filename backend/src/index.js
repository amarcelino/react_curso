const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);


mongoose.connect('mongodb://curso-react:123mudar@ds121415.mlab.com:21415/curso-react', {
    useNewUrlParser: true
});

app.use(cors());
app.use((req, res, next)=>{
    req.io = io;
    return next();
})

const serverPorta = 3000;
app.use(express.json());
app.use(require('./router'));

server.listen(3000, ()=>{
    console.log(`Server started on port ${serverPorta}`);
})