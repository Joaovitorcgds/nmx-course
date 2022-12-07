import { CaretLeft, CaretRight } from "phosphor-react"
// import { useEffect } from "react";
// import { useState } from "react"
import { useDatabase } from "../../../context/DatabaseProvider/useDatabase";
import { ListCourses } from "../../ListCourses"

import "./style.scss"

export function Aside({ setShowModal }){
  const { handlePrevMonth, handleNextMonth, month, year } = useDatabase();

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
 
  function openModal(){
    setShowModal(true)
  }


  return (
    <nav id="aside">
      <button className="btnAddRoom" onClick={openModal}> Adicionar curso</button>
      <div className="separator">Próximos cursos</div>
      <div className="monthFilter">
        <CaretLeft color="white" weight="fill" className="styleBtn" onClick={handlePrevMonth}></CaretLeft>
        {`${months[month]}/${year}`}
        <CaretRight color="white" weight="fill" className="styleBtn" onClick={handleNextMonth}></CaretRight>
      </div>
      <ListCourses/>

    </nav>
  )
}