"use client"
// import styles from "./Button.module.css";
import clsx from 'clsx';
import Button from './Button';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Sesión.module.css";


/*export default function Button (props){
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}*/


export default function Input ({type, placeholder, onChange}){

    
    function ponerTexto (evento){
        const valor = evento.target.value;
        onChange(valor);  // Notifica al componente padre del cambio.
    }

    return(
        <>
        <div>
            <input className={styles.description} type={type} placeholder={placeholder} onChange={ponerTexto}></input>
        </div>
        </>
    )
}