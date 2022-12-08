import { useState } from "react";
import { Header } from "../../components/layout/Header";
import { Aside } from "../../components/layout/Aside";
import { ModalNewRoom } from "../../components/Modal";
import "./style.scss";

export default function AdmRoom(){
  const [showModal, setShowModal] = useState(false);
  return(
    <>
    <Header/>
    <Aside setShowModal={setShowModal}/>
    {showModal ? <ModalNewRoom setShowModal={setShowModal}/> : <span></span>}
    </>
  )
}