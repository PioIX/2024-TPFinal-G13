"use client";
import { useState, useEffect } from "react";
import styles from "./VerPropiedad.module.css"

export default function VerPropiedad(props) {
  const [nombre, setNombre] = useState("");

  // Convertir `alquiler` en texto
  const alquiler = props.alquiler == 1 ? "SI" : "NO";

  const getVector = async () => {
    const url = `http://localhost:4000/nombreUsuario?idUsuario=${props.idUsuario}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    setNombre(result[0].nombre);
  };

  useEffect(() => {
    getVector();
  }, [props.idUsuario]);

  return (
    <>
      <article>
        <div key={props.idPropiedad} className={styles.VerPropiedad}>
          <h4>
            <u>Dirección:</u> {props.direccion}
          </h4>
          <h4>
            <u>Tipo de vivienda:</u> {props.tipoVivienda}
          </h4>
          <h4>
            <u>Para alquilar:</u> {alquiler}
          </h4>
          <h4>
            <u>Ambientes:</u> {props.ambientes}
          </h4>
          <h4>
            <u>Zona:</u> {props.zona}
          </h4>
          <h4>
            <u>Descripción:</u> {props.descripcion}
          </h4>
          <h4>
            <u>Precio:</u> {props.precio}
          </h4>
          <h4>
            <u>Nombre de usuario publicante:</u> {nombre}
          </h4>
        </div>
      </article>
    </>
  );
}
