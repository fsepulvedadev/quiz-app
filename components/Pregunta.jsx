import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { PreguntasContext } from "../context/PreguntasProvider";
import ModalTiempo from "./ModalTiempo";

const Pregunta = ({ pregunta }) => {
  const [counter, setCounter] = useState(200);
  const [showModal, setShowModal] = useState(false);

  const context = useContext(PreguntasContext);
  const {
    setCorrectas,
    correctas,
    incorrectas,
    setIncorrectas,
    respuestas,
    setStep,
    step,
    preguntasOrdenadas,
    terminar,
  } = context;

  const handleSelect = (e) => {
    e.preventDefault();
    let targetId = e.target.id;

    let respuesta = pregunta.respuestas.find((x) => x.id === +targetId);

    let avanzar = step + 1;
    if (respuesta.correcta === true) {
      console.log("Correcto");

      setCorrectas(correctas + 1);
      setStep(avanzar);
      if (step === preguntasOrdenadas.length) {
        terminar();
      }
    } else {
      console.log("Incorrecto");
      setIncorrectas(incorrectas + 1);

      setStep(avanzar);
      if (step === preguntasOrdenadas.length) {
        terminar();
      }
    }
  };

  useEffect(() => {
    let contador = counter;
    const interval = window.setInterval(() => {
      if (contador > 0) {
        contador -= 10;
        setCounter(contador);
      } else if (contador === 0) {
        window.clearInterval(interval);
      }
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setIncorrectas(incorrectas + 1);
      setShowModal(true);

      if (step < preguntasOrdenadas.length) {
        setStep(step + 1);
      } else {
        terminar();
      }
    }
  }, [counter]);
  return (
    <>
      {showModal && <ModalTiempo setShowModal={setShowModal} />}
      <div className="absolute top-10 text-3xl font-bold text-emerald-600 border-2 rounded-full px-2 border-emerald-600 ">
        {counter * 0.1}
      </div>
      <div className="h-[70vh] grid grid-cols-1 grid-rows-7 place-items-center bg-emerald-200 w-8/12 rounded shadow-xl">
        <div
          style={{ width: `${counter / 2}%` }}
          className={`relative bg-emerald-500 h-2 -top-5 transition-all duration-500`}
        ></div>
        <div className="font-bold text-3xl text-emerald-900 row-span-2">
          {pregunta.pregunta}
        </div>

        {pregunta.respuestas?.map((res) => (
          <div
            key={res.id}
            id={res.id}
            className="bg-emerald-600 text-white p-2 w-6/12 rounded flex items-center justify-center cursor-pointer hover:bg-emerald-800"
            onClick={(e) => handleSelect(e)}
          >
            {res.res}
          </div>
        ))}
      </div>
    </>
  );
};

export default Pregunta;
