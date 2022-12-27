import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
import { Card } from "../Card/Card"

export function ListCourses(){
  const { courseList } = useDatabase()

  if (courseList) { 
    return(
      <ul>
        {courseList.map((course, i) =>  {
          return(
            <Card key={i} id={course.id} >{course.name} no dia {course.day}</Card>
          )
        })} 
      </ul>
    )
  }
}