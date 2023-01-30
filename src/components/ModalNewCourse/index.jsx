import "./style.scss"
import { X } from "phosphor-react"
import { useForm } from "react-hook-form"
import { supabase } from "../../service/supabase";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
import { getUserLocalStorage } from "../../context/AuthProvider/util";

export function ModalNewCourse({setShowModal, showModal, month, year}){
  const {register, handleSubmit} = useForm();
  const { handleGetFilteredCourseList } = useDatabase();

  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21 ,22 , 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  
  function handleCloseModal(e){
    const modal = document.querySelector(".contentModal")
    const allInputs = document.querySelectorAll(".inputModal")

    if(modal.contains(e.target)) return

    allInputs.forEach((input) => {
      input.value = ""
    })
    setShowModal(false)
  }

  async function handleSendCourse(e){
    const dataUser  = getUserLocalStorage();
    const allInputs = document.querySelectorAll(".inputModal")
    
    const {data, error} = await supabase
    .from('units')
    .select("id")
    .eq("id_user", dataUser.user.id)

    if(error){
      throw error
    }

    const id_unit = data[0].id

    if(id_unit){
      const { error } = await supabase
      .from('courses')
      .insert({  
        name: e.name,
        organizer: e.organizer,
        price: e.price,
        day: parseInt(e.day),
        month: e.month,
        year: year,
        schedule: parseInt(e.schedule),
        id_units: id_unit})
  
      if(error){
        throw error
      }
      handleGetFilteredCourseList(months[month], year)
      setShowModal(false)
      allInputs.forEach((input) => {
        input.value = ""
      })
    }
  }
  
  return(
    <>
    <div className={showModal ? "showModal containerModal" : "containerModal"} onClick={handleCloseModal}>
      <div className="contentModal">
        <X  className="closeModal" size={20} 
            onClick={() => setShowModal(false)}/>

        <h2>Adicione um novo curso</h2>

        <div id="form">

          <form id="formNewEvent" onSubmit={handleSubmit(handleSendCourse)}>
            <div className="textField">
              <label htmlFor="name">Nome do Curso</label>
              <input type="text" {...register("name")} autoComplete="off" required className="inputModal"/>
            </div>
        
            <div className="textField">
              <label htmlFor="organizer">Culinárista</label>
              <input type="text"  className="inputModal"
              name="organizer" {...register("organizer")} 
              autoComplete="off" required/>
            </div>

            <div className="textField">
              <label htmlFor="price">Investimento</label>
              <input type="number" className="inputNumber inputModal"
              name="price" {...register("price")}
              autoComplete="off" required/>
            </div>

            <div className="textField">
              <label htmlFor="schedule">Horário</label>
              <input type="number" {...register("schedule")} 
              className="inputNumber inputModal"
              autoComplete="off" min={0} max="21" required/>
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
            </div>
            <button type="submit" className="btnModal">Criar curso</button>
          </form>
        </div>
      </div>
    </div>
    {/* <div style={{position: "fixed", inset: 0, background: "transparent", zIndex: 8, display: showModal ? "block" : "none"}} onClick={handleCloseModal} ></div> */}
    </>
  )
}