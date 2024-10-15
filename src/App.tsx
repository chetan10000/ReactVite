
import Cards from './components/cards'
import Difficulty from './components/difficulty'
import { useGameStore } from './state/GameState';
import GameHistory from './components/GameHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import './App.scss'


const App = ()=> {

  const{timer,attempts ,showHistory,changeStatus,resetGame} = useGameStore();

  return (
   
          <div className="App">
          {
                showHistory ? (<GameHistory/> )  :
                
              (
                 <>
                    <h1>Match Tiles</h1>
                    <div style={{display:'flex',alignItems:'baseline',justifyContent:'center'}} >
                        <Difficulty/>
                        <div className="badgeContainer">
                           time:
                           <div className="badge">
                               {timer}s
                           </div>
                       </div>
                       <div className="badgeContainer">
                           attempts:
                           <div className="badge">
                             {attempts}
                           </div>
                           <div className="badge"onClick={()=>changeStatus(true)}>
                               <FontAwesomeIcon icon={faHistory} style={{margin:5}}/>
                           </div>
                           <div className="badge"onClick={()=>resetGame()}>
                               <FontAwesomeIcon icon={faRefresh} style={{margin:5}}/>
                           </div>
                       </div>
                    </div>
                    <Cards />
                 </>
              )
          }
      
    </div>
  

  );
}

export default App;
