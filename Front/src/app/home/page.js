// componentes funcionales
"use client"
import { useEffect, useState } from "react"
import styles from "... @/app/home/page.modules.css"
import Button from "../../components/Button";
import Text from "../../components/Text";
import ButtonChat from "../../components/ButtonChat";
import ChatList from "../../components/ChatList";
import { Chicle } from "next/font/google";

export default function layoutHome({children}) {
    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>Conectando personas con sus lugares perfectos.
        </h1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/*<div className={styles.contactos}>
          {contacts.map((contact) => (
            <ChatList name={contact.name}></ChatList>
          ))}
        </div>*/}
        {/* <div className={styles.chatContainer}>
          <Text textoH2="Mensaje" placeholder="Escribir..."></Text>
          <Button text="Enviar" />
        </div> */}
      </div>
    );
  }
