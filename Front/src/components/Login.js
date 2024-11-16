"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Sesión.module.css";
import Button from './Button';
import Text from './Text';
import { Red_Rose } from "next/font/google";
import ButtonChat from "./ButtonChat";
import ButtonRegistrar from "./ButtonRegistrar";

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

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
    
    // useEffect(() => {
    //     fetch('http://localhost:3000/saludo')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data);
    //         });
    // }, []);
    
    const router = useRouter();

    const handleClick = async () => {
        const data = {
            nombre : usuario,
            contraseña: contraseña,
        }
    
        if (data.nombre == "admin" && data.contraseña == 1){
            alert("Administrador logueado")
            router.replace("/home");
        } else {
            const response = await fetch('http://localhost:4000/login',{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(data),
            }) 
            
            let respuesta = await response.json();
            /*if (respuesta == "administrador"){
                alert("Administrador logueado")
                redirigir();
            }
            else*/ 
            console.log(respuesta)
            if (respuesta.success == true){
                localStorage.setItem("idUsuario", respuesta.id)
                localStorage.setItem("nombreUsuario", respuesta.nombre)
                alert("Usuario logueado")
                redirigir()
            } else {
                alert("Los datos son incorrectos")
            }
        }
    }

    function redirigir(){
        router.replace("home")
    }

    function registro(){
        router.push("registro")
    }

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>BIENVENIDO A 5411 ESTATE</h1>
                <h1 className={styles.h1}>INICIE SESIÓN</h1>

                <div className={styles.formGroup}>
                    <div className={styles.usuario}>
                        <Text textoH2="Usuario" placeholder="Nombre de Usuario" onChange={setUsuario}/>
                    </div>
                    <div className={styles.password}>
                        <Text textoH2="Contraseña" placeholder="Contraseña" onChange={setContraseña}/>
                    </div>
                    <div className={styles.button}>
                        <Button className={styles.button} onClick={handleClick} text="Iniciar sesión" />
                    </div>
                    <div className={styles.usuario}>
                        <h3>¿No tienes una cuenta?</h3>
                        <ButtonRegistrar className={styles.buttonMensaje} onClick={registro} text="Regístrate" />
                    </div>
                </div>
            </div>
        </>
    );
}