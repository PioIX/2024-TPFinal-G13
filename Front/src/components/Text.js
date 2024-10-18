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


export default function Text ({textoH2, placeholder, onChange}){

    const [nombre, setNombre] = useState("")

    function ponerTexto (evento){
        const valor = evento.target.value;
        setNombre(valor); // Actualiza el valor localmente.
        onChange(valor);  // Notifica al componente padre del cambio.
    }

    return(
        <>
        <div>
            <h2>{textoH2}: {nombre}</h2>
        </div>
        <div>
            <input className={styles.description} type="text" placeholder={placeholder} onChange={ponerTexto} value={nombre}></input>
        </div>
        </>
    )
}