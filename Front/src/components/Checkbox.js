"use client"
import styles from "./Checkbox.module.css";
import clsx from 'clsx';

export default function Checkbox ({onChange}){
    return(
        <input type="checkbox" onChange={onChange}></input>
    )
}