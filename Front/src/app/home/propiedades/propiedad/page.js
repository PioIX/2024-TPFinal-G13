"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import ImageCarousel from "../../../../components/ImagenCarrusel";
import VerPropiedad from "../../../../components/VerPropiedad";
import ButtonChat from "../../../../components/ButtonChat";

export default function Propiedades() {
  const [vector, setVector] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();

  const getVector = async (id) => {
    const response = await fetch(`http://10.1.5.140:4000/propiedad?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    setVector(result[0]);
  };

  const getImagenes = async (id) => {
    const response = await fetch(`http://10.1.5.140:4000/getImagenes?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    setImagenes(result);
  };

  const deletePropiedad = async () => {
    try {
      const response = await fetch(`http://10.1.5.140:4000/deletePropiedad?idPropiedad=${vector.idPropiedad}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Propiedad Eliminada");
        router.replace("/home/propiedades");
      } else {
        alert("Error al eliminar la propiedad");
      }
    } catch (error) {
      console.error("Error eliminando la propiedad:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("idPropiedad");

    if (id) {
      getVector(id);
      getImagenes(id);
    }

    // Validar usuario actual
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const idUsuarioLS = parseInt(localStorage.getItem("idUsuario"));

    setIsAdmin(nombreUsuario === "admin");
    setIsOwner(vector && idUsuarioLS === parseInt(vector.idUsuario));
  }, [vector]);

  if (!vector) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className={styles.nuevaProp}>
        <ImageCarousel images={imagenes} />
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
      </div>

      <div className={styles.ButtonChat}>{/* Botones de administrador y propietario */}
      {isAdmin && (
        <ButtonChat onClick={deletePropiedad} text={"Eliminar Publicación"} />
      )}
      {isOwner && (
        <ButtonChat onClick={deletePropiedad} text={"Eliminar Publicación"} />
      )}
      </div>
    </>
  );
}
