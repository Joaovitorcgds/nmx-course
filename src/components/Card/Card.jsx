import "./style.scss"

export function Card({id, onclick, children, selected, canceled}){
  
  return (
    <div id={id} 
    className={`card ${selected ? "selectedCard" : ""} ${canceled ? "isCancelled" : ""}`} 
    onClick= {onclick}>
      {children}
    </div>
  )
}