import "./style.scss"
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
export function Card({id, children}){
  const { getCurrentCourse } = useDatabase()
  
  return (
    <div  id={id} className="card" onClick= {(e) => {
      const element = e.target
      const id = element.getAttribute("id")

      getCurrentCourse(Number(id))
    }}>
      {children}
    </div>
  )
}