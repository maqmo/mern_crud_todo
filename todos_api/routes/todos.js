//for our todos routes

const express = require('express');
const router = express.Router();
const db = require('../models');
/* requests were passed here from the main server,
	our first arg in the app.use() line from that server
	gets prepended so router.get('/' ... is really {first arg}/
	its short hand
	the below commented out line works the same as long as the first arg in the app.use( , )
	is "/" meaning: our callback for any route to .../api/todos/ is (req, res) => { }
	router.get('/api/todos/', (req,res)=>{
		res.send("From the todos route");
	});
*/

router.get('/', (req,res)=> {
	db.Todo.find().then((todos) =>{
		res.json(todos);
	}).catch((err) => {
		res.send(err)
		console.log("error encountered in getting")
	});
});

router.post('/', (req, res) => {
	db.Todo.create(req.body)
	.then((newTodo) => {
		res.json(newTodo);
	}).catch((err) => {

	})
});

router.get("/:todoId", (req, res)=>{
	db.Todo.findById(req.params.todoId)
	.then((foundDBItem)=>{
		res.send(foundDBItem);
	}).catch((err)=>{
		res.send(err);
	})
});
//this is for updating a value in the db,
//set false to true, in this case
router.put('/:todoId', (req, res) => {
	db.Todo.findOneAndUpdate({_id : req.params.todoId}, req.body, {new:true})
	.then((found)=>{res.send(found)})
	.catch((err)=>res.send(err));
});

module.exports = router;
// export default router;