import { useState } from 'react';
import SpinningWheel from './SpinningWheel';
import ScoreBoard from './ScoreBoard';

const GameBoard = () => {
  const rewards = [100, 500, 1000, 10000, 100000, 10000000000, -100, -200, -500, -1000];
  
  const getRandomReward = () => rewards[Math.floor(Math.random() * rewards.length)];
  
  const [balance, setBalance] = useState(1000);
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [message, setMessage] = useState('');
  const [boxes] = useState(
    Array.from({ length: 6 }, (_, i) => ({ id: i, reward: getRandomReward() }))
  );

  const handleBoxOpen = (id, reward) => {  // Now handles wheel spins too
    const newOpenedBoxes = [...openedBoxes, id];
    setOpenedBoxes(newOpenedBoxes);
    setBalance(balance + reward);
    
    if (reward > 0) {
      setMessage(`🎉 You won ${reward.toLocaleString()} CR!`);
    } else {
      setMessage(`😢 Oh no! You lost ${Math.abs(reward).toLocaleString()} CR!`);
    }
    
    // 3 boxes open thaya pachi message show karo
    if (newOpenedBoxes.length === 3) {
      setTimeout(() => {
        setMessage('🎮 Game Over! Click Play Again to restart');
      }, 1500);
    } else {
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const resetGame = () => {
    setOpenedBoxes([]);
    setMessage('');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-2xl">
        � Lucky Spin Game 🎡
      </h1>
      
      <ScoreBoard balance={balance} message={message} />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-8">
        {boxes.map((box) => (
          <SpinningWheel
            key={box.id}
            id={box.id}
            reward={box.reward}
            onSpin={handleBoxOpen}
            isSpun={openedBoxes.includes(box.id)}
          />
        ))}
      </div>
      
      {openedBoxes.length === 3 && (
        <button
          onClick={resetGame}
          className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-xl shadow-2xl hover:scale-110 transition-transform"
        >
          Play Again 🎮
        </button>
      )}
    </div>
  );
};

export default GameBoard;
