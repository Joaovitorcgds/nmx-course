import "./style.scss"
import { CaretRight, CaretLeft } from "phosphor-react"
import { ListCourses } from "../../listOfCards/ListCourses"

export function Aside({ setShowModal, 
  month, year,
  handleNextMonth, handlePrevMonth}){
  

    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    function openModal(){
      setShowModal(true)
    }
  
  return (
    <nav id="aside">
      <button className="btnAddRoom" onClick={openModal}> Adicionar curso</button>
      <div className="separator">Próximos cursos</div>
      <div className="monthFilter">
        <CaretLeft color="white" weight="fill" size={24}
         className="styleBtn" onClick={handlePrevMonth}></CaretLeft>
        {`${months[month]}/${year}`}
        <CaretRight color="white" weight="fill" size={24} className="styleBtn" onClick={handleNextMonth}></CaretRight>
      </div>
      <ListCourses/>
    </nav>
  )
}