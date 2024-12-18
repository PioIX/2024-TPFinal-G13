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


const Registro = () => {
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

    const handleClick = async () => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        const data = {
            nombre: usuario,
            contraseña: contraseña,
            nombreApellido: nombreApellido,
        };

        const response = await fetch('http://localhost:4000/addUsuario',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                },
            body:JSON.stringify(data),
        })
            
        let respuesta = await response.json();
        
        if (respuesta.success == true){
            localStorage.setItem("idUsuario", respuesta.id)
            localStorage.setItem("nombreUsuario", respuesta.nombre)
            alert("Usuario registrado")
            redirigir()
        } else {
            alert("Usuario ya existente")
        }  
    } //REPLACE para que no se registre en el historial, solo vuelve a pag de inicio 

    function redirigir(){
        router.replace("home")
    }

    return(
        <div className={styles.container}>
        <h1 className={styles.h1}>BIENVENIDO A 5411 ESTATE</h1>
        <h1 className={styles.h1}>REGÍSTRESE</h1>
        
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
                <Button className={styles.boton} onClick={handleClick} text="Registro"/>
            </div>
        </div>
    )
}

export default Registro;