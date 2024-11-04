"use client"
import { useEffect, useState } from "react"
export default function VerPropiedad (props){
    //const archivo = "/images/" + props.src
    //<img src={archivo}/>

    if (props.alquiler == 1){
        var alquiler = "SI"
    } else {
        var alquiler = "NO"
    }
    let idUsuario = parseInt(props.idUsuario)
    console.log("hola", props)
    const [vector, setVector] = useState([])
    const [nombre, setNombre] = useState("")

    const getVector = async () => {
       
        const response = await fetch('http://localhost:4000/nombreUsuario?idUsuario='+ idUsuario,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
              },
        })
  
        //Tengo que usar el await porque la respuesta del servidor es lenta
        const result = await response.json()
        console.log("Result:" + result.nombreUsuario)
        setNombre(result.nombreUsuario)
        console.log(vector)
    }

    useEffect(() => {
        getVector();
        
      }, []);

    return(
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
    )
}