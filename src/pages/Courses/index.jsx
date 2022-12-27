import "./style.scss"
import { useState, useEffect } from "react";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase";

import { Aside } from "../../components/layout/Aside";
import { Header } from "../../components/layout/Header";
import { useParams } from "react-router-dom";
import { WhatsappLogo, Phone } from "phosphor-react";

export function Courses() {
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const { getFilteredCourseList, getName, currentCourse} = useDatabase();
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
        ? <div>
            <h1>Curso de {currentCourse.name}</h1>
            <p>com professor(a) {currentCourse.organizer} no dia {currentCourse.day} de {currentCourse.month} às  {currentCourse.schedule} horas</p>
              <p>O investimento para participar da aula é de {currentCourse.price} reais.</p>
          </div> 
        : <h1>Escolha um curso dos próximos dias para ver mais informação</h1>}
          
          <div id="footer">
            <h2>Entre em contato para reservar sua vaga no curso de seu interesse</h2>
            <div id="containerContact">
              <div>
                <h3>Loja Campinho</h3>
                <span>
                  <WhatsappLogo size={24} weight="thin" />
                  (21) 99678-3559
                </span>
                <p>Avenida Ernani Cardoso 350 <br />
                  Cascadura – Rio de Janeiro <br />
                  Dentro do Shopping Guanabara de Campinho</p>
              
              </div>
              <div>
                <h3>Loja Prado</h3>
                <span>
                  <Phone size={24} weight="thin" />
                  (22) 2580-2029
                </span>
                <p>Av. Gov. Roberto Silveira, 1700 <br />
                  Prado, Nova Friburgo - RJ</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}