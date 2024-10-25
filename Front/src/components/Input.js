"use client"
import clsx from 'clsx';
import styles from './Input.module.css';


export default function Input ({ placeholder }){
    return(
        <input type="text" placeholder={placeholder} className={styles.input} required />
    )
}