import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react"

import { auth } from "../../services/firebase";
import { useDatabase } from "../DatabaseProvider/useDatabase";
import { getUserLocalStorage, setUserLocalStorage } from "./util";

export const AuthContext = createContext({})

export function AuthContextProvider({children}){
  const [user, setUser] = useState();
  const { getKeyOnFirebase } = useDatabase();

  useEffect(() => {
    const user = getUserLocalStorage();

    if(user){
      setUser(user)
    }
  }, [])


  async function signIn(email, password){
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const data = userCredential.user;
      
      if(data.uid == "YtP9RTCncmVIEdARVmPQsDWbJkr1"){
        const payload = {token: data.uid, email, name: "Novamix Campinho"}
        setUser(payload)
        setUserLocalStorage(payload)
        getKeyOnFirebase(payload)
      }else{
        const payload = {token: data.uid, email}
        setUser(payload)
        setUserLocalStorage(payload)
        getKeyOnFirebase(payload)
      }

    })
    .catch((error) => {
      const errorMessage = error.message;
      throw new Error(errorMessage)
    });
  }
  

 function logout(){
  setUser(null)
  setUserLocalStorage(null)
 }

  return (
    <AuthContext.Provider value= {{...user, signIn, logout}}>
      {children}
    </AuthContext.Provider>
  )

}