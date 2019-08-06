//logic for the todo schema

const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
	name: {
		type: String,
		required: "Name field cannot be blank"
	},
	completed : {
		type: Boolean,
		default: false
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

//now compile it to a model, standard is capitalized
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;