//for our todos routes
const express = require('express');
const router = express.Router();
const helpers = require('../helper/todos');
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

/*
instead of :
	router.get('/', helpers.getTodos)
	router.put('/', helpers.createTodos)
can use less code to do the same, as below
*/
router.route('/')
	.get(helpers.getTodos)
	.post(helpers.createTodo);

router.route('/:todoId')
	.get(helpers.showTodo)
	.put(helpers.updateTodo)
	.delete(helpers.deleteTodo);

module.exports = router;
// export default router;