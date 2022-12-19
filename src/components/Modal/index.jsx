import "./style.scss"
import { X } from "phosphor-react"
import { useForm } from "react-hook-form"
import { supabase } from "../../service/supabase";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"

export function ModalNewRoom({setShowModal, month, year}){
  const {register, handleSubmit} = useForm();
  const { getCourses, units } = useDatabase();

  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ,22 , 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  
  function handleCloseModal(){
    setShowModal(false)
  }

  async function handleSendCourse(e){
    const { error } = await supabase
    .from('courses')
    .insert({  
      name: e.name,
      organizer: e.organizer,
      price: e.price,
      day: parseInt(e.day),
      month: e.month,
      year: parseInt(e.year),
      schedule: parseInt(e.schedule),
      id_units: units})

    if(error){
      throw error
    }
    getCourses(months[month], year)
    handleCloseModal()
  }
  
  return(
    <div id="containerModal">
      <div className="contentModal">
        <X  className="closeModal" size={20} 
            onClick={handleCloseModal}/>

        <h2>Crie um novo Evento</h2>

        <div id="form">

          <form id="formNewEvent" onSubmit={handleSubmit(handleSendCourse)}>
            <div className="textField">
              <label htmlFor="name">Nome do Curso</label>
              <input type="text" {...register("name")} autoComplete="off" required/>
            </div>
        
            <div className="textField">
              <label htmlFor="organizer">Organizador</label>
              <input type="text" {...register("organizer")} autoComplete="off" required/>
            </div>

            <div className="textField">
              <label htmlFor="price">Investimento</label>
              <input type="number" {...register("price")}
              className="inputNumber"autoComplete="off" placeholder="R$ 4,99" required/>
            </div>

            <div className="textField">
              <label htmlFor="schedule">Horário</label>
              <input type="number" {...register("schedule")} 
              className="inputNumber"autoComplete="off" min={0} max="21" required/>
            </div>

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
                </select>
              </div>
            </div>
            <button type="submit" className="btnModal">Criar curso</button>
          </form>
        </div>
      </div>
    </div>
  )
}