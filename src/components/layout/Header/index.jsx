import "./style.scss"
import logoNmx from "../../../assets/logo.png"
import { UserCircle } from "phosphor-react"
import { useDatabase } from "../../../context/DatabaseProvider/useDatabase"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserLocalStorage } from "../../../context/AuthProvider/util";


export function Header(){
  const { nameUser, isLoading, setCurrentCourse } = useDatabase();
  const [ sidebarLogout, setSidebarLogout] = useState(false);
  const navigate = useNavigate();
  const user = getUserLocalStorage();

  function showSidebarLogout(){
    if(user){
      setSidebarLogout(!sidebarLogout)
    }
  }

  function handleChangeUnit(){
    setCurrentCourse(null)
    navigate("/redirectUnit")
  }
  
  function signOut(){
    localStorage.clear()
    navigate("/")
  }

  return(
    <header id="headerGlobal">
      <a href="/">
        <img src={logoNmx} alt="logo Novamix Cursos" />
      </a>   
      <div className="userInfo" onClick={showSidebarLogout}>
        <UserCircle id="userCircle" size={32} weight="fill" />
        {isLoading ? <span>Carregando...</span> : <span>{nameUser}</span>}
      </div>
      <>
        <div className={`sidebarLogout ${sidebarLogout ? "showSidebarLogout" : ""}`} >
          <p className="btnSidebarLogout" onClick={handleChangeUnit}>Trocar de unidade</p>
          <p className="btnSidebarLogout" style={{"color": "red"}} onClick={signOut}>Sair</p>
        </div>
        <div style={{position: "fixed", inset: 0, background: "transparent", zIndex: 4, display: sidebarLogout ? "block" : "none"}} onClick={() => {setSidebarLogout(false)}} ></div>
      </>
      
    </header>
    )
}