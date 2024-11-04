"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../page.modules.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Login from "../../../components/Login";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import ButtonMensaje from "../../../components/ButtonMensaje";
import Chat from "../../../components/Chat";
import VerPropiedad from "../../../components/VerPropiedad";
import VerUsuario from "../../../components/VerUsuario";
import ButtonChat from "../../../components/ButtonChat";

export default function Usuario() {
  const [vector, setVector] = useState(null);
  const [idUsuario, setIdUsuario] = useState(-1);
  const router = useRouter();

  const getVector = async (id) => {
    const response = await fetch(`http://localhost:4000/user?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    const result = await response.json();
    console.log(result)
    
    setVector(result[0]);
    console.log(vector)
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("idUsuario");

    if (id) {
      setIdUsuario(parseInt(id, 10)); // Convertir a número
      getVector(id);
    }
  }, []);

  function redirigir(){
    router.push("user/modificar")
  }

  const deleteUser = async () => { //Links con lógica
    //Metodo push para registrar en el historial el cambio de pantalla
    const data = {
        idUsuario: localStorage.getItem("idUsuario")
    };
    console.log(data)

    const response = await fetch('http://localhost:4000/deleteUsuario',{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
            },
        body:JSON.stringify(data),
    })
    console.log(response)
        
    let respuesta = await response.json();
    console.log(respuesta)     
    if (respuesta.success == true){
        alert("Usuario eliminado correctamente")
        login()
    } else {
        alert("Usuario no eliminado")
    }  
}


function login(){
  router.replace("/")
  localStorage.setItem("idUsuario", 0)
}

  return (
    <div className={styles.container}>
      {console.log(vector)}
      { vector != null &&
        <VerUsuario 
        idUsuario={vector.idUsuario}
        nombre={vector.nombre}
        contraseña={vector.contraseña}
        nombreApellido={vector.nombreApellido}
      />
      }     
      <ButtonChat onClick={redirigir} text={"Modificar Usuario"}/>
      <ButtonChat onClick={deleteUser} text={"Eliminar Usuario"}/>
      
      <ButtonChat onClick={login} text={"Cerrar Sesión"}/>
    </div>
  );
}