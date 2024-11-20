"use client"
import styles from "./Chat.module.css";

export default function BubbleLeft ({ mensaje, horaEnvio}){
    return (
        <div style={{ textAlign: 'left', margin: '10px 0' }}>
            <div
                style={{
                    display: 'inline-block',
                    background: '#e0e0e0',
                    color: '#333',
                    padding: '10px',
                    borderRadius: '10px',
                    maxWidth: '70%',
                    position: 'relative',
                }}
            >
                <p style={{ margin: 0 }}>{mensaje}</p>
                <span
                    style={{
                        fontSize: '12px',
                        color: '#999',
                        marginTop: '5px',
                        display: 'block',
                        textAlign: 'left',
                    }}
                >
                    {horaEnvio}
                </span>
            </div>
        </div>
    );
}; 