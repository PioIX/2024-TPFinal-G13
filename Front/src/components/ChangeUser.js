"use client"
// import styles from "./Button.module.css";
import clsx from 'clsx';
import Button from './Button';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Sesión.module.css";
import Text from './Text';


/*export default function Button (props){
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}*/
let idUsuarioActual = parseInt(localStorage.getItem("idUsuario"))

const ChangeUser = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [nombreApellido, setNombreApellido] = useState('');

    // function ponerUsuario (evento){
    //     const valor = evento.target.value;
    //     setUsuario(valor); // Actualiza el valor localmente.
    //     onChange(valor);  // Notifica al componente padre del cambio.
    // }

    // function ponerContra (evento){
    //     const valor = evento.target.value;
    //     setContraseña(valor); // Actualiza el valor localmente.
    //     onChange(valor);  // Notifica al componente padre del cambio.
    // }

    // function ponerNyA (evento){
    //     const valor = evento.target.value;
    //     setNombreApellido(valor); // Actualiza el valor localmente.
    //     onChange(valor);  // Notifica al componente padre del cambio.
    // }

    // useEffect(
    //     function(){
    //     fetch('http://localhost:3008/saludo')
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data)
    //     })
    //     },
    //     [] //Como esta vacio, se ejecuta al principio
    // )



    const router = useRouter();

    const changeUsuario = async () => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        const data = {
            nombre: usuario,
            idUsuario: idUsuarioActual
        };

        const response = await fetch('http://localhost:4000/changeUsuario',{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body:JSON.stringify(data),
        })
            
        let respuesta = await response.json();
                  
        if (respuesta.success == true){
            alert("Nombre de usuario modificado")
            redirigir()
        } else {
            alert("Nombre de usuario ya existente")
        }  
    } //REPLACE para que no se registre en el historial, solo vuelve a pag de inicio 

    const changeContraseña = async () => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        const data = {
            contraseña: contraseña,
            idUsuario: idUsuarioActual
        };

        const response = await fetch('http://localhost:4000/changeContraseña',{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body:JSON.stringify(data),
        })
            
        let respuesta = await response.json();
                  
        if (respuesta.success == true){
            alert("Contraseña modificada")
            redirigir()
        } else {
            alert("Contraseña no modificada")
        }  
    }


    const changeNombreApellido = async () => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        const data = {
            nombreApellido: nombreApellido,
            idUsuario: idUsuarioActual
        };
        console.log(data)

        const response = await fetch('http://localhost:4000/changeNombreApellido',{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                },
            body:JSON.stringify(data),
        })
        console.log(response)
            
        let respuesta = await response.json();
        console.log(respuesta)     
        if (respuesta.success == true){
            alert("Nombre completo modificado")
            redirigir()
        } else {
            alert("Nombre completo no modificado")
        }  
    }

    function redirigir(){
        router.replace("/home/user?idUsuario=" + idUsuarioActual)
    }

    

    return(
        <div className={styles.container}>
        <h1 className={styles.h1}>MODIFICAR USUARIO</h1>
        
            <div className={styles.formGroup}>
                <div className={styles.usuario}>
                    <Text textoH2="Usuario" placeholder="Nombre de Usuario" onChange={setUsuario}></Text>
                </div>
                <div className={styles.password}>
                    <Text textoH2="Contraseña" placeholder="Contraseña" onChange={setContraseña}></Text>
                </div>
                <div className={styles.usuario}>
                    <Text textoH2="Nombre y Apellido" placeholder="Nombre completo" onChange={setNombreApellido}></Text>
                </div>
                <Button className={styles.boton} onClick={changeUsuario} text="Cambiar Nombre de usuario"/>
                
                <Button className={styles.boton} onClick={changeContraseña} text="Cambiar Contraseña"/>
                
                <Button className={styles.boton} onClick={changeNombreApellido} text="Cambiar Nombre completo"/>
            </div>
        </div>
    )
}

export default ChangeUser;