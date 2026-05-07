// Change this line at the top of itemService.js
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/todo`; // Updated to match your backend route

export const markItemAsCompleted = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/completed`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to mark item as completed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error marking item as completed:', error);
    throw error;
  }
};

// Update your getItemsFromServer
export const getItemsFromServer = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    // Map the response to match your frontend structure
    return data.todoItems.map(item => ({
      id: item._id,
      name: item.task,
      dueDate: item.date,
      completed: item.completed || false
    }));
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

// Update addItemToServer
export const addItemToServer = async (itemName, itemDueDate) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: itemName,
        date: itemDueDate
      }),
    });
    
    const data = await response.json();
    return {
      id: data.todoItem._id,
      name: data.todoItem.task,
      dueDate: data.todoItem.date,
      completed: data.todoItem.completed || false
    };
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

// Update deleteItemFromServer
export const deleteItemFromServer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    return data._id;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};