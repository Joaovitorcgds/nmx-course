import { UserSquare } from "phosphor-react"
import { useState } from "react";
import "./style.scss"

export function ListStudents({setShowAsideStudent, setIdChair}){
  const [students, setStudents] = useState([]);
  const size = 25;
  const newArray = []

  for (let i = 1; i <= size; i = i + 1){
    newArray.push({
      id: i,
      name: "vazio",
      telephone: null,
      payment_voucher: null,
      is_paid: false,
      is_present: false
    })
  }
  // setStudents(newArray)
  function handleOpenAsideStudent(e){
    const element = e.target;
    const id = element.getAttribute("id");
    setIdChair(id)
    
    setShowAsideStudent(true)
  }

  return(
    <ul className="listStudents">
      {
        newArray.map((student, i) =>{
          return(
            <li key={i} id={student.id} className="student" onClick={handleOpenAsideStudent}>
              <UserSquare id={student.id} className="iconStudent" size={40} weight="thin" />
              {student.name}
            </li>
          );
        })
      }
    </ul>
  )
}