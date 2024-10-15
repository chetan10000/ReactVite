import { create } from "zustand";

interface GameSession{
  attempts:number,
  duration:number,
  date:string
}

const gameHistoryKey = 'gameHistory';

interface GameState {
  tiles:number[];
  revealedTiles: number[];
  matchedPairs: number[];
  attempts: number;
  timer: number;
  intervalId:number;
  startTime: number | null;
  isGameActive: boolean;
  matchedCounter:number;
  showHistory:boolean;
  prevLevel:number;
  startGame: (difficulty: number) => void;
  revealTile: (index: number) => void;
  resetGame: () => void;
  getGameHistory:()=>GameSession[];
  changeStatus:(isshow:boolean)=>void;
  saveSessionToStorage:(attempt:number,duration:number)=> void
  
}

export const useGameStore = create<GameState>((set) => ({
  tiles:[],
  revealedTiles: [],
  matchedPairs: [],
  attempts: 0,
  timer: 0,
  intervalId:0,
  startTime: null,
  isGameActive: false,
  matchedCounter:1,
  showHistory:false,
  prevLevel:0,
  startGame: (difficulty) => {
    
    const totalTiles = difficulty ==2 ?24: difficulty ==3 ?32:16; // Each tile has a pair
    const tiles = Array.from({ length: totalTiles }, (_, i) => Math.floor(i / 2) + 1);
    const shuffledTiles = tiles.sort(() => Math.random() - 0.5);
    
    set({
      revealedTiles: [],
      matchedPairs: [],
      attempts: 0,
      timer: 0,
      startTime: Date.now(),
      isGameActive: true,
      tiles: shuffledTiles,
      prevLevel:difficulty
    });

  
    // Start the timer
    const interval = setInterval(() => {
      set((state) => ({
        timer: Math.floor((Date.now() - state.startTime!) / 1000),
      }));
    }, 1000);

    // Clear interval on game reset
    set({ intervalId: interval });
  },

  revealTile: (index: number) => {
    
    set((state) => {
      if (state.revealedTiles.includes(index) || state.matchedPairs.includes(index)) {
        return {}; // Ignore if tile is already revealed or matched
      }
   
      const newRevealedTiles = [...state.revealedTiles, index];
      let newAttempts = state.attempts ;

      if (newRevealedTiles.length === 2) {
        const [firstIndex, secondIndex] = newRevealedTiles;
        const isMatch = state.tiles[firstIndex] === state.tiles[secondIndex];
        // Delay before revealing the tiles again
        setTimeout(() => {
             
          if (isMatch) {
            set((s) => ({
              matchedPairs: [...s.matchedPairs, firstIndex, secondIndex],
              matchedCounter:s.matchedCounter + 1,
              revealedTiles: [],
            }));
          } else {
            
            set({ revealedTiles: [],attempts:newAttempts+1 });
          }
        }, 1000);
        
      }
      

      if(state.matchedCounter === state.tiles.length/2){
        console.log("game end");
        state.saveSessionToStorage(state.attempts,state.timer)
        set({
          
          matchedCounter:1,
          
        });    
      }
      
      return {
        revealedTiles: newRevealedTiles,
        attempts: newAttempts,
      };
    });
  },

  resetGame: () => {
    

    set((state) => {
      clearInterval(state.intervalId);
      state.startGame(state.prevLevel);
      return {
         
      };
    });
  },


  getGameHistory:():GameSession[]=>{
    const history:GameSession[] = JSON.parse(localStorage.getItem(gameHistoryKey) || '[]');
    return history;
  },

  changeStatus:(isshow:boolean )=>{
    set({
      showHistory:isshow
    })
  }
  ,
  saveSessionToStorage:(attempts:number,duration:number)=>{
    const newSession: GameSession = {
      attempts:attempts,
      duration:duration,
      date: new Date().toISOString(),
    };
  
    // Retrieve existing game history
    const existingHistory = JSON.parse(localStorage.getItem(gameHistoryKey) || '[]');
    existingHistory.push(newSession);
  
    // Save updated history back to localStorage
    localStorage.setItem(gameHistoryKey, JSON.stringify(existingHistory));
  }
}));
