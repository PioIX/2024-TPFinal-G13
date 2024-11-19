"use client"
// import styles from "./Button.module.css";
import clsx from 'clsx';
import Button from './Button';
import { useEffect, useState, useRef } from "react";
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
    const [alquiler, setAlquiler] = useState(false);
    const [ambientes, setAmbientes] = useState('');
    const [zona, setZona] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenes, setImagenes] = useState("");

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
        if(value !== true)
            value = false;

        setAlquiler(value)
    }

    const router = useRouter();

    const handleClick = async () => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        console.log("inicio funcion")
        

        
        console.log("alquiler es: " + alquiler)
        let formData = imagenes;
        
        formData.set('tipoVivienda', tipoVivienda);
        formData.set('precio', precio);
        formData.set('direccion', direccion);
        formData.set('alquiler', alquiler);
        formData.set('ambientes', ambientes);
        formData.set('zona', zona);
        formData.set('descripcion', descripcion);
        formData.set('idUsuario', localStorage.getItem("idUsuario"));
        console.log("FORMDATA", formData);

        const response = await fetch('http://localhost:4000/addPropiedad',{
            method:"POST",
            headers: {
                //"Content-Type": "application/json",
                },
            body: formData,
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



    const subirImagenes = async (files) => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        setImagenes(files);
    }


    const getImagen = async () => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        console.log("inicio funcion")

        const response = await fetch('http://localhost:4000/getImagen?idPropiedad='+1,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                },
        })
        console.log(response)
        const result = await response.json()
        console.log(result[0].imagen)
        setImagenes(result[0].imagen)
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
                    <div className="checkbox">
                    <Checkbox 
                        onChange={checkValue} 
                    />
                    </div>
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
                

                <Button className={styles.boton} onClick={handleClick} text="Publicar"/>
                
            </div>
        </div>
    )
}

export default AddPropiedad;