"use client"
import styles from "./Checkbox.module.css";
import clsx from 'clsx';

export default function Checkbox ({onChange}){
    return(
        <>
            <label className={styles.checkbox}>
            <input type="checkbox" onChange={onChange}></input>
            <span></span> 
            </label>
        </>
    )
}