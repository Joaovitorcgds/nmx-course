import "./style.scss"
import { useForm } from "react-hook-form"

import { useDatabase } from "../../context/DatabaseProvider/useDatabase";
import { getKeyLocalStorage } from "../../context/DatabaseProvider/util";
import { X } from "phosphor-react";

export function ModalNewRoom({setShowModal}){
  const {register, handleSubmit} = useForm();
  const { addCourse } = useDatabase();

  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ,22 , 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  function handleCloseModal(){
    setShowModal(false)
  }


  function onSubmit(courseInfo){
    const key = getKeyLocalStorage();
    addCourse(key, courseInfo)
    setShowModal(false)
    
  }

  return(
    <div id="containerModal">
      <div className="contentModal">
        <X  className="closeModal" size={20} 
            onClick={handleCloseModal}/>

        <h2>Crie um novo Evento</h2>

        <form id="formNewEvent" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Nome do Curso</label>
          <input type="text" {...register("name")} autoComplete="off" required/>
          
          <label htmlFor="organizer">Organizador</label>
          <input type="text" {...register("organizer")} autoComplete="off" required/>

          <label htmlFor="price">Investimento</label>
          <input type="number" {...register("price")} 
          className="inputNumber"autoComplete="off" placeholder="$ 4,99" required/>

          <div className="dataPai">
            <div>
              <label htmlFor="day">Dia</label>
              <select name="day" {...register("day")} className="select">
              {days.map(day => {
                return(<option value={day} key={day}>{day}</option>)
              })}
              </select>
            </div>

            <div>
              <label htmlFor="month">Mês</label>
              <select name="month" {...register("month")} className="select">
                {months.map(month => {
                  return(<option value={month} key={month}>{month}</option>)
                })}
              </select>
            </div>

            <div>
              <label htmlFor="year">Ano</label>
              <select name="year" {...register("year")} className="select">
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>

          <button type="submit">Criar Evento</button>
        </form>
      </div>
    </div>
  )
}