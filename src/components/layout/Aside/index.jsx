import "./style.scss"
import { CaretRight, CaretLeft } from "phosphor-react"
import { ListCourses } from "../../listOfCards/ListCourses"
import { getUserLocalStorage } from "../../../context/AuthProvider/util"

export function Aside({ setShowModal, 
month, year,
setMonth, setYear}){

  const user = getUserLocalStorage();
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  function openModal(){
    setShowModal(true)
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
  
  return (
    <div id="aside">
      {user ? <button className="btnAddRoom" onClick={openModal}> Adicionar curso</button> : <span></span>}
      <div className="separator">Próximos cursos</div>
      <div className="monthFilter">
        <CaretLeft color="white" weight="fill" id="btnMonth" size={24}
         className="styleBtn" onClick={handlePrevMonth}></CaretLeft>
        {`${months[month]}/${year}`}
        <CaretRight color="white" weight="fill" id="btnMonth" size={24} className="styleBtn" onClick={handleNextMonth}></CaretRight>
      </div>
      <ListCourses/>
    </div>
  )
}