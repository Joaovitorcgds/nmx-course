import { UserSquare } from "phosphor-react"
import { useState } from "react";
import "./style.scss"

export function ListStudents({setShowAsideStudent}){
  const [students, setStudents] = useState([]);
  const size = 25;
  const newArray = []

  for (let i = 0; i < size; i = i + 1){
    newArray.push({
      id: i,
      name: "vazio"
    })
  }
  // setStudents(newArray)
  function handleOpenAsideStudent(){
    setShowAsideStudent(true)
  }

  return(
    
    <div className="containerListStudents">
      <ul className="listStudents">
        {
          newArray.map((student, i) =>{
            return(
              <li key={i} className="student" onClick={handleOpenAsideStudent}>
                <UserSquare className="iconStudent" size={40} weight="thin" />
                {student.name}
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}