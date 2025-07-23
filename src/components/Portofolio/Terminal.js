import React, {useEffect} from 'react';

const Terminal = ({ terminalLines, currentCommand, setCurrentCommand, handleKeyPress, setCurrentSection, time }) => {
  useEffect(() => {
    const audio = new Audio('/dial_up.mp3'); // adjust path if needed
    audio.play().catch(err => console.log('Audio playback failed:', err));
  }, []);
  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono text-sm leading-relaxed">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-blue-900 text-white px-4 py-1 text-xs flex justify-between items-center">
          <span>Portfolio Terminal - PORTFOLIO.EXE</span>
          <div className="space-x-2">
            <button onClick={() => setCurrentSection('windows98')} className="bg-green-600 px-2 py-0.5 text-xs border border-green-400 hover:bg-green-500">Launch GUI</button>
          </div>
        </div>
        <div className="bg-black border border-gray-600 min-h-[600px] p-4">
          <div className="mb-4">
            {terminalLines.map((line, index) => (
              <div key={index} className="min-h-[1em] whitespace-pre-wrap">{line}</div>
            ))}
          </div>
          <div className="flex items-center">
            <span className="text-white mr-2">C:\PORTFOLIO&gt;</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-transparent text-gray-300 flex-1 outline-none caret-white"
              placeholder=""
              autoFocus
            />
          </div>
        </div>
        <div className="bg-gray-800 text-gray-300 px-4 py-1 text-xs flex justify-between items-center">
          <span>Ready - Type "/help" for commands</span>
          <span>CPU: AMD Athlon 650MHz | RAM: 64MB | HDD: 30GB</span>
          <span>{time.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
