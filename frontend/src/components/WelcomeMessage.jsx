const WelcomeMessage = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 p-8 max-w-md mx-auto border border-gray-100">
        <div className="text-6xl mb-4 animate-bounce">😊</div>
        <p className="text-xl text-gray-700 font-medium mb-2">Enjoy Your Day!</p>
        <p className="text-gray-500">Your todo list is empty. Add some tasks to get started.</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;