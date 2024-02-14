import "./style.scss"
import { useNavigate } from "react-router-dom";

export default function RedirectUnity(){
  const navigate = useNavigate();

  function handleNavigateAdm(e){
    const element = e.target
    const idAttribute = element.getAttribute("id");
    navigate(`/${idAttribute}/adm/course`)
  }

  return (
    <>
      <div className="containerModalRedirect">
        <div className="contentModalRedirect">
          <h1>Qual unidade você deseja entrar</h1>
          <div className="containerBtn">
            <button id="1" className='btnUnityRedirectAdm' onClick={handleNavigateAdm}>Sala de Aula 1</button>
            <button id="2" className='btnUnityRedirectAdm' onClick={handleNavigateAdm}>Sala de Aula 2</button>
            <button id="3" className='btnUnityRedirectAdm' onClick={handleNavigateAdm}>Sala de Aula 3</button>
          </div>
        </div>
      </div>

    </>
  )
}