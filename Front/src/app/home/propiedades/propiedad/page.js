"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../../page.modules.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../../components/Registro";
import Login from "../../../../components/Login";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import ButtonMensaje from "../../../../components/ButtonMensaje";
import Chat from "../../../../components/Chat";
import VerPropiedad from "../../../../components/VerPropiedad";
import ButtonChat from "../../../../components/ButtonChat";

export default function Propiedades() {
  const [idPropiedad, setIdPropiedad] = useState(-1);
  const [vector, setVector] = useState(null);
  const router = useRouter();

  const getVector = async (id) => {
    const response = await fetch(`http://localhost:4000/propiedad?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    setVector(result[0]);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("idPropiedad");

    if (id) {
      setIdPropiedad(parseInt(id, 10)); // Convertir a número
      getVector(id);
    }
  }, []);

  if (!vector) {
    return <div>Cargando...</div>;
  }

  function redirigir(){
    router.push("home/propiedades/propiedad/modificar")
  }

  return (
    <div className={styles.container}>
      {console.log(vector)}
      <VerPropiedad 
        idPropiedad={vector.idPropiedad}
        direccion={vector.direccion}
        tipoVivienda={vector.tipoVivienda}
        ambientes={vector.ambientes}
        alquiler={vector.alquiler}
        precio={vector.precio}
        zona={vector.zona}
        descripcion={vector.descripcion}
      />
      { vector.idUsuario == localStorage.getItem("idUsuario") &&
        <ButtonChat onClick={redirigir} text={"Modificar Publicación"}/>
      }
    </div>
  );
}