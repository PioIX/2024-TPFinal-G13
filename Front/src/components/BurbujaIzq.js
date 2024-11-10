"use client"
import styles from "./Chat.module.css";

export default function BubbleLeft ({mensaje}){
    return(
        <div className={styles.bubbleLeft}>{mensaje}</div>
    )
}