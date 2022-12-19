import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form" 
import { supabase } from "../../service/supabase"
import { getUserLocalStorage } from "../../context/AuthProvider/util"

import "./style.scss"
import logo from "../../assets/logo.png"
import illustration from "../../assets/ilustracao.png"
import { ArrowCircleLeft} from "phosphor-react"


export default function Login(){
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
   
  async function signIn(e){
    let { error } = await supabase.auth.signInWithPassword({
      email: e.email,
      password: e.password
    })

    if (error){
      setIsError(true)
      throw error
    }
    navigate("/admpage")
  }

  useEffect(() => {
    const user = getUserLocalStorage();
    if(user){
      navigate("/admpage")
    }
  }, [])

  return(
    <div id='login-page'>

      <ArrowCircleLeft size={40} className="btnBackPage" onClick={() => navigate("/")}/>
      
      <aside id="asideSignIn">
        <img src={illustration} alt='ilustracao de gerenciamento de tempo'/>
        <strong>Organize a agenda de cursos com facilidade.</strong>
      </aside>

      <main id="mainSignIn">
        <div className='contentSignIn'>
          <img src={logo} alt="Logo Nova Mix" />
          <div className="separator">Faça o login para continuar</div>

          { isError && <span style={{color: "red"}}> Email/senha incorreto </span>}

          <form id="formLogin" onSubmit={handleSubmit(signIn)}>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} onFocus={() => setIsError(false)} autoComplete="off"
             className="inputLogin"/>

            <label htmlFor="password">Senha</label>
            <input type="password" {...register("password")} onFocus={() => setIsError(false)} autoComplete="off" className="inputLogin"/>
            <button className="btnSignIn" type="submit">Entrar</button>
          </form>
        </div>
      </main>
    </div>
  )
}