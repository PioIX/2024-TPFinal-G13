"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Login from "../../../components/Login";
import Button from "../../../components/Button";
import Propiedad from "../../../components/Propiedad";

export default function propiedades() {
  
  const router = useRouter();
  const [vector, setVector] = useState([]);
  const [imagenes, setImagenes] = useState([]); 
  let isLoaded = false;

  function redirigir(){
    location.href = "/home/propiedades/crearPropiedad?idUsuario=" + localStorage.getItem("idUsuario")
  }

    const getVector = async () => {
      /*const data = {
          id : localStorage.getItem("idUsuario")
      }*/  
      const response = await fetch('http://localhost:4000/propiedades',{
          method:"GET",
          headers: {
              "Content-Type": "application/json",
            },
      })

      //Tengo que usar el await porque la respuesta del servidor es lenta
      const result = await response.json()
      console.log(result)
      setVector(result)
  }


  const getImagenes = async (ç) => {
    /*const data = {
        id : localStorage.getItem("idUsuario")
    }*/  
    const response = await fetch('http://localhost:4000/getImagenes',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    //Tengo que usar el await porque la respuesta del servidor es lenta
    const result = await response.json()
    console.log(result)
    setImagenes(result)
}

  useEffect(() => {
      if(!isLoaded){
          getVector();
          getImagenes()
          isLoaded = true;
      }
  },[]);

  function handleClickPropiedad(idPropiedad) {
    console.log(idPropiedad);
    router.push("propiedades/propiedad?idPropiedad=" + idPropiedad);
  }

  function handleImage(idPropiedad) {
    var imagen64 = imagenes.find(imagen => imagen.idPropiedad == idPropiedad)
    return Object(imagen64).imagen;
  }

  return (
    
    <>
       <div className={styles.contenedor}>
        {
            vector.map((propiedad,index) => (
              <div key={index} className={styles.contenedorPropiedad} onClick={() => handleClickPropiedad(propiedad.idPropiedad)} role="button">   
                  <a onClick={() => {handleClickPropiedad(propiedad.idPropiedad)}}>
                    <Image src={"data:image/jfif;base64," + handleImage(propiedad.idPropiedad)} width={100} height={100} alt="imagen-de-propiedad"></Image>
                  </a>
                  <Propiedad key={index} onClick={() => {handleClickPropiedad(propiedad.idPropiedad)}} idPropiedad={propiedad.idPropiedad} direccion={propiedad.direccion} tipoVivienda={propiedad.tipoVivienda} ambientes={propiedad.ambientes} alquiler={propiedad.alquiler} precio={propiedad.precio}/>
                  
                  <br></br>
                </div>
            ))
        }
      </div>

      <div className={styles.button}>
          <Button className={styles.button} onClick={redirigir} text="Agregar Propiedad" />
        </div>
    </>

  );
}