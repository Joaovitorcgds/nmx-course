import { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import { Aside } from "../../components/layout/Aside";
import { ModalNewCourse } from "../../components/ModalNewCourse";
import { MainAdm } from "../../components/layout/MainAdm";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"

import "./style.scss";

export default function AdmRoom(){
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const { handleGetFilteredCourseList, handleGetName, currentCourse} = useDatabase();
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
      handleGetFilteredCourseList(months[month], year)
    }
  },[month])

  return(
    <>
    <Header />
    <main>
      <Aside setShowModal={setShowModal}
      month={month} year={year}
      setMonth={setMonth} setYear={setYear}
      />
      <ModalNewCourse setShowModal={setShowModal} showModal={showModal}
      month={month} year={year}/>
      <MainAdm/>
    </main>

    </>
  )
}