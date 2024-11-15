"use client"
import { useEffect, useState } from "react"
export default function Usuarios (props){
    //const archivo = "/images/" + props.src
    //<img src={archivo}/>

    if (props.alquiler == 1){
        var alquiler = "SI"
    } else {
        var alquiler = "NO"
    }

    return(
        <article onClick={props.onClick}>
            <div key={props.idUsuario}>
              <p>Id: {props.idUsuario}</p>
              <p>Nombre: {props.nombre}</p>
              <p>Contraseña: {props.contraseña}</p>
              <p>Nombre Completo: {props.nombreApellido}</p>
            </div>
        </article>
    )
}