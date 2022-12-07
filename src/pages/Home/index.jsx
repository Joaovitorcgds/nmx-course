import { useNavigate } from "react-router-dom";

import "./style.scss"
import { UserCircle } from "phosphor-react"
import logo from "../../assets/logo.png"
import illustration from "../../assets/ilustracao.png"

export default function Home(){
  const navigate = useNavigate();

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
          <div className="separator">Selecione a unidade de sua preferência</div>

          <button className='btnUnity'>Unidade Campinho</button>
          <button className='btnUnity'>Unidade Friburgo</button>
        </div>
      </main>
    </div>
  )
}