//main index.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const todoRoutes = require('./routes/todos.js')
const bodyParser = require('body-parser');
const path = require('path')


//our server: if you get routes to /api/todos, use: todoRoutes and append


//need the below 2 lines to use req.body in the router's post handler
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/todos",todoRoutes);
//"import" the index.html and the app.css form views and public
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
	res.sendFile("index.html")
});



app.listen(port, () => console.log("Server runing on port " + port));
