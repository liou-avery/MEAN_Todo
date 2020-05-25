const dbURL = 'mongodb+srv://admin:secretpassword@cluster0-zja3m.mongodb.net/test?retryWrites=true&w=majority'

//set up modules
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//configs
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
  if(err) {
      console.log("Error: " + err);
      process.exit(0);
  } else {
      console.log('The Mongoose connection is ready');
  }
});
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//model
var Todo = mongoose.model('Todo', {
  text : String
});

//routes

//get all todos
app.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos) {
    if (err) res.send(err)
    res.json(todos); // return all todos in JSON format
  });
});

//add a todo and update list of todos
app.post('/api/todos', function(req, res) {
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
    if (err) res.send(err);
    Todo.find(function(err, todos) {
      if (err) res.send(err)
      res.json(todos); // return all todos in JSON format
    });
  });
});

//delete a todo and update list of todos
app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.deleteOne({
    _id : req.params.todo_id
  }, function(err, todo) {
    if (err) res.send(err);
    Todo.find(function(err, todos) {
      if (err) res.send(err)
      res.json(todos); // return all todos in JSON format
    });
  });
});

app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
})

app.listen(8080);
console.log("App listening on port 8080");
