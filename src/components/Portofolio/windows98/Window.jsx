import React from 'react';
import { Rnd } from 'react-rnd';

const Window = ({ window, closeWindow, minimizeWindow, focusWindow, renderContent }) => {
  const handleWindowClick = () => {
    if (focusWindow) {
      focusWindow(window.id);
    }
  };

  return (
    <Rnd
      default={{
        x: 100 + (window.id % 200),
        y: 80 + (window.id % 120),
        width: window.defaultSize?.width || 450,
        height: window.defaultSize?.height || 350
      }}
      bounds="parent"
      minWidth={350}
      minHeight={250}
      dragHandleClassName="window-titlebar"
      className={`absolute shadow-lg pixelated window-${window.id}`}
      style={{
        border: '2px solid',
        borderTopColor: '#dfdfdf',
        borderLeftColor: '#dfdfdf',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        backgroundColor: '#c0c0c0',
        imageRendering: 'pixelated',
        zIndex: window.zIndex
      }}
      onMouseDown={handleWindowClick}
      onDragStart={handleWindowClick}
      onResizeStart={handleWindowClick}
    >
      <div className="flex flex-col h-full pixelated">
        <div
          className="window-titlebar px-2 py-1 flex items-center justify-between text-sm font-bold cursor-move pixelated"
          style={{
            background: 'linear-gradient(90deg, #0000ff 0%, #000080 100%)',
            color: 'white',
            border: '1px solid #000040',
            imageRendering: 'pixelated'
          }}
        >
          <span className="pixelated" style={{ fontFamily: 'monospace' }}>{window.title}</span>
          <div className="flex gap-1">
            <button
              className="w-5 h-4 text-xs flex items-center justify-center pixelated"
              style={{
                backgroundColor: '#c0c0c0',
                color: 'black',
                border: '1px outset #c0c0c0',
                fontSize: '10px',
                fontWeight: 'bold',
                fontFamily: 'monospace'
              }}
              onClick={(event) => {
                event.stopPropagation();
                minimizeWindow(window.id);
              }}
            >
              _
            </button>
            <button
              className="w-5 h-4 text-xs flex items-center justify-center pixelated"
              style={{
                backgroundColor: '#c0c0c0',
                color: 'black',
                border: '1px outset #c0c0c0',
                fontSize: '10px',
                fontWeight: 'bold',
                fontFamily: 'monospace'
              }}
            >
              □
            </button>
            <button
              className="w-5 h-4 text-xs flex items-center justify-center pixelated"
              style={{
                backgroundColor: '#c0c0c0',
                color: 'black',
                border: '1px outset #c0c0c0',
                fontSize: '10px',
                fontWeight: 'bold',
                fontFamily: 'monospace'
              }}
              onClick={(event) => {
                event.stopPropagation();
                closeWindow(window.id);
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div
          className="px-2 py-1 text-xs border-b pixelated"
          style={{
            backgroundColor: '#c0c0c0',
            borderBottomColor: '#808080',
            fontFamily: 'monospace'
          }}
        >
          <span className="px-2 hover:bg-blue-600 hover:text-white cursor-pointer">File</span>
          <span className="px-2 hover:bg-blue-600 hover:text-white cursor-pointer">Edit</span>
          <span className="px-2 hover:bg-blue-600 hover:text-white cursor-pointer">View</span>
          <span className="px-2 hover:bg-blue-600 hover:text-white cursor-pointer">Help</span>
        </div>

        <div
          className="flex-1 overflow-auto pixelated"
          style={{
            backgroundColor: '#c0c0c0',
            border: '1px inset #c0c0c0',
            imageRendering: 'pixelated'
          }}
          onClick={handleWindowClick}
        >
          {renderContent(window.type)}
        </div>

        <div
          className="px-2 py-1 text-xs border-t flex items-center justify-between pixelated"
          style={{
            backgroundColor: '#c0c0c0',
            borderTopColor: '#dfdfdf',
            fontFamily: 'monospace'
          }}
        >
          <span>Ready</span>
          <div className="flex items-center space-x-2">
            <div
              className="w-3 h-3 border"
              style={{
                backgroundColor: '#008000',
                borderTopColor: '#00ff00',
                borderLeftColor: '#00ff00',
                borderRightColor: '#004000',
                borderBottomColor: '#004000'
              }}
            />
            <span className="text-xs">Connected</span>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Window;
