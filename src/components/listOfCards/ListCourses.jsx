import { useState } from "react"
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
import { getUserLocalStorage } from "../../context/AuthProvider/util"
import { Card } from "../Card/Card"
import "./style.scss"
import { DotsThreeVertical } from "phosphor-react"

export function ListCourses({toggleAside, setToggleAside}){
  const [ actualOpen, setActualOpen ] = useState(0)
  const [ showOptionCard, setShowOptionCard ] = useState(false)
  const [ idSelectedCard, setIdSelectedCard ] = useState()
  const { courseList, getCurrentCourse, deleteCourses, cancelCourse, setCourseList } = useDatabase()
  const user = getUserLocalStorage()
  
  function handleGetCourseId(e){
    const element = e.target
    const id = element.getAttribute("id")
    setIdSelectedCard(Number(id))
    
    if(screen.width <= "650"){
      setToggleAside(!toggleAside)
    }
    getCurrentCourse(Number(id))
  }
  
  function toggleOptionCard(e){
    handleGetCourseId(e)
    setActualOpen(e.target.id)
    
    setShowOptionCard(!showOptionCard)
  }

  async function handleCancelCourse(){
    cancelCourse(parseInt(actualOpen))
    const newState = courseList.map((course) => {
      if(course.id === parseInt(actualOpen)){
        return {...course, is_cancelled: true}
      }
      return course;
    })
    setCourseList(newState)
    setShowOptionCard(false)
  }
  

  function handleDeleteCourse(){
    deleteCourses(parseInt(actualOpen))
    
  }
  
  return(
    <ul>
    {courseList.map((course, i) =>  {
      return(
        <Card key={i} id={course.id} onclick={handleGetCourseId}
        canceled={course.is_cancelled} selected={course.id === idSelectedCard}>

          {course.is_cancelled ?
            <span id={course.id}>O curso no dia {course.day} foi cancelado</span>
          :
            <span id={course.id}>{course.name} no dia {course.day}</span>
          }

          {user ? 
            <button className="optionCard" onClick={(e)=> toggleOptionCard(e)}>
              <DotsThreeVertical size={32} weight="thin" id={course.id}/>
            </button> 
          : ""}

          {course.id === parseInt(actualOpen) ? 
            <div className={`modalCard ${showOptionCard ? "showOptionCard" : ""}`}>
              <button className="btnModal">Editar informação</button>
              <button className={`btnModal ${course.is_cancelled ? "disableBtn" : ""}`} onClick={handleCancelCourse}>Cancelar curso</button>
              <button className="btnModal" style={{"color": "red"}}
              onClick={handleDeleteCourse}>Excluir curso</button>
            </div> 
          : ""}
        </Card>
      )
    })}
    </ul>
  )
}