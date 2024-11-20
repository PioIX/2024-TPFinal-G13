"use client"
import styles from "./Chat.module.css";

export default function BubbleRight ({ mensaje, horaEnvio, tics }) {
    return (
        <div style={{ textAlign: 'right', margin: '10px 0' }}>
            <div
                style={{
                    display: 'inline-block',
                    background: '#25d366',
                    color: '#fff',
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
                        color: '#d0f5dc',
                        marginTop: '5px',
                        display: 'block',
                        textAlign: 'right',
                    }}
                >
                    {horaEnvio} {tics} {/* Hora + Tics */}
                </span>
            </div>
        </div>
    );
};