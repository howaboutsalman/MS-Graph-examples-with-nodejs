require('dotenv').config();
//import Modules 
const bodyParser = require('body-parser');
const express = require('express')
const service = require('./bin/Services');
const app = express();
const PORT = process.env.PORT || 8080;
//Routers 
app.use(bodyParser.json())
app.get('/', service.Home );
app.get('/users', service.getUser);
app.get('/groups', service.getGroups);
app.post('/create', service.createFolder);
app.get('/chats/:id', service.getChats);
app.get('/send', service.send);
app.get('/mailFolder/:id', service.getMailFolders);
app.listen(3000,() => {  console.log(`Server Running on Port ${PORT} `);});
