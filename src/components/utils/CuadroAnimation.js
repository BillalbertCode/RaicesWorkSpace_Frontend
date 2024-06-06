// Componente que crea cuadros atras de un contenedor 
// Este componente es de uso Estetico solo para el diseño
// Cuenta con la creacion del cuadro periodicamente, avalancha de cuadros y eleminacion del mismo
// Hooks
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
// Styles
import stylesCuadrosBg from '@/styles/cuadroAnimation.module.css'

/**
 * 
 * @param {object} containerRef - objeto del contenedo para saber el width de este 
 */
const CuadroAnimation = ({ containerRef }) => {
    const router = useRouter()

    // Cuadrados del fondo del navbar
    const [cuadrosBg, setCuadrosBg] = useState([])

    // Intervalos de la creacion de los cuadros usado en el useEffect
    const [intervalId, setIntervalId] = useState(null);

    // inicializamos para despues darle un valor con el useEffect
    // Esto es para esperar que cargue el DOM para asi asignarle el valo
    let containerWidth

    // Constantes para la creacion de los cuadros
    const tempoTranslateMin = 8
    const tempoTranslateMax = 15

    // Velocidad de rotacion que va a ser relativa a la velocidad de desplazamiento del cuadro 
    const rotateVelocimetroMin = 0.01 // porcentaje
    const rotateVelocimetroMax = 0.05 // porcentaje

    // Altura que tendra en el contenedor
    const alturaMin = 0;
    const alturaMax = 100

    // creacion del cuadro, devuelve un objeto con las especificaciones del cuadro
    const createCuadro = () => {
        // Tiempo para terminar la animacion
        const id = Math.random().toString(36).substr(2, 9);
        const distancia = containerWidth

        // Iniciamos con el objeto
        const altura = Math.floor(Math.random() * (alturaMax - alturaMin + 1) + alturaMin)
        const tempoTranslate = Math.random() * (tempoTranslateMax - tempoTranslateMin + 1) + tempoTranslateMin
        const rotateVelocimetro = Math.random() * (rotateVelocimetroMax - rotateVelocimetroMin) + rotateVelocimetroMin
        // allamos la velocidad
        const velocidad = distancia / tempoTranslate
        const rotacion = velocidad * rotateVelocimetro
        return {
            id,
            altura,
            tempoTranslate,
            rotateVelocimetro,
            velocidad,
            rotacion,
            exploding: false
        }
    }
    // Implementamos los estilos del cuadro, como donde estara posicionado etc
    const createStylesCuadro = (cuadro) => {
        return {
            bottom: `${cuadro.altura}%`,
            animationDuration: `${cuadro.tempoTranslate}s`,
            transform: `rotate(${cuadro.rotacion}turn)`,
        }
    }

    // le asignamos el cuadro al estado
    const createCuadroBg = useCallback(() => {
        const cuadro = createCuadro()
        setCuadrosBg((prevCuadrosBg) => [...prevCuadrosBg, cuadro])
    }, [setCuadrosBg])

    // Funcion de avalancha de cuadros para cuando cambie de pagina
    const createCuadroAvalancha = () => {
        for (let i = 0; i < 14; i++) {
            createCuadroBg()
        }
    };

    // Funcion de elimacion del cuadro, aplicada en el final del recorrido y en el click
    const removeCuadro = (cuadro) => {

        // Añadimos exploding true para iniciar la animacion
        setCuadrosBg((prevCuadrosBg) => {
            const index = prevCuadrosBg.findIndex((c) => c.id === cuadro.id);
            if (index !== -1) {
                prevCuadrosBg[index].exploding = true;
            }
            return [...prevCuadrosBg];
        });

        // tiempo de espera antes de eliminar el cuadro
        setTimeout(() => {
            setCuadrosBg((prevCuadrosBg) => prevCuadrosBg.filter((c) => c.id !== cuadro.id));
        }, 500);
    };


    // UseEffect para cuando cambie de pantalla enviar una avalancha de cuadros
    useEffect(() => {
        containerWidth = containerRef.current.offsetWidth
        router.events.on('routeChangeComplete', createCuadroAvalancha);
        return () => {
            router.events.off('routeChangeComplete', createCuadroAvalancha);
        };
    }, [router]);

    // UseEffect para crear cuadros periodicamente
    useEffect(() => {
        containerWidth = containerRef.current.offsetWidth
        const interval = setInterval(() => {
            createCuadroBg()
        }, 2500)
        setIntervalId(interval)
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [])

    return (
        <>
            {cuadrosBg.map((cuadro) => (
                <div
                    key={cuadro.id}
                    style={createStylesCuadro(cuadro)}
                    onClick={() => removeCuadro(cuadro)}
                    className={`${stylesCuadrosBg.bgAnimated} ${cuadro.exploding && stylesCuadrosBg.exploding}`}
                    onAnimationEnd={() => removeCuadro(cuadro)}
                />
            ))}
        </>
    )
}

export default CuadroAnimation