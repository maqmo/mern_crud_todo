//connect to mongoose from this file

const mongoose = require('mongoose');

mongoose.set('debug', true); // for debugging
//connect to db server
mongoose.connect('mongodb://localhost/todo-api') // the .../todo-api is the name we've decided to give the db

mongoose.Promise = Promise; // allows us to use the promise syntax

//since index is the initial rendezvous point,
module.exports.Todo = require("./todo");
/*
imagine like this:

let module= { exports: {Todo: }}
let exports = module.exports;

module.exports. Todo = // the module objec:
							{ exports: "whatever is exported form ./todo"}
exported from ./todo:
	Todo
		which is a variable that points to:
			mongoose.model('Todo', todoSchema)
				'Todo' is the name or key of the schema pointed to by todoSchema



*/
