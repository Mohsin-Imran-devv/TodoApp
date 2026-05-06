const TodoItem = require("../Models/todoItem");

exports.createTodoItem = async (req, res, next) => {
  const { task, date } = req.body;
  const todoItem = new TodoItem({
    task,
    date
  });
  await todoItem.save();
  res.status(201).json({ message: "Todo item created successfully", todoItem });
  
}

exports.getTodoItems = async (req, res, next) => {
  const todoItems = await TodoItem.find();
  res.status(200).json({ todoItems });
};

exports.deleteTodoItem = async (req, res, next) => {
  const { id } = req.params;
  await TodoItem.findByIdAndDelete(id);
  res.status(200).json({_id: id});
};

exports.markCompleted = async (req, res, next) => {
  const { id } = req.params;
  const todoItem = await TodoItem.findById(id);
  if (!todoItem) {
    return res.status(404).json({ message: "Todo item not found" });
  };
  todoItem.completed = true;
  await todoItem.save();
  res.status(200).json(todoItem);
};