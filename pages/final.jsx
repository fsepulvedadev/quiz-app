import React, { useContext, useEffect, useState } from "react";
import { PreguntasContext } from "../context/PreguntasProvider";

const Final = () => {
  const context = useContext(PreguntasContext);
  const { correctas, incorrectas, handleReset } = context;
  const [score, setScore] = useState(0);
  const [porcentaje, setPorcentaje] = useState();

  useEffect(() => {
    let actualScore = correctas * 10 - incorrectas * 5;
    let total = correctas + incorrectas;
    let porciento = (correctas * 100) / total;

    setPorcentaje(porciento.toFixed(0));

    setScore(actualScore);

    setScore(actualScore);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="w-1/2 h-[40vh] bg-emerald-500 p-2 grid grid-row-3 place-items-center text-white text-xl rounded">
        <h2 className="text-2xl font-bold text-emerald-900">
          Juego terminado! 🎉
        </h2>
        <p className="flex items-center">
          Puntaje: <span className="text-3xl ml-2">{score}</span> ⭐
        </p>

        <p>Obtuviste {porcentaje}% de respuestas correctas.</p>
      </div>
      <button
        onClick={() => {
          handleReset();
        }}
        className="p-2 bg-emerald-500 text-white rounded mt-5 font-bold border-4 border-emerald-800 hover:scale-110 transition-all duration-500"
      >
        Volver a Jugar 🔄
      </button>
    </div>
  );
};

export default Final;
