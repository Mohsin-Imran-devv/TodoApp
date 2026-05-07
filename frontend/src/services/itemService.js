const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/todo`;

export const getItemsFromServer = async () => {
  try {
    console.log('Fetching from:', API_BASE_URL);
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if data is valid
    if (!data.todoItems) {
      console.error('Invalid response format:', data);
      return [];
    }
    
    return data.todoItems.map(item => ({
      id: item._id,
      name: item.task,
      dueDate: item.date,
      completed: item.completed || false
    }));
  } catch (error) {
    console.error('Error fetching items:', error.message);
    return [];
  }
};

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
    
    if (!response.ok) {
      throw new Error(`Failed to add item: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.todoItem) {
      throw new Error('Invalid response from server');
    }
    
    return {
      id: data.todoItem._id,
      name: data.todoItem.task,
      dueDate: data.todoItem.date,
      completed: data.todoItem.completed || false
    };
  } catch (error) {
    console.error('Error adding item:', error.message);
    throw error;
  }
};

export const deleteItemFromServer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete item: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data._id) {
      throw new Error('Invalid response from server');
    }
    
    return data._id;
  } catch (error) {
    console.error('Error deleting item:', error.message);
    throw error;
  }
};

export const markItemAsCompleted = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/completed`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to mark item as completed: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error marking item as completed:', error.message);
    throw error;
  }
};