const ScoreBoard = ({ balance, message }) => {
  return (
    <div className="text-center mb-8">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 px-8 rounded-2xl shadow-2xl inline-block">
        <div className="text-sm uppercase tracking-wider mb-2">Your Balance</div>
        <div className="text-5xl font-bold">{balance.toLocaleString()} CR</div>
      </div>
      
      {message && (
        <div className={`mt-6 text-2xl font-bold animate-pulse ${
          message.includes('won') ? 'text-green-500' : 'text-red-500'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
