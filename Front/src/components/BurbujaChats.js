"use client"
import styles from "./Chat.module.css";

export default function BubbleChat ({idChat, nombre}){
    return(
        <div className={styles.chatItem}>
            <span>{nombre}</span>
        </div>        
    )
}