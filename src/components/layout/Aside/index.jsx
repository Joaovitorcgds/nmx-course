import "./style.scss"
import { CaretRight, CaretLeft, CaretDoubleLeft } from "phosphor-react"
import { useState, useEffect } from "react"
import { ListCourses } from "../../ListCourses"
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

  function disableBtn(){
    const element = document.getElementById("btnPrevMonth")
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if(currentMonth === month && currentYear === year){
      element.setAttribute("disabled",true);
    }else{
      element.removeAttribute("disabled")
    }
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
    if(month !== undefined){
      disableBtn()
    }
  }, [month])
  
  return (
    <div id="aside" className={!toggleAside ? "closeAside aside" : "aside"}>
      {user ? 
      <button className="btnAddRoom" onClick={openModal}> Adicionar curso</button> 
      : <span></span>}

      <h2 className="infoAside">
        Escolha um curso dos próximos dias para ver mais informação
      </h2> 

      <div className="separator">
        Próximos cursos
      </div>
      <div className="monthFilter">
        <button id="btnPrevMonth" onClick={handlePrevMonth}>
          <CaretLeft color="white" weight="fill" id="btnMonth" size={24}
          className="styleBtn" />
        </button>
          {`${months[month]}/${year}`}
        <button onClick={handleNextMonth}>
          <CaretRight color="white" weight="fill" id="btnMonth" size={24} className="styleBtn" />
        </button>
      </div>
      <button className={!toggleAside ? "btnCloseAside btnToggleAside" : "btnToggleAside"} onClick={() => {setToggleAside(!toggleAside)}}>
        <CaretDoubleLeft className="iconBtn" size={32} weight="bold" />
      </button> 

      <ListCourses toggleAside={toggleAside} setToggleAside={setToggleAside}/>
    </div>
  )
}