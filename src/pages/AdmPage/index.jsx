import { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import { Aside } from "../../components/layout/Aside";
import { ModalNewRoom } from "../../components/Modal";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"

import "./style.scss";

export default function AdmRoom(){
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const { handleGetCourses, handleGetName} = useDatabase();
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  useEffect(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    setMonth(currentMonth)
    setYear(currentYear)
    handleGetName()
  },[])

  useEffect(() => {
    if(month !== undefined){
      handleGetCourses(months[month], year)
    }
  },[month])

  return(
    <>
    <Header />
    <Aside setShowModal={setShowModal} 
    month={month} year={year}
    setMonth={setMonth} setYear={setYear}
    />
    {showModal ? 
      <ModalNewRoom 
      setShowModal={setShowModal} 
      month={month} year={year}/> 
    : <span></span>}
    </>
  )
}