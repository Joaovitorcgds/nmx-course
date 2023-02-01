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
            <button id="1" className='btnUnityRedirectAdm' onClick={handleNavigateAdm}>Unidade Novamix Campinho</button>
            <button id="2" className='btnUnityRedirectAdm' onClick={handleNavigateAdm}>Unidade Novamix Teresópolis</button>
            <button id="3" className='btnUnityRedirectAdm' onClick={handleNavigateAdm}>Unidade Novamix Prado</button>
          </div>
        </div>
      </div>

    </>
  )
}