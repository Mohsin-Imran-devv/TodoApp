
function TodoItem({ id, todoName, todoDate, onDeleteClick, onToggleComplete, isCompleted }) {
  // Format the date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "No date set";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
  };

  return (
    <div className={`bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all duration-300 mb-3 overflow-hidden border ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-100'}`}>
      <div className="flex flex-col sm:flex-row items-center p-4">
        <div className="flex items-center sm:w-12 justify-center mb-2 sm:mb-0">
          <button
            onClick={() => onToggleComplete(id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              isCompleted 
                ? 'bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600' 
                : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
            }`}
          >
            {isCompleted && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </div>
        
        <div className={`flex-1 text-gray-800 font-medium mb-2 sm:mb-0 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
          {todoName}
        </div>
        
        <div className="sm:w-40 text-gray-600 text-sm mb-2 sm:mb-0">
          {todoDate ? (
            <span className="flex items-center justify-center sm:justify-start">
              <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(todoDate)}
            </span>
          ) : (
            <span className="text-gray-400">No date set</span>
          )}
        </div>
        
        <div className="sm:w-24">
          <button
            type="button"
            onClick={() => onDeleteClick(id)}
            className="w-full px-4 py-2 bg-linear-to-r from-red-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
