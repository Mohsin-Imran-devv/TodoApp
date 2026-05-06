import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import CompletedTasks from "./components/CompletedTasks"; // Create this component
import WelcomeMessage from "./components/WelcomeMessage";
import { addItemToServer, deleteItemFromServer, getItemsFromServer, markItemAsCompleted } from "./services/itemService";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() =>{
    getItemsFromServer().then((items) => {
      setTodoItems(items);
    });
  },[]);
  
  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const item = await addItemToServer(itemName, itemDueDate);
    const newTodoItems = [
      ...todoItems,
      item,
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };

  const handleToggleComplete = async (id) => {
    try {
      await markItemAsCompleted(id);
      setTodoItems(todoItems.map(item => 
        item.id === id 
          ? { ...item, completed: true }
          : item
      ));
    } catch (error) {
      console.error("Error marking item as completed:", error);
    }
  };

  // Filter active and completed tasks
  const activeTasks = todoItems.filter(item => !item.completed);
  const completedTasks = todoItems.filter(item => item.completed);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-blue-50 py-12 px-4 flex items-start justify-center">
      <div className="w-full max-w-2xl">
        <AppName />
        <AddTodo onNewItem={handleNewItem} />
        
        {/* Active Tasks Section */}
        {activeTasks.length === 0 ? (
          <WelcomeMessage />
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Active Tasks ({activeTasks.length})
            </h2>
            <TodoItems
              todoItems={activeTasks}
              onDeleteClick={handleDeleteItem}
              onToggleComplete={handleToggleComplete}
            />
          </>
        )}
        
        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <CompletedTasks
            completedItems={completedTasks}
            onDeleteClick={handleDeleteItem}
          />
        )}
      </div>
    </div>
  );
}

export default App;