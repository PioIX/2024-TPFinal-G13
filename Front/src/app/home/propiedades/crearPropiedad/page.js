"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddPropiedad from "../../../../components/AddPropiedad";

export default function App() {
  return (
    <main className={styles.main}>
      <AddPropiedad/>
    </main>
  );
}