import "./style.scss"
import { CaretRight, CaretLeft, CaretDoubleLeft } from "phosphor-react"
import { useState } from "react"
import { ListCourses } from "../../listOfCards/ListCourses"
import { getUserLocalStorage } from "../../../context/AuthProvider/util"

export function Aside({ setShowModal, 
month, year,
setMonth, setYear}){

  const [ toggleAside, setToggleAside ] = useState(true);
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
    <div id="aside" className={!toggleAside ? "closeAside aside" : "aside"}>
      {user ? 
      <button className="btnAddRoom" onClick={openModal}> Adicionar curso</button> 
      : <span></span>}

      <h2 className={!toggleAside ? "closeContentAside" : "infoAside"}>
        Escolha um curso dos próximos dias para ver mais informação
      </h2> 

      <div className={!toggleAside ? "closeContentAside separator" : "separator"}>
        Próximos cursos
      </div>
      <div className={!toggleAside ? "closeContentAside monthFilter" : "monthFilter"}>
        <CaretLeft color="white" weight="fill" id="btnMonth" size={24}
        className="styleBtn" onClick={handlePrevMonth}/>
          {`${months[month]}/${year}`}
        <CaretRight color="white" weight="fill" id="btnMonth" size={24} className="styleBtn" onClick={handleNextMonth}/>
      </div>

      <button className={!toggleAside ? "btnCloseAside btnToggleAside" : "btnToggleAside"} onClick={() => {setToggleAside(!toggleAside)}}>
        <CaretDoubleLeft size={32} weight="bold" />
      </button> 

      <ListCourses toggleAside={toggleAside} setToggleAside={setToggleAside}/>
    </div>
  )
}