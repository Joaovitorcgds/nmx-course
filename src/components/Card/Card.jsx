import "./style.scss"

export function Card({id, className, onclick, children}){
  
  return (
    <div id={id} className={className} onClick= {onclick}>
      {children}
    </div>
  )
}