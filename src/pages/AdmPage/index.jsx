import { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import { Aside } from "../../components/layout/Aside";
import { ModalNewRoom } from "../../components/Modal";
import { getUserLocalStorage } from "../../context/AuthProvider/util"
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"

import "./style.scss";
import { supabase } from "../../service/supabase";

export default function AdmRoom(){
  const [showModal, setShowModal] = useState(false);
  const [nameUser, setNameUser] = useState("")
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const {user}  = getUserLocalStorage();
  const { getCourses } = useDatabase();
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  async function handleGetName(){
    const {data, error} = await supabase
      .from('users')
      .select("name")
      .eq("id", user.id)
    
    setNameUser(data[0].name)
    if(error){
      throw error
    }
  }

  function initializePage(){
    const date = new Date();
    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()

    setMonth(currentMonth)
    setYear(currentYear)
    handleGetName()
    getCourses(months[currentMonth], currentYear)
  }

  function handleNextMonth(){
    setMonth((currentMonth) => currentMonth + 1)
    
    if(month === 11){
      setMonth(0)
      setYear((currentYear) => currentYear + 1)
    }
  }

  function handlePrevMonth(){
    setMonth((currentMonth) => currentMonth - 1)
    
    if(month === 0){
      setMonth(11)
      setYear((currentYear) => currentYear - 1)
    }

    
  }

  useEffect(() => {
    initializePage()
  },[])

  useEffect(() => {
    getCourses(months[month], year)
  },[month])

  return(
    <>
    <Header nameUser={nameUser}/>
    <Aside setShowModal={setShowModal} 
    month={month} year={year}
    handleNextMonth = {handleNextMonth}
    handlePrevMonth = {handlePrevMonth}/>
    {showModal ? 
      <ModalNewRoom 
      setShowModal={setShowModal} 
      month={month} year={year}/> 
    : <span></span>}
    </>
  )
}