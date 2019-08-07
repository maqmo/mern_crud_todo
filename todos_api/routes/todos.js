//for our todos routes
const express = require('express');
const router = express.Router();
const helpers = require('../helper/todos');
/* requests to /api/todos are delegated to this router to handle

instead of :
	router.get('/', helpers.getTodos)
	router.put('/', helpers.createTodos)
	note that it is established that the first arg above, '/:todoId' is the same
	as /api/todos/:todoId (the prefix is established since the first argument from the index file was the prefix

use less to do the same:
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