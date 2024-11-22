"use client";
import { useState, useEffect } from "react";

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
        <div key={props.idPropiedad}>
          <p>
            <strong>Dirección:</strong> {props.direccion}
          </p>
          <p>
            <strong>Tipo de vivienda:</strong> {props.tipoVivienda}
          </p>
          <p>
            <strong>Para alquilar:</strong> {alquiler}
          </p>
          <p>
            <strong>Ambientes:</strong> {props.ambientes}
          </p>
          <p>
            <strong>Zona:</strong> {props.zona}
          </p>
          <p>
            <strong>Descripción:</strong> {props.descripcion}
          </p>
          <p>
            <strong>Precio:</strong> {props.precio}
          </p>
          <p>
            <strong>Nombre de usuario publicante:</strong> {nombre}
          </p>
        </div>
      </article>
    </>
  );
}
