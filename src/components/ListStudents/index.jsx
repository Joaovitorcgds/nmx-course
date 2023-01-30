import { UserSquare } from "phosphor-react"
import { useEffect, useState } from "react";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
import "./style.scss"

export function ListStudents({setShowAsideStudent, setIdChair}){
  const { getStudentsDB, listStudentsDB, currentCourse, getCurrentStudent } = useDatabase();
  const newArray = []
  const size = 25;

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

  useEffect(() =>{
    getStudentsDB(currentCourse.id, newArray)

  }, [])

  useEffect(() => {
    getStudentsDB(currentCourse.id, newArray)
  }, [currentCourse])

  async function handleOpenAsideStudent(e){
    const element = e.target.parentNode;
    const id = element.getAttribute("id");
    
    if(id === null) return
    
    setIdChair(id)
    await getCurrentStudent(id, currentCourse.id)
    setShowAsideStudent(true)
  }

  return(
    <ul className="listStudents">
      {
          listStudentsDB.map((student) =>{
          return(
            <li key={student.id} id={student.id} className="student" onClick={handleOpenAsideStudent}>
              <UserSquare id={student.id} weight={student.name !== "vazio" ? "fill" :  "thin"} size={40}
              className={`"iconStudent" ${student.is_paid ? "isPaid" : ""} ${student.is_present ? "isPresent" : ""}`}/>
              <span>{student.name}</span>
            </li>
          );
        })
      }
    </ul>
  )
}