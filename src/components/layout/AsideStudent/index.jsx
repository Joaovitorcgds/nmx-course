import "./style.scss"
import { useState } from "react";
import { useForm } from "react-hook-form"
import {Switch, Button} from '@mui/material';
import { supabase } from "../../../service/supabase";
import { useDatabase } from "../../../context/DatabaseProvider/useDatabase";
import { useEffect } from "react";

export function AsideStudent({showAsideStudent, setShowAsideStudent, idChair}){
  const {register, handleSubmit, setValue, getValues} = useForm();
  const [checkedPaid, setCheckedPaid] = useState(false);
  const [checkedPresent, setCheckedPresent] = useState(false);
  const [ isDisabled, setIsDisabled] = useState(false)
  const { currentCourse, listStudentsDB, setListStudentsDB, currentStudent } = useDatabase();
  
  const handleChangePaid= (e) => setCheckedPaid(e.target.checked);
  const handleChangePresent = (e) => setCheckedPresent(e.target.checked);
  
  function clearInputAsideStudent(){
    const allInputs = document.querySelectorAll(".inputAside")
    
    allInputs.forEach((input) => {
      input.value = ""
    })
    
    setCheckedPaid(false)
    setCheckedPresent(false)
    setShowAsideStudent(false)
  }
  
  function updateState(e){
    const newState = listStudentsDB.map(obj => {
      if(obj.id === Number(idChair)){
        return {...obj, 
          name: e.name,
          telephone: Number(e.telephone),
          payment_voucher: e.payment_voucher,
          is_paid: checkedPaid,
          is_present: checkedPresent
        }
      }
      
      return obj;
    })
    
    console.log(newState)
    setListStudentsDB(newState)
  }
  
  async function updateStudent(){
    const { error } = await supabase
    .from('students')
    .update({ is_paid: checkedPaid, 
      is_present: checkedPresent, 
      payment_voucher: getValues("payment_voucher")})
    .eq('id', Number(idChair))
    .eq("id_courses", currentCourse.id)
    
    if(error){
      throw error;
    }
    
    const newState = listStudentsDB.map(obj => {
      if(obj.id === Number(idChair)){
        return {...obj, 
          is_paid: checkedPaid,
          is_present: checkedPresent,
          payment_voucher: getValues("payment_voucher") || null
        }
      }
      return obj;
    })
    
    console.log(newState)
    setListStudentsDB(newState)
    setShowAsideStudent(false)
  }
  
  async function handleSendStudents(e){

    if(currentCourse.is_cancelled){
      window.alert("Não é possível adicionar aluno em curso cancelado")
      setShowAsideStudent(false)
      return;
    }
    const { error } = await supabase
    .from('students')
    .insert({
      id: Number(idChair),
      id_courses: currentCourse.id,
      name: e.name,
      telephone: e.telephone,
      payment_voucher: e.payment_voucher || null,
      is_paid: checkedPaid,
      is_present: checkedPresent
    })
    
    if(error){
      throw error
    }
    
    clearInputAsideStudent()
    updateState(e)
    setShowAsideStudent(false)
  }
  
  useEffect(() => {
    console.log(currentStudent)
    if(currentStudent.isStudent){
      setIsDisabled(true)
      setValue("name", currentStudent.name)
      setValue("telephone", currentStudent.telephone)
      setValue("payment_voucher", currentStudent.payment_voucher)
    }
    setCheckedPaid(currentStudent.is_paid)
    setCheckedPresent(currentStudent.is_present)
  }, [currentStudent])
  
  
  
  useEffect(()=>{
    if(showAsideStudent){
      setShowAsideStudent(false)
    }
  },[currentCourse])
  
  return(
    <div className={`asideStudent ${!showAsideStudent ? "closeAsideStudent" : ""}`}>
    <h2>Inscrever aluno</h2>
    <p>Cadeira # {idChair}</p>
    
    <div className="separatorInAsideStudents">&frasl; &frasl;</div>
    
    <form id="formAsideStudent" onSubmit={handleSubmit(handleSendStudents)}>
      <div className="textFieldStudents">
        <label htmlFor="name">Nome do aluno</label>
        <input type="text" {...register("name", {required: true})} autoComplete="off" required className="inputAside" disabled={currentStudent.isStudent}/>
      </div>
      <div className="textFieldStudents">
        <label htmlFor="name">Telefone</label>
        <input type="number" {...register("telephone", {required: true})} maxLength="11" required autoComplete="off" className="inputAside inputNumber" disabled={currentStudent.isStudent}/>
      </div>
      <div className="textFieldStudents">
        <label htmlFor="name">Número do comprovante</label>
        <input type="number" {...register("payment_voucher")} autoComplete="off" className="inputAside inputNumber"/>
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
      {currentStudent.isStudent ?
        <div className="containerBtn">
          <Button variant="outlined" onClick={clearInputAsideStudent}>Cancelar</Button>
          <Button variant="contained" type="button" onClick={updateStudent}>Salvar</Button>
        </div>
      :
        <div className="containerBtn">
          <Button variant="outlined" onClick={clearInputAsideStudent}>Cancelar</Button>
          <Button variant="contained" type="submit">Inscrever</Button>
        </div>
      }
    </form>
    </div>
    )
  }