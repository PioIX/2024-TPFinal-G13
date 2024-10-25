"use client"
import { useEffect, useState } from "react"
export default function Propiedad (props){
    //const archivo = "/images/" + props.src
    //<img src={archivo}/>

    return(
        <article>
            <div key={props.idPropiedad}>
                <p>Nombre de usuario publicante</p>
              <p>Dirección: {props.direccion}</p>
              <p>Tipo: {props.tipoVivienda}</p>
              <p>Para alquilar: {props.alquiler}</p>
              <p>Precio: {props.precio}</p>
            </div>
        </article>
    )
}