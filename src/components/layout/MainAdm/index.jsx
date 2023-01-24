import { useDatabase } from "../../../context/DatabaseProvider/useDatabase";
import { ListStudents } from "../../ListStudents"
import { AsideStudent } from "../AsideStudent";
import { Warning } from "phosphor-react";
import "./style.scss"
import { useState } from "react";

export function MainAdm(){
  const [showAsideStudent, setShowAsideStudent] = useState(false);
  const {currentCourse} = useDatabase();

  function handleCloseAsideStudent(e){
    const element= e.target;
    const asideStudent= document.querySelector(".asideStudent")

    if(asideStudent.contains(element)) return

    setShowAsideStudent(false)
  }

  return(
    <>
      {currentCourse ?
        <div id="mainAdm" onClick={(e)=> {showAsideStudent ? handleCloseAsideStudent(e) : ""}}>
          {!currentCourse.is_cancelled ?
            <>
              <div className="contentMain">
                <div>
                  <h1>{currentCourse.name}</h1>
                  <span>Com o culinarista {currentCourse.organizer} no dia {currentCourse.day} de {currentCourse.month}</span>
                </div>
                <ListStudents setShowAsideStudent={setShowAsideStudent}/>
              </div>
              <AsideStudent showAsideStudent={showAsideStudent}/>
            </>
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