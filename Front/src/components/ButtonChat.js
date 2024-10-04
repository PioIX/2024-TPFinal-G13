"use client"
import clsx from 'clsx';
import styles from './ButtonChat.module.css';

/*export default function Button (props){
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}*/


const ButtonChat = ({onClick, text, variant}) => {
    return(<button className={
        clsx({
            [styles.button]: true
        })
    } onClick={onClick}>{text}</button>
    )
}

export default ButtonChat