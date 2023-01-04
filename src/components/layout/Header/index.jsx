import "./style.scss"
import logoNmx from "../../../assets/logo.png"
import { UserCircle } from "phosphor-react"
import { useDatabase } from "../../../context/DatabaseProvider/useDatabase"



export function Header(){
  const { nameUser } = useDatabase();
  
  return(
    <header id="headerGlobal">
      <a href="/">
        <img src={logoNmx} alt="logo Novamix Cursos" />
      </a>
      <div className="userInfo">
        <UserCircle id="userCircle" size={32} weight="fill" />
        <span>{nameUser}</span>
      </div>
    </header>
    )
}