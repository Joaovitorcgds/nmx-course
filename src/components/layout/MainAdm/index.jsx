import { useDatabase } from "../../../context/DatabaseProvider/useDatabase";
import "./style.scss"

export function MainAdm(){
  const {currentCourse} = useDatabase();
  
  return(
    <div id="mainAdm">
      {currentCourse ?
      
      <div>
        <h1>{currentCourse.name}</h1>
        <span>Com o culinarista {currentCourse.organizer} no dia {currentCourse.day} de {currentCourse.month}</span>
      </div>

      :  <h1>Selecione um curso para mais informações</h1>}
    </div>
  )
}