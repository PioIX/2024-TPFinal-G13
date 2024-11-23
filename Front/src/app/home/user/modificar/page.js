"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ChangeUser from "../../../../components/ChangeUser";

export default function App() {
  return (
    <main className={styles.main}>
      <ChangeUser/>
    </main>
  );
}