import "./style.scss"
import { useState, useEffect } from "react";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase";
import { getUserLocalStorage } from "../../context/AuthProvider/util"

import { Aside } from "../../components/layout/Aside";
import { Header } from "../../components/layout/Header";
import { useParams } from "react-router-dom";
import { WhatsappLogo, Warning } from "phosphor-react";

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
        {currentCourse ? 
          <div id="containerCourses">
            {!currentCourse.is_cancelled ? 
              <div id="courseInformation">
                <h1>Curso de {currentCourse.name}</h1>
                <ul>
                  <li>com Culinarista <strong>{currentCourse.organizer}</strong></li>
                  <li>No dia <strong>{currentCourse.day}</strong> de <strong>{currentCourse.month}</strong> às  <strong>{currentCourse.schedule} horas</strong> </li>
                  <li>O investimento para participar da aula é de <strong>{currentCourse.price} reais</strong> .</li>
                </ul>

                <h3>Entre em contato para reservar sua vaga neste curso</h3>
                <a href={`https://api.whatsapp.com/send?phone=${telephoneUnit}&text=Ol%C3%A1,%20quero%20participar%20do%20curso%20de%20${currentCourse.name}%20com%20o(a)%20culinarista%20${currentCourse.organizer}%20no%20dia%20${currentCourse.day}%20de%20${currentCourse.month}`}>
                  <button >
                    <WhatsappLogo id="imgContact" size={30} weight="bold"/>
                    Entre em contato
                  </button>
                </a>
              </div> 
            : 
              <div className="cancelledCourse">
                <Warning size={64} style={{"color": "red"}} weight="thin" />
                <h1>O Curso de {currentCourse.name} com o(a)culinárista {currentCourse.organizer} foi Cancelado.</h1>
                <p>Quando o curso for reagendado, será adicionado novamente com as informações atualizadas.</p>
              </div>
            }
          </div>
        : 
          <h1 className="initialTitle">Escolha um curso dos próximos dias para ver mais informação</h1>
        }
      </main>
    </div>
  )
}