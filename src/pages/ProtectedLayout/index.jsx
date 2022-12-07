import { useAuth } from "../../context/AuthProvider/useAuth"

export function ProtectedLayout({children}){
  const auth = useAuth();
  if(!auth.email){
    return <h2>You don't have acess</h2>
  }

  return children;

}