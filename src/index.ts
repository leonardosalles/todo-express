import express from 'express';
import bodyParser from 'body-parser';
import { TodoItem } from './types/todo-item';
import todoItemSchema from './schemas/todo-item';
const app = express();

app.use(bodyParser.json()) 

let items: TodoItem[] = [];

app.get('/', (_req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

app.get('/tasks', (_req, res) => {
  const todoList = items;
  res.json(todoList);
});

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(item => item.id === id);

  res.json(item);
});

app.post('/tasks', (req, res) => {
  const newId = Math.floor(Math.random() * 100)
  const todoItem: TodoItem = {
    id: newId,
    title: req.body.title,
    completed: req.body.completed,
  };

  const { error } = todoItemSchema.validate(todoItem);

  if (error) {
    return res.status(400).json(error);
  }

  const updatedList = items.concat(todoItem);
  items = updatedList;

  res.json(updatedList);
});

app.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(item => item.id === id);

  const updatedItem = {
    ...item,
    title: req.body.title,
    completed: req.body.completed,
  };

  const { error } = todoItemSchema.validate(updatedItem);

  if (error) {
    return res.status(400).json(error);
  }

  const itemIndex = items.findIndex(item => item.id === id);
  items[itemIndex] = updatedItem;

  res.json(updatedItem);
});

app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedItems = items.filter(item => item.id !== id);
  items = updatedItems;
  res.json(updatedItems);
});


const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
