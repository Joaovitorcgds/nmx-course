import "./style.scss"

export function Card({id, onclick, children, selected}){
  
  return (
    <div id={id} className={`card ${selected ? "selectedCard" : ""}`} onClick= {onclick}>
      {children}
    </div>
  )
}