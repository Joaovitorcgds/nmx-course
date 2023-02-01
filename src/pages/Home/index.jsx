import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"

import "./style.scss"
import { UserCircle } from "phosphor-react"
import logo from "../../assets/logo.png"
import illustration from "../../assets/ilustracao.png"
import { useEffect } from "react";

export default function Home(){
  const navigate = useNavigate();
  const { setCurrentCourse } = useDatabase()

  function handleNavigate(e){
    const element = e.target
    const idAttribute = element.getAttribute("id");
    navigate(`${idAttribute}/courses`)
  }

  useEffect(() => {
    setCurrentCourse()
  },[])

  return(
    <div id='login-page'>
      <button className="btnLogin" onClick={() => navigate("/login")}>
        <UserCircle size={32} weight="fill" />
      </button>
      <aside id="asideSignIn">
        <img src={illustration} alt='ilustracao de gerenciamento de tempo'/>
        <strong>Veja o cronograma dos cursos aqui.</strong>
      </aside>

      <main id="mainSignIn">
        <div className='contentSignIn'>
          <img src={logo} alt="Logo Nova Mix" />

          {screen.width < "791" ? <p>Veja o cronograma dos cursos aqui.</p> : <span></span>}
          
          <div className="separator">Selecione a unidade de sua preferência</div>

          <button id="1" className='btnUnity' onClick={handleNavigate}>Unidade Novamix Campinho</button>
          <button id="2" className='btnUnity' onClick={handleNavigate}>Unidade Novamix Teresópolis</button>
          <button id="3" className='btnUnity' onClick={handleNavigate}>Unidade Novamix Prado</button>
        </div>
      </main>
    </div>
  )
}