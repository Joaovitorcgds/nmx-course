import { createContext, useState } from "react"
// import { supabase } from "../../service/supabase"

export const AuthContext = createContext({})

export function AuthContextProvider({children}){
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value= {{ }}>
      {children}
    </AuthContext.Provider>
  )
}