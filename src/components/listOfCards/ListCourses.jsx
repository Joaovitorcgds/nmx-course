import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
import { Card } from "../Card/Card"

export function ListCourses({toggleAside, setToggleAside}){
  const { courseList, getCurrentCourse } = useDatabase()

  function handleGetCourseId(e){
    const element = e.target
    const id = element.getAttribute("id")

    if(screen.width <= "650"){
      setToggleAside(!toggleAside)
    }
    getCurrentCourse(Number(id))
  }

  if (courseList) { 
    return(
      <ul>
        {courseList.map((course, i) =>  {
          return(
            <Card key={i} id={course.id} 
            className={!toggleAside ? "CardCloseAside card" : "card"}
            onclick={handleGetCourseId}>
              {course.name} no dia {course.day}
            </Card>
          )
        })} 
      </ul>
    )
  }
}