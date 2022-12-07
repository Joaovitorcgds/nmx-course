import { useContext } from "react";
import { DatabaseContext } from ".";

export function useDatabase(){
  const context = useContext(DatabaseContext);
  return context
}