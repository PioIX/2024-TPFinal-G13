"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../page.modules.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Login from "../../../components/Login";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import ButtonMensaje from "../../../components/ButtonMensaje";
import Chat from "../../../components/Chat";
import VerPropiedad from "../../../components/VerPropiedad";
import VerUsuario from "../../../components/VerUsuario";

export default function Usuario() {
  const [vector, setVector] = useState(null);
  const [idUsuario, setIdUsuario] = useState(-1);
  const router = useRouter();

  const getVector = async (id) => {
    const response = await fetch(`http://localhost:4000/user?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    setVector(result[0]);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("idUsuario");

    if (id) {
      setIdUsuario(parseInt(id, 10)); // Convertir a número
      getVector(id);
    }
  }, []);

  return (
    <div className={styles.container}>
      {console.log(vector)}
      <VerUsuario nombre={vector.nombre} contraseña={vector.contraseña} nombreApellido={vector.nombreApellido}></VerUsuario>
    </div>
  );
}