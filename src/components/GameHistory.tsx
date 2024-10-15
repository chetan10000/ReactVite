
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './GameHistory.scss';
import { useGameStore } from '../state/GameState'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const GameHistory = ()=>{
 
    const {getGameHistory,changeStatus}= useGameStore()

    const history = getGameHistory();
    
    console.log("history " , history);

    return(

  <div className="history">
      <h1> Game History</h1>
      
      <div className="badge" onClick={()=>changeStatus(false)}>
             <FontAwesomeIcon icon={faArrowLeft}/>
      </div>
       <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Attempts</th>
      <th scope="col">Duration</th>
      <th scope="col">Time</th>
    </tr>
  </thead>
  <tbody>
    {
        history.map((item,index)=>
            <tr>
                <th scope="row">{index+1}</th>
                <td>{item.attempts}</td>
                <td>{item.duration}</td>
                <td>{new Date(item.date).toLocaleString()}</td>
            </tr>
        )
    }
  
   
  </tbody>
</table>
  </div>
        
    )
}
export default GameHistory;