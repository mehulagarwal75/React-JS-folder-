import { useState } from 'react';

const SpinningWheel = ({ id, reward, onSpin, isSpun }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const colors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-purple-600',
    'from-yellow-400 to-yellow-600',
    'from-pink-400 to-pink-600'
  ];

  const getCarName = (value) => {
    const carMap = {
      100: { name: 'Maruti', emoji: '🚗', price: '₹5 Lakh' },
      500: { name: 'Hyundai', emoji: '🚙', price: '₹8 Lakh' },
      1000: { name: 'Mahindra', emoji: '🚕', price: '₹10 Lakh' },
      10000: { name: 'BMW', emoji: '🏎️', price: '₹50 Lakh' },
      100000: { name: 'Mercedes', emoji: '🚗', price: '₹1 Crore' },
      10000000000: { name: 'Bugatti', emoji: '🏎️', price: '₹20 Crore' },
      '-100': { name: 'No Car', emoji: '😅', price: 'Better luck!' },
      '-200': { name: 'Scooter', emoji: '🛵', price: 'Next time' },
      '-500': { name: 'Bicycle', emoji: '🚲', price: 'Try again' },
      '-1000': { name: 'Walk!', emoji: '🚶', price: 'No vehicle' }
    };
    return carMap[value] || { name: 'Mystery Car', emoji: '🚗', price: 'Unknown' };
  };

  const handleSpin = () => {
    if (isSpun || isSpinning) return;

    setIsSpinning(true);

    // Random spin animation
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const randomDegree = Math.random() * 360;
    const finalRotation = spins * 360 + randomDegree;
    
    setRotation(finalRotation);

    setTimeout(() => {
      onSpin(id, reward);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={handleSpin}
        className={`relative w-32 h-32 cursor-pointer transition-all duration-300 ${
          !isSpun ? 'hover:scale-110' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        {/* Spinning Wheel */}
        <div
          className={`w-full h-full rounded-full shadow-2xl transition-transform ${
            colors[id % 6]
          } bg-gradient-to-br flex items-center justify-center font-bold text-white text-2xl`}
          style={{
            transform: isSpinning ? `rotate(${rotation}deg)` : 'rotate(0deg)',
            transitionProperty: isSpinning ? 'none' : 'transform',
            transitionDuration: isSpinning ? '1.5s' : '0.3s'
          }}
        >
          <div className={`text-center text-5xl ${isSpinning ? 'animate-spin' : ''}`}>
            🚗
          </div>
        </div>

        {/* Pointer */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-yellow-300 drop-shadow-lg"></div>
        </div>
      </div>

      {/* Result Display */}
      {isSpun && (
        <div className="flex items-center justify-center w-32 h-20 bg-white rounded-lg shadow-xl border-4 border-yellow-400">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {getCarName(reward).emoji}
            </div>
            <div className="text-xs font-semibold text-gray-800">
              {getCarName(reward).name}
            </div>
            <div className="text-xs text-gray-600">
              {getCarName(reward).price}
            </div>
          </div>
        </div>
      )}

      {/* Spin Text */}
      {!isSpun && (
        <span className="text-xs font-semibold text-white text-center bg-black bg-opacity-40 px-2 py-1 rounded">
          SPIN
        </span>
      )}
    </div>
  );
};
export default SpinningWheel;
