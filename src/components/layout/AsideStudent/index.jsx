import "./style.scss"
import { useState } from "react";
import { useForm } from "react-hook-form"
import {Switch, Button} from '@mui/material';

export function AsideStudent({showAsideStudent, setShowAsideStudent, idChair}){
  const {register, handleSubmit} = useForm();
  const [checkedPaid, setCheckedPaid] = useState(false);
  const [checkedPresent, setCheckedPresent] = useState(false);

  const handleChangePaid= (e) => setCheckedPaid(e.target.checked);
  const handleChangePresent = (e) => setCheckedPresent(e.target.checked);

  function unsubscribeStudent(){
    const allInputs = document.querySelectorAll(".inputAside")

    allInputs.forEach((input) => {
      input.value = ""
    })

    setCheckedPaid(false)
    setCheckedPresent(false)
    setShowAsideStudent(false)
  }

  return(
    <div className={`asideStudent ${!showAsideStudent ? "closeAsideStudent" : ""}`}>
      <h2>Inscrever aluno</h2>
      <p>Cadeira # {idChair}</p>
      <div className="separatorInAsideStudents">&frasl; &frasl;</div>
      <form id="formAsideStudent">
        <div className="textFieldStudents">
          <label htmlFor="name">Nome do aluno</label>
          <input type="text" {...register("name")} autoComplete="off" required className="inputAside"/>
        </div>
        <div className="textFieldStudents">
          <label htmlFor="name">Telefone</label>
          <input type="text" {...register("telephone")} autoComplete="off" required className="inputAside"/>
        </div>
        <div className="textFieldStudents">
          <label htmlFor="name">Número do comprovante</label>
          <input type="text" {...register("payment_voucher")} autoComplete="off" required className="inputAside"/>
        </div>
        <div className="booleanStudents">
          <label htmlFor="name">Está pago</label>
          <Switch
            checked={checkedPaid}
            onChange={handleChangePaid}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <div className="booleanStudents">
          <label htmlFor="name">Está presente</label>
          <Switch
            checked={checkedPresent}
            onChange={handleChangePresent}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <div className="containerBtn">
          <Button variant="outlined" onClick={unsubscribeStudent}>Cancelar</Button>
          <Button variant="contained" type="submit">Inscrever</Button>
        </div>
      </form>
    </div>
  )
}