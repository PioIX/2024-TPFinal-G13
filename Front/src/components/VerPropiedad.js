"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonChat from "./ButtonChat";

export default function VerPropiedad(props) {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Convertir `alquiler` en texto
  const alquiler = props.alquiler == 1 ? "SI" : "NO";

  const getVector = async () => {
    let url = `http://localhost:4000/nombreUsuario?idUsuario=${props.idUsuario}` 
    console.log(url)    
    const response = await fetch(`http://localhost:4000/nombreUsuario?idUsuario=${props.idUsuario}`,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    //Tengo que usar el await porque la respuesta del servidor es lenta
    const result = await response.json()
    
    setNombre(result[0].nombre)
    // console.log(vector)
}

  const deletePropiedad = async () => {
    try {
      const response = await fetch(`http://localhost:4000/deletePropiedad?idPropiedad=${props.idPropiedad}`, {
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
    getVector();

    // Validar usuario actual
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const idUsuarioLS = parseInt(localStorage.getItem("idUsuario"));

    setIsAdmin(nombreUsuario === "admin");
    setIsOwner(idUsuarioLS === parseInt(props.idUsuario));
  }, [props.idUsuario]);

  return (
    <>
      <article>
        <div key={props.idPropiedad}>
          <p>Dirección: {props.direccion}</p>
          <p>Tipo de vivienda: {props.tipoVivienda}</p>
          <p>Para alquilar: {alquiler}</p>
          <p>Ambientes: {props.ambientes}</p>
          <p>Zona: {props.zona}</p>
          <p>Descripción: {props.descripcion}</p>
          <p>Precio: {props.precio}</p>
          <p>Nombre de usuario publicante: {nombre}</p>
        </div>
      </article>

      {isAdmin && <ButtonChat onClick={deletePropiedad} text={"Eliminar Publicación"} />}
      {isOwner && <ButtonChat onClick={deletePropiedad} text={"Eliminar Publicación"} />}
    </>
  );
}
