import "./style.scss"
export function Card({children}){
  
  return (
    <li className="card">
      {children}
    </li>
  )
}