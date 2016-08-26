import '../imports/api/tasks.js';

// Client-only collection for UI State
uiState = new Mongo.Collection('UiState');

Todos = new Mongo.Collection('Todos');

// This line is changing an in-memory Minimongo data structure
Todos.insert({_id: 'my-todo'});
// And this line is querying it
const todo = Todos.findOne({_id: 'my-todo'});
// So this happens right away!
console.log(todo);
