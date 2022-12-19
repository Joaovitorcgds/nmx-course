import { createContext, useState } from "react"
import { supabase } from "../../service/supabase"

export const AuthContext = createContext({})

export function AuthContextProvider({children}){
  const [user, setUser] = useState({});

  // async function signIn(email, password){
  //   let { data, error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password
  //   })

  //   if (error){
  //     setError(error)
  //     throw error
  //   }

  //   setUser({
  //   email: data.user.email, 
  //   uid: data.user.id 
  //   })
  // }

  return (
    <AuthContext.Provider value= {{ user }}>
      {children}
    </AuthContext.Provider>
  )
}