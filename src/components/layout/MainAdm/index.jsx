import { useDatabase } from "../../../context/DatabaseProvider/useDatabase";
import { Warning } from "phosphor-react";
import "./style.scss"

export function MainAdm(){
  const {currentCourse} = useDatabase();
  
  return(
    <>
      {currentCourse ?
        <div id="mainAdm">
          {!currentCourse.is_cancelled ?
            <div>
              <h1>{currentCourse.name}</h1>
              <span>Com o culinarista {currentCourse.organizer} no dia {currentCourse.day} de {currentCourse.month}</span>
            </div>
          :
            <div className="caseCancelledCourse">
              <Warning size={64} style={{"color": "red"}} weight="thin" />
              <h1>O Curso de {currentCourse.name} com o(a)culinárista {currentCourse.organizer} foi Cancelado.</h1>
              <p>Quando o curso for reagendado, por favor crie um novo curso.</p>
            </div>
          }
        </div>: 
      <h1 className="initialText">Selecione um Curso para mais informações</h1>}
    </>
  )
}