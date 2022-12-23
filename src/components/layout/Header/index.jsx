import "./style.scss"
import logoNmx from "../../../assets/logo.png"
import { UserCircle } from "phosphor-react"
import { useDatabase } from "../../../context/DatabaseProvider/useDatabase"



export function Header(){
  const { nameUser } = useDatabase();
  
  return(
    <header id="headerGlobal">
      <img src={logoNmx} alt="logo Novamix Cursos" />
      <div className="userInfo">
        <UserCircle size={32} weight="fill" />
        <span>{nameUser}</span>
      </div>
    </header>
    )
}