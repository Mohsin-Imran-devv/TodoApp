function CompletedTasks({ completedItems, onDeleteClick }) {
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
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Completed Tasks ({completedItems.length})
      </h2>
      
      <div className="space-y-3">
        {completedItems.map((item) => (
          <div
            key={item.id}
            className="bg-green-50 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 mb-3 overflow-hidden border border-green-200"
          >
            <div className="flex flex-col sm:flex-row items-center p-4">
              <div className="flex items-center sm:w-12 justify-center mb-2 sm:mb-0">
                <div className="w-6 h-6 rounded-full bg-green-500 border-green-500 text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1 text-gray-800 font-medium mb-2 sm:mb-0 line-through text-gray-500">
                {item.name}
              </div>
              
              <div className="sm:w-40 text-gray-500 text-sm mb-2 sm:mb-0">
                {item.dueDate ? (
                  <span className="flex items-center justify-center sm:justify-start">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(item.dueDate)}
                  </span>
                ) : (
                  <span className="text-gray-400">No date set</span>
                )}
              </div>
              
              <div className="sm:w-24">
                <button
                  type="button"
                  onClick={() => onDeleteClick(item.id)}
                  className="w-full px-4 py-2 bg-linear-to-r from-red-400 to-pink-400 text-white text-sm font-medium rounded-lg hover:from-red-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedTasks;