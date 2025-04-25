import { Stage } from '@pixi/react';
import { useState } from 'react';
import { MemoryGame } from './components/MemoryGame';
import { StageSize } from './types';

function App() {
  const [stageSize] = useState<StageSize>({ width: 600, height: 600 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-fuchsia-800 to-rose-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5LTEuNzkxIDQtNCA0cy00LTEuNzkxLTQtNCAxLjc5MS00IDQtNCA0IDEuNzkxIDQgNHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-rose-500/10 to-violet-500/10 animate-gradient-slow"></div>
      
      <div className="relative z-10">
        <h1 className="text-7xl font-bold mb-6 text-white text-center drop-shadow-2xl animate-float-fast">
          Memory Game
          <span className="block text-4xl mt-4 text-fuchsia-200 font-light tracking-wider">
            Match the Animals!
          </span>
        </h1>
        
        <div className="bg-white/20 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border border-white/40 transform hover:scale-[1.02] transition-transform duration-200">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/30 via-rose-500/30 to-violet-500/30 rounded-3xl"></div>
          <div className="relative z-10">
            <Stage width={stageSize.width} height={stageSize.height} options={{ backgroundColor: 0x1a1a1a }}>
              <MemoryGame stageSize={stageSize} />
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 