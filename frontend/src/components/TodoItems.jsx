
import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onToggleComplete }) => {
  return (
    <div className="mt-6 space-y-3">
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoDate={item.dueDate}
          todoName={item.name}
          onDeleteClick={onDeleteClick}
          onToggleComplete={onToggleComplete}
          isCompleted={item.completed || false}
        />
      ))}
    </div>
  );
};

export default TodoItems;
