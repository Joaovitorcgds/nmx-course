import "./style.scss"
import logoNmx from "../../../assets/logo.png"
import { UserCircle } from "phosphor-react"
import { useAuth } from "../../../context/AuthProvider/useAuth"


export function Header(){
  const { ...user } = useAuth()

  return(
    <header id="headerGlobal">
      <img src={logoNmx} alt="logo Novamix Cursos" />
      <div className="userInfo">
        <UserCircle size={32} weight="fill" />
        <span>{user.name}</span>
      </div>
    </header>
    )
}