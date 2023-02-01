import { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import { Aside } from "../../components/layout/Aside";
import { ModalNewCourse } from "../../components/ModalNewCourse";
import { MainAdm } from "../../components/layout/MainAdm";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
import { useParams } from "react-router-dom";

import "./style.scss";

export default function AdmRoom(){
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const { idParamsUnity } = useParams()

  const { getFilteredCourseList, handleGetName, currentCourse} = useDatabase();
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  useEffect(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    setMonth(currentMonth)
    setYear(currentYear)
    handleGetName(idParamsUnity)
  },[])

  useEffect(() => {
    if(month !== undefined){
      getFilteredCourseList(idParamsUnity, months[month], year)
    }
  },[month])

  return(
    <>
    <Header />
    <main style={{"overflowX": "hidden"}}>
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