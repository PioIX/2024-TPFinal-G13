"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "./page.module.css";
import Button from "../components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Login from "../components/Login";
import Registro from "../components/Registro";

export default function App() {
  
  /*const [variant, setVariant] = useState("login")*/

  return (
    <main className={styles.main}>
      <Login></Login>
    </main>
  );
}