import { useState } from "react";
import { useDatabase } from "../../../context/DatabaseProvider/useDatabase";
import { ListStudents } from "../../ListStudents"
import { AsideStudent } from "../AsideStudent";
import { Warning } from "phosphor-react";
import "./style.scss"

export function MainAdm(){
  const [showAsideStudent, setShowAsideStudent] = useState(false);
  const [ idChair, setIdChair ] = useState();
  const {currentCourse} = useDatabase();

  function handleCloseAsideStudent(e){
    const element= e.target;
    const asideStudent= document.querySelector(".asideStudent")
    const allInputs = document.querySelectorAll(".inputAside")

    if(asideStudent.contains(element)) return

    allInputs.forEach((input) => {
      input.value = ""
    })
    
    setShowAsideStudent(false)
  }

  return(
    <>
      {currentCourse ?
        <div id="mainAdm" onClick={(e)=> {showAsideStudent ? handleCloseAsideStudent(e) : ""}}>
          <div className="contentMain">
            <div>
              <h1>{currentCourse.name}</h1>
              <span>Com o culinarista {currentCourse.organizer} no dia {currentCourse.day} de {currentCourse.month}</span>
            </div>
            <ListStudents setShowAsideStudent={setShowAsideStudent} setIdChair={setIdChair}/>
          </div>
          <AsideStudent 
            showAsideStudent={showAsideStudent} setShowAsideStudent={setShowAsideStudent} 
            idChair={idChair}
          />
        </div>
      : 
        <h1 className="initialText">Selecione um Curso para mais informações</h1>}
    </>
  )
}