"use client"
export default function Perfil ({nombre, imgSrc, descripcion}){
    return (
        <div className="perfil">
            <img src={imgSrc} />
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
        </div>
    );
};