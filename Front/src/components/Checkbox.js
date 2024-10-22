"use client"
import styles from "./Checkbox.module.css";
import clsx from 'clsx';

export default function Checkbox ({onChange}){
    return(
        <div className={styles.checkbox}>
            <input type="checkbox" onChange={onChange}></input>
        </div>
    )
}