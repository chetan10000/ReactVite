
import Card from '../components/card'
import { useGameStore } from '../state/GameState'

const Cards = ()=>{


    const { tiles, revealedTiles, matchedPairs, revealTile,  isGameActive } = useGameStore();

    return(
        <div className="container">
             {
                tiles.map((tile,index)=>
                    <Card 
                       item={tile}
                       key= {index} 
                       index={index} 
                       isRevealed={revealedTiles.includes(index) || matchedPairs.includes(index)} 
                       onClick={()=>isGameActive && revealTile(index)}
                    />
                )
             }
        </div>
    )

}

export default Cards