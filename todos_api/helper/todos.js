const db = require('../models')
exports.getTodos = (req,res)=> {
		db.Todo.find().then((todos) =>{
			res.json(todos);
		}).catch((err) => {
			res.send(err)
		});
	};

exports.createTodo = (req, res) => {
		db.Todo.create(req.body)
		.then((newTodo) => {
			res.json(newTodo);
		}).catch((err) => {
			res.send(err)
		})
	};
exports.showTodo = (req, res)=>{
		db.Todo.findById(req.params.todoId)
		.then((foundDBItem)=>{
			res.send(foundDBItem);
		}).catch((err)=>{
			res.send(err);
		})
	};
exports.updateTodo = (req, res) => {
		db.Todo.findOneAndUpdate({_id : req.params.todoId}, req.body, {new:true})
		.then((found)=>{res.send(found)})
		.catch((err)=>res.send(err));
	};
exports.deleteTodo = (req,res) =>{
		db.Todo.remove({_id: req.params.todoId})
		.then((nixed) => res.json(req.params.todoId + " has been deleted"))
		.catch((err) => res.send(err))
		};

module.exports = exports;