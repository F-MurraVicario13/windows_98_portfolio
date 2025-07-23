import React from 'react';

const BootScreen = ({ bootSteps, currentStep, showCursor, showSkipButton, skipToBoot, skipToGUI }) => {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono text-sm leading-tight overflow-hidden relative">
      {showSkipButton && (
        <div className="absolute top-4 right-4 space-x-2">
          <button onClick={skipToBoot} className="bg-blue-600 text-white px-3 py-1 text-xs border border-blue-400 hover:bg-blue-500">Skip Boot</button>
          <button onClick={skipToGUI} className="bg-green-600 text-white px-3 py-1 text-xs border border-green-400 hover:bg-green-500">Skip to GUI</button>
        </div>
      )}
      <div className="p-4">
        <div className="mb-4 border-b border-gray-600 pb-2">
          <div className="bg-blue-900 text-white px-2 py-1 text-center text-xs mb-2">PHOENIX - AWARDBIOS v6.00PG</div>
        </div>
        <div className="space-y-0">
          {bootSteps.slice(0, currentStep + 1).map((step, index) => (
            <div key={index} className="min-h-[1em]">
              {step}
              {index === currentStep && (<span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>█</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
