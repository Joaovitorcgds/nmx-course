import "./style.scss"
export function Card({className, children}){
  
  return (
    <div className={ className ? `${className} card` : "card"}>
      {children}
    </div>
  )
}