"use client"
import { useEffect, useState } from "react"
export default function VerUsuario (props){
    //const archivo = "/images/" + props.src
    //<img src={archivo}/>


    return(
        <article>
            <div key={props.idUsuario}>
              <p>Nombre de Usuario: {props.nombre}</p>
              <p>contraseña: {props.contraseña}</p>
              <p>Nombre y Apellido: {props.nombreApellido}</p>
            </div>
        </article>
    )
}