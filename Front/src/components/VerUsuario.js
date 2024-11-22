"use client";
import { useEffect, useState } from "react";

export default function VerUsuario(props) {
  return (
    <article>
      <div key={props.idUsuario}>
        <p><span style={{ fontWeight: "bold" }}>Nombre de Usuario:</span> {props.nombre}</p>
        <p><span style={{ fontWeight: "bold" }}>Contraseña:</span> {props.contraseña}</p>
        <p><span style={{ fontWeight: "bold" }}>Nombre y Apellido:</span> {props.nombreApellido}</p>
      </div>
    </article>
  );
}
