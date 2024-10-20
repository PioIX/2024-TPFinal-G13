"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Login from "../../../components/Login";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import ButtonMensaje from "../../../components/ButtonMensaje";
import Chat from "../../../components/Chat";
import styles from "./equipo.modules.css";
import Perfil from "../../../components/Perfil";


const App = () => {
    
    const perfiles= [
        { imgSrc: '/toma.jpeg', Text: 'Tomas Maraval', descripcion: 'Jefe de Equipo. Han pasado más de quince años desde que inicié mi camino en el sector inmobiliario, comenzando como asesor y ascendiendo gradualmente hasta ocupar el cargo de jefe de equipo. Durante esta trayectoria, he tenido la fortuna de liderar grupos apasionados y comprometidos, siempre enfocados en brindar el mejor servicio a nuestros clientes. Mi experiencia ha estado marcada por la constante adaptación a un mercado en evolución. He trabajado en diversas áreas, desde la comercialización de propiedades hasta el desarrollo de estrategias de venta efectivas. Cada desafío ha sido una oportunidad para crecer y aprender.Con el tiempo, he formado un equipo sólido, donde cada miembro aporta su singularidad y talento. Juntos, nos hemos enfrentado a grandes proyectos y hemos celebrado numerosos logros, siempre con la vista puesta en la excelencia. Hoy, como líder, mi objetivo es inspirar y motivar a mi equipo, promoviendo un ambiente de trabajo colaborativo y enriquecedor, donde cada uno pueda aportar lo mejor de sí mismo en el fascinante mundo de los Bienes Raíces.', nombre: "Tomas Maraval"},
        { imgSrc: '/tano.jpeg', Text: 'Santiago Ezequiel Salerno', descripcion: 'Asesor Inmobiliario 1 Desde que comencé mi carrera en el sector inmobiliario hace más de una década, he tenido el privilegio de ayudar a numerosas familias a encontrar su hogar ideal. Mi pasión por las propiedades se inició en mis primeros días como asesor, cuando descubrí la satisfacción que genera acompañar a las personas en una de las decisiones más importantes de su vida. A lo largo de los años, he aprendido a entender las necesidades de mis clientes, brindando un servicio personalizado y profesional. Me he especializado en la venta de propiedades residenciales, y cada experiencia me ha enriquecido, no solo en conocimientos, sino también en la creación de vínculos duraderos. Con una formación continua y un enfoque en las tendencias del mercado, me esfuerzo por ser un referente en el sector, siempre dispuesto a ayudar y a superar las expectativas de mis clientes. Hoy en día, cada nuevo desafío se convierte en una oportunidad para seguir creciendo en esta apasionante profesión. ', nombre: "Santiago Ezequiel Salerno"},
        { imgSrc: '/juan.jpeg', Text: 'Juan cruz Alvarez', descripcion: 'Asesor Inmobiliario 2 Han pasado varios años desde que decidí adentrarme en el sector inmobiliario, motivado por el deseo de conectar personas con su lugar en el mundo. Desde mis primeros días como asesor, he trabajado incansablemente para entender las necesidades y deseos de mis clientes, lo que me ha permitido guiarlos en su búsqueda de propiedades. Mi enfoque se basa en la confianza y la transparencia, elementos fundamentales en mi relación con los clientes. A lo largo de mi carrera, he tenido el privilegio de ayudar a compradores y vendedores a cerrar tratos significativos, siempre buscando la mejor solución para cada situación. Gracias a mi dedicación y a la formación continua, he podido especializarme en propiedades comerciales y residenciales. Mi compromiso es brindar un servicio excepcional y ser un apoyo en cada paso del proceso, convirtiendo la compra o venta de una propiedad en una experiencia positiva y enriquecedora. ', nombre: "Jaun Cruz Alvarez"},
        { imgSrc: '/nahcoi.jpeg', Text: 'Ignacio Gabriel Ruiz', descripcion: 'Community Manager Desde que comencé mi trayectoria como community manager en el sector inmobiliario, he sido testigo de cómo las redes sociales han transformado la forma en que nos comunicamos y conectamos con nuestros clientes. Mi pasión por la tecnología y el marketing digital me llevó a este campo, donde he podido fusionar mi amor por la comunicación con el mundo de los Bienes Raíces. Durante estos años, he trabajado en la creación de estrategias efectivas que destacan las propiedades y conectan a los clientes con su futuro hogar. Mi enfoque se centra en construir una comunidad sólida y generar contenido relevante que informe y eduque a nuestro público. Cada día, busco nuevas formas de interactuar con nuestros seguidores, respondiendo a sus inquietudes y compartiendo historias que reflejan la esencia de nuestras propiedades. Hoy, sigo aprendiendo y adaptándome a un entorno en constante cambio, siempre con el objetivo de brindar un servicio excepcional. ', nombre: "Ignacio Gabriel Ruiz"},
        { imgSrc: '/lucas.jpeg', Text: 'Lucas Agustin Helueni', descripcion: 'Inversionista Han pasado más de diez años desde que decidí invertir en el sector inmobiliario, un camino que ha sido tanto desafiante como gratificante. Mi interés por los bienes raíces comenzó como una curiosidad, que rápidamente se convirtió en una pasión por la inversión y el desarrollo de propiedades. A lo largo de mi trayectoria, he aprendido a analizar el mercado, identificar oportunidades y gestionar riesgos. He tenido la fortuna de trabajar en proyectos que no solo han sido financieramente exitosos, sino que también han contribuido al desarrollo de comunidades locales. Hoy, como inversionista, busco continuamente nuevas oportunidades que me permitan diversificar mi cartera y maximizar el valor de mis inversiones. Mi objetivo es crear un impacto positivo a través de proyectos que mejoren la calidad de vida de las personas, mientras sigo explorando este apasionante mundo. ', nombre: "Lucas Agustin Helueni"},
        { imgSrc: '/agus.jpeg', Text: 'Agustin Nahuel Rodreiguez Carrera', descripcion: 'Actuario Desde el inicio de mi carrera como actuario, he estado profundamente involucrado en el análisis de riesgos y la evaluación financiera dentro del sector inmobiliario. Con más de ocho años de experiencia, mi trabajo consiste en proporcionar información y estrategias que respalden la toma de decisiones en proyectos de inversión. A lo largo de los años, he desarrollado un enfoque analítico que me permite identificar tendencias y oportunidades dentro del mercado. Mi compromiso con la precisión y la rigurosidad en mi trabajo ha sido fundamental para ayudar a las empresas a gestionar sus recursos de manera eficiente. Hoy, sigo aprendiendo y perfeccionando mis habilidades, convencido de que el análisis de datos es crucial para el éxito en el sector inmobiliario. Mi objetivo es seguir aportando valor a través de un enfoque basado en datos que permita a los inversores tomar decisiones informadas y estratégicas. ', nombre: "Agustin Nahuel Rodriguez Carrera"},
    ];

    return (
        <div className="container">
            {perfiles.map((perfil) => (
                <Perfil
                    key={perfil.nombre}
                    imgSrc={perfil.imgSrc}
                    nombre={perfil.nombre} // Asegúrate de pasar el nombre aquí
                    descripcion={perfil.descripcion}
                />
            ))}
        </div>
    );
};

export default App;

