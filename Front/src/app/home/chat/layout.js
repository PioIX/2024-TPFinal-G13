"use client"
import { useSocket } from "../../../hooks/useSocket"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Button from "../../../components/Button";
import Login from "../../../components/Login";
import Text from "../../../components/Text";
import ButtonMensaje from "../../../components/ButtonMensaje";
import Chat from "../../../components/Chat";

export default function mensajes() {
  
  const router = useRouter();

  return (
    //<>
    //<div className={styles.chatContainer}>
    //  <Chat></Chat>
    //</div>
    //</>
    <>
      <div className={styles.container}>
      
      <div className={styles.contactos}>
      </div>
      <div className={styles.chatContainer}>
        <Chat/>
      
      </div>
      </div>
    </>
  );
}
