import { createContext, useState } from "react"
import { supabase } from "../../service/supabase"
import { getUserLocalStorage } from "../AuthProvider/util";

export const DatabaseContext = createContext({})

export function DatabaseContextProvider({children}){
  const { user } = getUserLocalStorage();
  const [ units, setUnits ] = useState();
  const [ courseList, setCourseList ] = useState([])

  async function getCourses(month, year){
    try {
      const { data, error } = await supabase
      .from('units')
      .select('id')
      .eq('id_user', user.id)

      const idUnits = data[0].id;
      setUnits(idUnits)
      
      if(error){
        throw error
      }

      if(idUnits){
        const {data, error} = await supabase
        .from('courses')
        .select('*')
        .eq('id_units', idUnits)
        .eq('month', month)
        .eq("year", year)

        if(error){
          throw error;
        }

        console.log(data);

        setCourseList(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

 

  return (
    <DatabaseContext.Provider value= {{ getCourses, units, courseList }}>
      {children}
    </DatabaseContext.Provider>
  )
}