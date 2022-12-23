import { useState, useEffect } from "react";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase";

import { Aside } from "../../components/layout/Aside";
import { Header } from "../../components/layout/Header";
import { useParams } from "react-router-dom";

export function Courses() {
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const { getCourses, getName } = useDatabase();
  const { idParams } = useParams()
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setMonth(currentMonth)
    setYear(currentYear)
    getName(idParams)
  },[])

  useEffect(() =>{
    if(month !== undefined){
      getCourses(idParams, months[month], year)
    }
  },[month])

  return(
    <>
      <Header/>
      <Aside month={month} year={year}
      setMonth={setMonth} setYear={setYear}/>
    </>
  )
}