import "./style.scss"
import { useForm } from "react-hook-form"

export function AsideStudent({showAsideStudent}){
  const {register, handleSubmit} = useForm();

  return(
    <div className={`asideStudent ${!showAsideStudent ? "closeAsideStudent" : ""}`}>
      <h2>Inscrever aluno</h2>
      <p>Cadeira 1</p>
      <div className="separatorInAsideStudents">&frasl; &frasl;</div>
      <form id="formAsideStudent">
        <div className="textFieldStudents">
          <label htmlFor="name">Nome do aluno</label>
          <input type="text" {...register("name")} autoComplete="off" required className="inputModal"/>
        </div>
        <div className="textFieldStudents">
          <label htmlFor="name">Telefone</label>
          <input type="text" {...register("telephone")} autoComplete="off" required className="inputModal"/>
        </div>
        <div className="textFieldStudents">
          <label htmlFor="name">Número do comprovante</label>
          <input type="text" {...register("payment_voucher")} autoComplete="off" required className="inputModal"/>
        </div>
      </form>
    </div>
  )
}