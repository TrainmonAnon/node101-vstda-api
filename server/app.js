const express = require('express');
const morgan = require('morgan');

const app = express();

// add your code here
var todoItems = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).send({});
});

app.get("/api/TodoItems", (req,res) => {
    res.status(200).send(todoItems);
});

app.get("/api/TodoItems/:id", (req,res) => {
    var id = req.params.id;
    for (let i = 0; i < todoItems.length; i++){
        if (todoItems[i].todoItemId == id){
            res.status(200).send(todoItems[i]);
            return;
        }
    }
});

app.post("/api/TodoItems", (req,res) => {
    var newTodo = { 
        completed : req.body.completed,
        name : req.body.name, 
        priority : req.body.priority, 
        todoItemId : req.body.todoItemId
    };
    for (let i = 0; i < todoItems.length; i++){
        if (todoItems[i].todoItemId == newTodo.todoItemId){
            todoItems[i] = newTodo;
            res.status(201).send(newTodo);
            return;
        }
    }
    todoItems.push(newTodo);
    res.status(201).send(newTodo);
});

app.delete("/api/TodoItems/:id", (req,res) => {
    var id = req.params.id;
    for (let i = 0; i < todoItems.length; i++){
        if (todoItems[i].todoItemId == id){
            let deleted = todoItems.splice(i,1)[0];
            res.status(200).send(deleted);
            return;
        }
    }
    console.log("id not found.");
    res.status(200).send(0);
});

module.exports = app;
