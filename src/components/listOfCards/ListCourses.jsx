import { useState } from "react"
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
import { getUserLocalStorage } from "../../context/AuthProvider/util"
import { Card } from "../Card/Card"
import "./style.scss"
import { DotsThreeVertical } from "phosphor-react"

export function ListCourses({toggleAside, setToggleAside}){
  const [ showOpitonCard, setShowOptionCard ] = useState(false)
  const [ idSelectedCard, setIdSelectedCard ] = useState()
  const { courseList, getCurrentCourse } = useDatabase()
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

  // function toggleOptionCard(e){
  //   handleGetCourseId(e)
  //   const { clientX, clientY } = e;
  //   setShowOptionCard(!showOpitonCard)
  // }

  if (courseList) { 
    return(
      <ul>
        {courseList.map((course, i) =>  {
          return(
            <Card key={i} id={course.id} 
            onclick={handleGetCourseId}
            selected={course.id === idSelectedCard}
            >
              <span id={course.id}>{course.name} no dia {course.day}</span>
              {user ? 
              <button className="optionCard" onClick={toggleOptionCard}>
                <DotsThreeVertical size={32} weight="thin" id={course.id}/>
              </button> : <></>}
              {/* <div className={`${showOpitonCard ? "showOptionCard modalCard" : "modalCard"}`}></div> */}
            </Card>
          )
        })}
        
      </ul>
    )
  }
}