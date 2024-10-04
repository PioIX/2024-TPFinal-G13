"use client"
import clsx from 'clsx';
import styles from './ButtonMensaje.module.css';

/*export default function Button (props){
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}*/


export default function ButtonMensaje ({onClick, text, variant}){
    return(
        <button className={
            clsx({
                [styles.button]: true
            })
        } onClick={onClick}>{text}</button>
    )
}