import { createContext, useState } from "react"
import { supabase } from "../../service/supabase"
import { getUserLocalStorage } from "../AuthProvider/util";

export const DatabaseContext = createContext({})

export function DatabaseContextProvider({children}){
  const [ nameUser, setNameUser ] = useState()
  const [ telephoneUnit, setTelephoneUnit ] = useState()
  const [ courseList, setCourseList ] = useState([])
  const [ currentCourse, setCurrentCourse ] = useState()

  async function handleGetFilteredCourseList(month, year){
    const dataUser  = getUserLocalStorage();

    const {data, error} = await supabase
    .from('units')
    .select('id')
    .eq('id_user', dataUser.user.id)

    if(error){
      throw error;
    }

    const id_unit = data[0].id

    if(id_unit){
      const {data, error} = await supabase
      .from('courses')
      .select('*')
      .eq('id_units', id_unit)
      .eq('month', month)
      .eq("year", year)

      if(error){
        throw error;
      }

      console.log(data);
      return setCourseList(data)
    }

  }

  async function handleGetName(){
    const dataUser  = getUserLocalStorage();

    if(dataUser){
      const {data, error} = await supabase
      .from('users')
      .select('name')
      .eq('id', dataUser.user.id)

      if(error){
        throw error
      }
      return setNameUser(data[0].name)
    }
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
      throw error;
    }

    console.log(data);
    setNameUser(data[0].name)
    setTelephoneUnit(data[0].telephone)
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

  return (
    <DatabaseContext.Provider value= {{ 
    handleGetFilteredCourseList, handleGetName, 
    getFilteredCourseList, getName,
    getCurrentCourse, setCurrentCourse,
    currentCourse, courseList, nameUser, telephoneUnit}}>
      {children}
    </DatabaseContext.Provider>
  )
}