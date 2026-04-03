import { useState } from 'react';

const GiftBox = ({ id, reward, onOpen, isOpened }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpened) return;
    
    setIsOpening(true);
    
    setTimeout(() => {
      onOpen(id, reward);
      setIsOpening(false);
    }, 600);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-32 h-32 cursor-pointer transition-all duration-300 ${
        !isOpened ? 'hover:scale-110 hover:-translate-y-2' : 'opacity-50 cursor-not-allowed'
      } ${isOpening ? 'animate-bounce' : ''}`}
    >
      {!isOpened ? (
        <div className="relative w-full h-full">
          <div className={`absolute inset-0 rounded-lg shadow-2xl ${
            id % 6 === 0 ? 'bg-gradient-to-br from-red-400 to-red-600' :
            id % 6 === 1 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
            id % 6 === 2 ? 'bg-gradient-to-br from-green-400 to-green-600' :
            id % 6 === 3 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
            id % 6 === 4 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
            'bg-gradient-to-br from-pink-400 to-pink-600'
          }`}></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-full bg-yellow-300 opacity-80"></div>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-6 bg-yellow-300 opacity-80"></div>
          
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 border-4 border-yellow-300 rounded-full border-b-0"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-white rounded-lg shadow-xl border-4 border-yellow-400">
          <div className="text-center">
            <div className={`text-2xl font-bold ${reward > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {reward > 0 ? '+' : ''}{reward}
            </div>
            <div className="text-xs text-gray-600">CR</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftBox;
