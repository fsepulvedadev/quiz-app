import { useEffect, useState, useContext } from "react";
import { PreguntasContext } from "../context/PreguntasProvider";

const ModalTiempo = ({ setShowModal }) => {
  const [counterModal, setCounterModal] = useState(3);
  const context = useContext(PreguntasContext);
  const { setStep, step } = context;

  useEffect(() => {
    let contador = counterModal;
    const intervalModal = window.setInterval(() => {
      if (counterModal > 0) {
        contador -= 1;
        setCounterModal(contador);
      } else {
        window.clearInterval(intervalModal);
        setStep(step + 1);
        setShowModal(false);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalModal);
    };
  }, []);

  return (
    <div className="absolute z-50 h-full w-full bg-emerald-800 grid grid-rows-2 place-items-center md:text-6xl text-4xl font-bold text-white">
      <p>Tiempo agotado!</p>
      <p className="md:text-xl text-lg">
        Pasando a la siguiente pregunta... {counterModal}
      </p>
    </div>
  );
};

export default ModalTiempo;
