/*this func will wait to run until the dom has loaded
	//like fetching and inserting data but in this case, fetching the data may be slower than rendering
	the dom, but in theory you'd want to load the dom and then fetch and insert
	*/
$(document).ready(() =>{
	/*dom loaded? api request all todos
		we're requesting our own server, so use a relative path
		we're already in ~/Desktop/webDev ..../
		just add on /api/todos
		*/
	$.getJSON("/api/todos")
	.then((todos) => {
		todos.forEach( (elt) => {
			addTodo(elt)
		});
	});

	//by adding this listener to the #todoInput id, we only listen for the enter key when the form is in focus
	$('#todoInput').keypress((event) => {
		//check that the key press event was only for the enter key
		if (event.which == 13){
			//hit enter, so grab the value, and make an api call to add to the db
			createTodo();
		}
	});
	//logically, I thought this worked, but it did not
		// the li's dont exist when the dom is initially rendered, they come later, so the listener is never attached!
		//attach the listener to the ul (class = list) then specify its child as a param
	//$('span').on('click', () =>{ alert("clicked")})

	//listener for the deletion 'X' , notice the 2nd arg
	$('.list').on('click', 'span' , function(event){
		//stop propagation on overlapping listeners, when the top one is clicked, without this, the one(s) underneath it are also triggered
		event.stopPropagation()
		deleteTodo($(this).parent())
	});

	$('.list').on('click', 'li', function(event){
		updateTodo($(this))
	})
});

function createTodo() {
	//send a post request to create a new todo
	const userInp = $('#todoInput').val().toString().split(",");
	//clear the input field after we've grabbed the input value
	$('#todoInput').val('');
	userInp.forEach((elt) =>{
		// ensure array elt is not ""
		if (elt) $.post('/api/todos', {name: elt})
	 	.then( (newTodo) => {
	 		addTodo(newTodo);
	 	}).catch( (err) => console.log(err));
	 });
}

function addTodo(todo){
	const ui_todo = $('<li class="task">' + todo.name + '<span>X</span></li>');
	//to get the '_id' from mongo, we can either hide it in the markup and set to not visible OR
	// jquery lets you store data about dom elements and retrieve them as needed, store a key, value
	ui_todo.data('id', todo._id);
	ui_todo.data('completed', todo.completed)
		//append this dom element to our page
		//note that the goal is to append the li to the ul
		//the ul's class is "list", so append to <.list>
	//const ui_class = todo.completed ? "done" : "task"
	if (todo.completed) $(ui_todo).addClass("done")
	$('.list').append(ui_todo);
}

function deleteTodo(elt){
	const elt_id = elt.data('id');
	const del_endpoint = '/api/todos/' + elt_id;
	$.ajax({
		method: 'DELETE',
		url : del_endpoint,
	})
	.then((data) => elt.remove()).catch((err) => console.log(err));
}
function updateTodo(elt){
	//'store' the bool value with the id value upon creation, in the addTodo function
	const old_value = elt.data('completed')
	const new_value = !elt.data('completed')
	const endpoint = 'api/todos/' + elt.data('id');
	const update = {completed : new_value}
	$.ajax({
		method: 'PUT',
		url: endpoint,
		data: update
	}).then((returned_dbTodo) =>{
		elt.toggleClass('done')
		elt.data('completed', new_value)
	}).catch((err) => console.log(err) )
}
