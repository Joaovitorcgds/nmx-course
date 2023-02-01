import { createContext, useState } from "react"
import { supabase } from "../../service/supabase"
import { getUserLocalStorage } from "../AuthProvider/util";

export const DatabaseContext = createContext({})

export function DatabaseContextProvider({children}){
  const [ nameUser, setNameUser ] = useState()
  const [ telephoneUnit, setTelephoneUnit ] = useState()
  const [ courseList, setCourseList ] = useState([])
  const [ currentCourse, setCurrentCourse ] = useState()
  const [ listStudentsDB, setListStudentsDB ] = useState([])
  const [ isLoading, setIsLoading] = useState(true)

  const initializeCurrentStudent = {
    isStudent: false,
    created_at: "",
    id: null,
    id_courses: null,
    is_paid: false ,
    is_present: false ,
    name: "",
    payment_voucher: null,
    telephone: null
  }
  const [ currentStudent, setCurrentStudent ] = useState(initializeCurrentStudent)


  async function handleGetName(idParamsUnity){
      const {data, error} = await supabase
      .from('units')
      .select('name')
      .eq('id', idParamsUnity)

      if(error){
        throw error
      }
      setIsLoading(false)
      return setNameUser(data[0].name)
  }
  

  async function getFilteredCourseList(idParams, month, year){
    const {data, error} = await supabase
    .from('courses')
    .select('*')
    .eq('id_units', idParams)
    .eq('month', month)
    .eq("year", year)

    if(error){
      throw error;
    }

    console.log(data);
    return setCourseList(data)
  }

  async function getName(idParams){
    const {data, error} = await supabase
    .from('units')
    .select(`name, telephone`)
    .eq('id', idParams)

    if(error){
      setIsLoading(false)
      throw error;
    }

    console.log(data);
    setNameUser(data[0].name);
    setTelephoneUnit(data[0].telephone);
    setIsLoading(false);
  }

  async function getStudentsDB(id_courses, newArray){
    const { data, error } = await supabase
    .from('students')
    .select()
    .eq("id_courses",id_courses)

    if(error){
      throw error
    }
    
    setListStudentsDB(data)

    const newState = newArray.map(student => {

      for (let i in data){
        if(student.id === data[i].id){
          return {...student, 
            name: data[i].name,
            telephone: data[i].telephone,
            payment_voucher: data[i].payment_voucher,
            is_paid: data[i].is_paid,
            is_present: data[i].is_present
          }
        }
      }
      return student;
    })

    // console.log(newState)
    setListStudentsDB(newState)
  }

  async function getCurrentStudent(id, id_courses){
    const  { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .eq("id_courses", id_courses)

    if(error){
      throw error;
    }

    if(data[0] === undefined){
      return setCurrentStudent(initializeCurrentStudent)
    }
    setCurrentStudent({...data[0], isStudent: true})
  }

  async function getCurrentCourse(id){
    const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)

    if(error){
      throw error
    }

    setCurrentCourse(data[0])
  }

  async function cancelCourse(id){
    const { error } = await supabase
    .from('courses')
    .update({ is_cancelled: true })
    .eq('id', id)

    if(error){
      throw new Error()
    }
  }

  async function deleteCourses(id){
    const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', id)

    if(error){
      throw error
    }
    
    const newArray = courseList.filter(course => course.id !== id)
    setCourseList(newArray)
  }

  return (
    <DatabaseContext.Provider value= {{
    getFilteredCourseList,
    deleteCourses, cancelCourse, 
    getCurrentCourse, setCurrentCourse, currentCourse,
    getStudentsDB, setListStudentsDB, listStudentsDB,
    setCourseList,courseList,
    getCurrentStudent, currentStudent,
    handleGetName, getName, nameUser,
    telephoneUnit,
    isLoading
    }}>
      {children}
    </DatabaseContext.Provider>
  )
}