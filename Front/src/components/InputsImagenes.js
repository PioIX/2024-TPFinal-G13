"use client"
// import styles from "./Button.module.css";
import clsx from 'clsx';
import Button from './Button';
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./Sesión.module.css";


/*export default function Button (props){
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}*/


export default function InputImagen ({onChange}){
    const inputFileRef = useRef(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {

    }, [inputFileRef]);
    
    function ponerTexto (evento){        
        if(!inputFileRef.current?.files?.length)
            return;

        const formData = new FormData();
        Object.values(inputFileRef.current.files).forEach(file => {
            console.log("FILE",file);
            formData.append('file', file);
        });

        console.log("FORM DATA", formData);


        onChange(formData);  // Notifica al componente padre del cambio.
    }

    return(
        <>
        <div>
            <input className={styles.description} type="file" onChange={ponerTexto} ref={inputFileRef} accept="image/*" multiple />
        </div>
        </>
    )
}