"use client"
import { useEffect, useState } from "react"
export default function Propiedad (props){
    //const archivo = "/images/" + props.src
    //<img src={archivo}/>

    if (props.alquiler == 1){
        var alquiler = "SI"
    } else {
        var alquiler = "NO"
    }

    return(
        <article onClick={props.onClick}>
            <div key={props.idPropiedad}>
              <p>Dirección: {props.direccion}</p>
              <p>Tipo de vivienda: {props.tipoVivienda}</p>
              <p>Ambientes: {props.ambientes}</p>
              <p>Para alquilar: {alquiler}</p>
              <p>Precio: {props.precio}</p>
              <p>Nombre de usuario publicante</p>
            </div>
        </article>
    )
}