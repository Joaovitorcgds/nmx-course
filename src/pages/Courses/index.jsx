import "./style.scss"
import { useState, useEffect } from "react";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase";
import { getUserLocalStorage } from "../../context/AuthProvider/util"

import { Aside } from "../../components/layout/Aside";
import { Header } from "../../components/layout/Header";
import { useParams } from "react-router-dom";
import { WhatsappLogo } from "phosphor-react";

export function Courses() {
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const user = getUserLocalStorage()

  const { getFilteredCourseList, getName, 
          currentCourse, telephoneUnit} = useDatabase();
  const { idParams } = useParams()
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  

  useEffect(() => {
    if(user){
      localStorage.clear()
    }

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setMonth(currentMonth)
    setYear(currentYear)
    getName(idParams)
  },[])

  useEffect(() =>{
    if(month !== undefined){
      getFilteredCourseList(idParams, months[month], year)
    }
  },[month])

  return(
    <div id="courses">
      <Header/>
      <main>
        <Aside month={month} year={year}
        setMonth={setMonth} setYear={setYear}/>
        <div id="containerCourses">
        {currentCourse 
        ? <div id="courseInformation">
            <h1>Curso de {currentCourse.name}</h1>
            <ul>
              <li>com Culinarista <strong>{currentCourse.organizer}</strong></li>
              <li>No dia <strong>{currentCourse.day}</strong> de <strong>{currentCourse.month}</strong> às  <strong>{currentCourse.schedule} horas</strong> </li>
              <li>O investimento para participar da aula é de <strong>{currentCourse.price} reais</strong> .</li>
            </ul>

            <h3>Entre em contato para reservar sua vaga neste curso</h3>
            <a href={`https://api.whatsapp.com/send?phone=${telephoneUnit}`}>
              <button >
                <WhatsappLogo id="imgContact" size={30} weight="bold"/>
                Entre em contato
              </button>
            </a>
          </div> 
        : <h1>Escolha um curso dos próximos dias para ver mais informação</h1>}
        </div>
      </main>
    </div>
  )
}