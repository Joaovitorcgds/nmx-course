import "./style.scss"
import logoNmx from "../../../assets/logo.png"
import { UserCircle, SignOut } from "phosphor-react"
import { useDatabase } from "../../../context/DatabaseProvider/useDatabase"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserLocalStorage } from "../../../context/AuthProvider/util";


export function Header(){
  const { nameUser } = useDatabase();
  const [ sidebarLogout, setSidebarLogout] = useState(false);
  const navigate = useNavigate();
  const user = getUserLocalStorage();

  function showSidebarLogout(){
    if(user){
      setSidebarLogout(!sidebarLogout)
    }
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
        <span>{nameUser}</span>
      </div>
      <div className={`sidebarLogout ${sidebarLogout ? "showSidebarLogout" : ""}`} >
        <button onClick={signOut} className="btnLogout">
          <span>Sair</span>
          <SignOut size={32} weight="bold" />
        </button>
      </div>
      
    </header>
    )
}