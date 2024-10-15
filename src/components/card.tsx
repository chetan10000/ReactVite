
const Card= ({item,isRevealed, onClick}:any)=>{


const itemClass = isRevealed ? " active " +"correct" : "";
console.log("here", itemClass)
return(
        <div className={"card"+itemClass} onClick={onClick}>   
            <img src={`img/cartoon${item}.png`} alt=""  />
        </div>
    );
}

export default Card