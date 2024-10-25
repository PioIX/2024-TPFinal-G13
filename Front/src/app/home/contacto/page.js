"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Login from "../../../components/Login";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import ButtonMensaje from "../../../components/ButtonMensaje";
import Chat from "../../../components/Chat";
import styles from "../../page.module.css";
import Perfil from "../../../components/Perfil";
import ContactForm from "../../../components/Contacto"; 


const App = () => (
  <>
    <ContactForm />
  </>
);

export default App;