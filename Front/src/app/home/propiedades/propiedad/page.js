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
import ImageCarousel from "../../../../components/ImagenCarrusel";

export default function Propiedades() {
  const [vector, setVector] = useState(null);
  const [imagenes, setImagenes] = useState([])
  const router = useRouter();

  const getVector = async (id) => {
    const response = await fetch(`http://localhost:4000/propiedad?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log("Result:")
    console.log(result)
    setVector(result[0]);
  };

  const getImagenes = async (id) => {
    const response = await fetch(`http://localhost:4000/getImagenes?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json()
    console.log(result)
    setImagenes(result)
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("idPropiedad");
    console.log("Extracted idPropiedad:", id);
    if (id) {
      getVector(id);
      getImagenes(id)
    }
  }, []);
  

  if (!vector) {
    return <div>Cargando...</div>;
  }


  let idPropiedad = parseInt(vector.idPropiedad)
  console.log("idPropiedad es: "+ idPropiedad)
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
        idUsuario={vector.idUsuario}
      />
      
      <ImageCarousel images={imagenes}></ImageCarousel>
    </div>
  );
}