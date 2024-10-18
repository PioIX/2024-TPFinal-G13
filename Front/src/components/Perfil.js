"use client"
export default function Perfil ({nombre, imgSrc, Text, descripcion}){
    return (
        <div className="perfil">
            <img src={imgSrc} alt={Text} />
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
        </div>
    );
};