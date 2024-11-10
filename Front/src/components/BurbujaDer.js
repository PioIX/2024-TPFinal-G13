"use client"
import styles from "./Chat.module.css";

export default function BubbleRight ({mensaje}){
    return(
    <div className={styles.bubbleRight}>{mensaje}</div>
    )
}