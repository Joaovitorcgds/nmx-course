import { getUserLocalStorage } from "../../context/AuthProvider/util"

export function ProtectedLayout({children}){
  const user  = getUserLocalStorage();

  if(!user){
    return <h2>You don't have acess</h2>
  }

  return children;

}