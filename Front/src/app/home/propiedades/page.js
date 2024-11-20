"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../page.modules.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Login from "../../../components/Login";
import Button from "../../../components/Button";
import Propiedad from "../../../components/Propiedad";
import ImageCarousel from "../../../components/ImageCarousel"

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
    //<>
    //<div className={styles.chatContainer}>
    //  <Chat></Chat>
    //</div>
    //</>
    <div className={styles.container}>
      {vector.map((propiedad, index) => (
        <div key={index} className={styles.propiedadCard}>
          <div className={styles.carouselContainer}>
            <ImageCarousel
              images={imagenes.filter((imagen) => imagen.idPropiedad === propiedad.idPropiedad)}
            />
          </div>

          <div className={styles.propertyDetails}>
            <h2>{propiedad.direccion}</h2>
            <p>{propiedad.tipoVivienda} - {propiedad.ambientes} ambientes</p>
            <p>Precio: ${propiedad.precio}</p>
            <button
              onClick={() => handleClickPropiedad(propiedad.idPropiedad)}
              className={styles.propertyButton}
            >
              Ver más detalles
            </button>
          </div>
        </div>
      ))}
    </div>




  );
}