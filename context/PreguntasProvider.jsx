import { createContext, useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/router";

export const PreguntasContext = createContext();

const PreguntasProvider = ({ children }) => {
  const router = useRouter();
  const [preguntas, setPreguntas] = useState([
    {
      pregunta: "¿De que color era el caballo blanco de San Martin?",
      respuestas: [
        { res: "Blanco", correcta: true, id: 1 },
        { res: "Negro", correcta: false, id: 2 },
        { res: "Azul", correcta: false, id: 3 },
        { res: "Verde", correcta: false, id: 4 },
      ],
    },
    {
      pregunta: "¿Cuantas copas del mundo gano la seleccion Argentina?",
      respuestas: [
        { res: "Dos", correcta: true, id: 1 },
        { res: "Tres", correcta: false, id: 2 },
        { res: "Ninguna", correcta: false, id: 3 },
        { res: "Cuatro", correcta: false, id: 4 },
        ,
      ],
    },
    {
      pregunta: "¿Donde se celebra la Copa Mundial de la FIFA 2022?",
      respuestas: [
        { res: "Alemania", correcta: false, id: 1 },
        { res: "España", correcta: false, id: 2 },
        { res: "Qatar", correcta: true, id: 3 },
        { res: "Australia", correcta: false, id: 4 },
      ],
    },
  ]);
  const [preguntasOrdenadas, setPreguntasOrdenadas] = useState([]);
  const [correctas, setCorrectas] = useState(0);
  const [incorrectas, setIncorrectas] = useState(0);
  const [step, setStep] = useState(1);

  const randomOrder = (preguntas) => {
    let currentIndex = preguntas.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [preguntas[currentIndex], preguntas[randomIndex]] = [
        preguntas[randomIndex],
        preguntas[currentIndex],
      ];
    }
    return preguntas;
  };

  const terminar = () => {
    router.push("/final");
  };

  const handleReset = () => {
    setStep(1);
    setCorrectas(0);
    setIncorrectas(0);
    router.push("/");
  };

  return (
    <PreguntasContext.Provider
      value={{
        preguntas,
        correctas,
        setCorrectas,
        incorrectas,
        setIncorrectas,
        randomOrder,
        setPreguntas,
        setPreguntasOrdenadas,
        preguntasOrdenadas,
        step,
        setStep,
        terminar,
        handleReset,
      }}
    >
      {children}
    </PreguntasContext.Provider>
  );
};

export default PreguntasProvider;
