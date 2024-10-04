"use client"
import clsx from 'clsx';
import styles from './Button.module.css';

/*export default function Button (props){
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}*/


export default function Button ({onClick, text, variant}){
    return(
        <button className={
            clsx({
                [styles.button]: true
            })
        } onClick={onClick}>{text}</button>
    )
}