import { createContext, useState } from "react"
import { supabase } from "../../service/supabase"
import { getUserLocalStorage } from "../AuthProvider/util";

export const DatabaseContext = createContext({})

export function DatabaseContextProvider({children}){
  const [ nameUser, setNameUser ] = useState()
  const [ courseList, setCourseList ] = useState([])

  async function handleGetCourses(month, year){
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

  async function getCourses(idParams, month, year){
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
  .select('name')
  .eq('id', idParams)

  if(error){
    throw error;
  }

  console.log(data);
  return setNameUser(data[0].name)
}


  return (
    <DatabaseContext.Provider value= {{ 
    handleGetCourses, handleGetName, 
    getCourses, getName, 
    courseList, nameUser }}>
      {children}
    </DatabaseContext.Provider>
  )
}