"use client"
// import styles from "./Button.module.css";
import clsx from 'clsx';
import Button from './Button';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../components/AddPropiedad.module.css";
import Input from './Input';
import Checkbox from './Checkbox';
import InputImagen from './InputsImagenes';


/*export default function Button (props){
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}*/


const AddPropiedad = () => {
    const [tipoVivienda, setTipoVivienda] = useState('');
    const [precio, setPrecio] = useState('');
    const [direccion, setDireccion] = useState('');
    const [alquiler, setAlquiler] = useState('');
    const [ambientes, setAmbientes] = useState('');
    const [zona, setZona] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenes, setImagenes] = useState([]);

    const subirImagenes = (event) => {
        if (event.target && event.target.files) {
            const archivos = Array.from(event.target.files);
            setImagenes(archivos);
            
            // Convertir cada imagen a base64
        const promises = archivos.map((archivo) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(archivo);
            });
        });

        // Almacenar las imágenes en base64 cuando se resuelvan todas las promesas
        Promise.all(promises)
            .then((base64Array) => {
                setImagenesBase64(base64Array);
            })
            .catch((error) => {
                console.error("Error al convertir las imágenes a base64:", error);
            });

        } else {
            console.error("No se pudo acceder a los archivos");
        }
        console.log(imagenes)
    };

    // function ponerUsuario (evento){
    //     const valor = evento.target.value;
    //     setUsuario(valor); // Actualiza el valor localmente.
    //     onChange(valor);  // Notifica al componente padre del cambio.
    // }

    // function ponerContra (evento){
    //     const valor = evento.target.value;
    //     setContraseña(valor); // Actualiza el valor localmente.
    //     onChange(valor);  // Notifica al componente padre del cambio.
    // }

    // function ponerNyA (evento){
    //     const valor = evento.target.value;
    //     setNombreApellido(valor); // Actualiza el valor localmente.
    //     onChange(valor);  // Notifica al componente padre del cambio.
    // }

    // useEffect(
    //     function(){
    //     fetch('http://localhost:3008/saludo')
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data)
    //     })
    //     },
    //     [] //Como esta vacio, se ejecuta al principio
    // )

    function checkValue(event){
        const value = event.target.checked;
        setAlquiler(value)
    }

    const router = useRouter();

    const handleClick = async () => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        console.log("inicio funcion")
        const data = {
            tipoVivienda: tipoVivienda,
            precio: precio,
            direccion: direccion,
            alquiler: alquiler,
            ambientes: ambientes,
            zona: zona,
            descripcion: descripcion,
            idUsuario: localStorage.getItem("idUsuario"),
        };
        console.log(data)

        const response = await fetch('http://localhost:4000/addPropiedad',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                },
            body:JSON.stringify(data),
        })
        
        console.log(response)
        let respuesta = await response.json();
        console.log(respuesta)
        if (respuesta.success == true){
            alert("Propiedad agregada")
            redirigir()
        } else {
            alert("Propiedad ya existente")
        }  
    } //REPLACE para que no se registre en el historial, solo vuelve a pag de inicio 

    function redirigir(){
        location.href = "/home/propiedades"
    }

    return(

        <div className={styles.container}>
        <h1 className={styles.h1}>AGREGAR PROPIEDAD</h1>
        
            <div className={styles.formGroup}>
                <div className={styles.usuario}>
                    <h2>Tipo de vivienda:</h2>
                    <Input 
                        type="text" 
                        placeholder="Tipo de vivienda" 
                        onChange={setTipoVivienda} 
                    />
                </div>

                <div className={styles.usuario}>
                    <h2>Precio en Dólares:</h2>
                    <Input 
                        type="number" 
                        placeholder="Precio" 
                        onChange={setPrecio} 
                    />
                </div>

                <div className={styles.usuario}>
                    <h2>Dirección:</h2>
                    <Input 
                        type="text" 
                        placeholder="Dirección" 
                        onChange={setDireccion} 
                    />
                </div>

                <div className={styles.usuario}>
                    <h2>¿Es alquiler?</h2>
                    <Checkbox 
                        onChange={checkValue} 
                    />
                </div>

                <div className={styles.usuario}>
                    <h2>Cantidad de ambientes:</h2>
                    <Input 
                        type="number" 
                        placeholder="Ambientes" 
                        onChange={setAmbientes} 
                    />
                </div>

                <div className={styles.usuario}>
                    <h2>Zona:</h2>
                    <Input 
                        type="text" 
                        placeholder="Zona" 
                        onChange={setZona} 
                    />
                </div>

                <div className={styles.usuario}>
                    <h2>Descripción:</h2>
                    <Input 
                        type="text" 
                        placeholder="Descripción" 
                        onChange={setDescripcion} 
                    />
                </div>

                <div className={styles.usuario}>
                    <h2>Subir imagenes:</h2>
                        <InputImagen onChange={subirImagenes}/>
                </div>
                {imagenes.length > 0 ? (
                    imagenes.map((img, index) => (
                        <p key={index}>{img.name}</p>
                    ))
                ) : (
                    <p>No hay imágenes seleccionadas.</p>
                )}

                <Button className={styles.boton} onClick={handleClick} text="Publicar"/>
            </div>
        </div>
    )
}

export default AddPropiedad;