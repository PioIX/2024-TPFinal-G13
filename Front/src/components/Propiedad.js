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

    return (
        <article onClick={props.onClick}>
          <div key={props.idPropiedad}>
            <p>
              <strong>Dirección:</strong> {props.direccion}
            </p>
            <p>
              <strong>Tipo de vivienda:</strong> {props.tipoVivienda}
            </p>
            <p>
              <strong>Ambientes:</strong> {props.ambientes}
            </p>
            <p>
              <strong>Para alquilar:</strong> {alquiler}
            </p>
            <p>
              <strong>Precio:</strong> {props.precio}
            </p>
          </div>
        </article>
      );
      
}