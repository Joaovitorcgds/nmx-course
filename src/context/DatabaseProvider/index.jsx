import { useState, createContext, useEffect } from "react";

import { onValue, push, ref, set, orderByChild } from "firebase/database";
import { database } from "../../services/firebase";

import { setKeyLocalStorage } from "./util";
import { getKeyLocalStorage } from "./util";

export const DatabaseContext = createContext({})

export function DatabaseContextProvider({children}){
  const userList = ref(database, "users/")
  const key = getKeyLocalStorage();
  const [courseList ,setCourseList] = useState([]);

  const [ month, setMonth ] = useState(0);
  const [ year, setYear ] = useState("");

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  function getKeyOnFirebase(user){
    onValue(userList, (snapshot)=>{
      const data = snapshot.val();
      for(var i in data){
        if(data[i].email === user.email){
          setKeyLocalStorage(i);
          break;
        }
      }
    })
  }

  function addCourse(key, course){
    const courseListRef = ref(database, `courses/${key}/`);
    const newCourseRef = push(courseListRef);
    set(newCourseRef, course);
    getCourses(month)

  }

  function getCourses(){
    const courseListRef = ref(database, `courses/${key}/`)
    onValue(courseListRef, (snapshot) => {
      const data = snapshot.val();
      const list = Object.values(data)
      const filterlist = list.filter((item) => {
        if(item.month === months[month]){
          return({name: item.name , day:item.day})
        }
      })
      setCourseList(filterlist)
    })
    
  }



  function handleNextMonth(){
    setMonth((prevMonth) => prevMonth + 1)
    
    if(month === 11){
      setMonth(0)
      setYear((prevYear) => prevYear + 1)
    }
  }

   function handlePrevMonth(){
    setMonth((prevMonth) => prevMonth - 1)

    if(month === 0){
      setMonth(11)
      setYear((prevYear) => prevYear - 1)
    }
  }

  useEffect(() => {
    getCourses()
  }, [month])

  useEffect(() => {
    const date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    
    setMonth(currentMonth);
    setYear(currentYear);
    
    getCourses(currentMonth);

  }, [])


  return(
    <DatabaseContext.Provider value={{ getKeyOnFirebase, addCourse, courseList, getCourses, 
    handlePrevMonth, handleNextMonth, month, year}}>
      {children}
    </DatabaseContext.Provider>
  )
}