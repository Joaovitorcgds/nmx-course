import { useEffect, useState } from "react"
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
import { getUserLocalStorage } from "../../context/AuthProvider/util"
import { Card } from "../Card/Card"
import "./style.scss"
import { DotsThreeVertical } from "phosphor-react"

export function ListCourses({toggleAside, setToggleAside}){
  const [ showOptionCard, setShowOptionCard ] = useState(false)
  const [ idSelectedCard, setIdSelectedCard ] = useState()
  const { isLoadingList, courseList, getCurrentCourse, deleteCourses, cancelCourse, setCourseList } = useDatabase()
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
    const main = document.getElementById("mainAdm")
    handleGetCourseId(e)

    if(e.target === main){
      console.log(true)
    }
    
    setShowOptionCard(!showOptionCard)
  }

  async function handleCancelCourse(){
    cancelCourse(idSelectedCard)
    const newState = courseList.map((course) => {
      if(course.id === idSelectedCard){
        return {...course, is_cancelled: true}
      }
      return course;
    })
    setCourseList(newState)
    setShowOptionCard(false)
  }

  function handleDeleteCourse(){
    deleteCourses(idSelectedCard)
  }
  
  return(
    <ul>
      {isLoadingList ? <span style={{margin:"0 auto", color:"white"}}>carregando...</span> :
      <>
      {courseList.length === 0 ? 
        <h2 style={{textAlign:"center", color:"white"}}>Não há cursos para esse mês no momento</h2>
      : 
        <>
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
                  <button className="optionCard" onClick={toggleOptionCard}>
                    <DotsThreeVertical size={32} weight="thin" id={course.id}/>
                  </button> 
                : ""}

                {course.id === idSelectedCard ? 
                <>
                  <div id={course.id} className={`modalCard ${showOptionCard ? "showOptionCard" : ""}`}>
                    {/* <p className="btnModal">Editar informação</p> */}
                    <p className={`btnModal ${course.is_cancelled ? "disableBtn" : ""}`} onClick={handleCancelCourse}>Cancelar curso</p>
                    <p className="btnModal" style={{"color": "red"}}
                    onClick={handleDeleteCourse}>Excluir curso</p>
                  </div>
                  <div style={{position: "fixed", inset: 0, background: "transparent", zIndex: 4, display: showOptionCard ? "block" : "none"}} onClick={() => {setShowOptionCard(false)}} ></div>
                </> 
                : ""}
              </Card>
            )
          })}
        </>
      }
      </>}
    </ul>
  )
}