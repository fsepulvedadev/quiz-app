import Pregunta from "../components/Pregunta";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useContext } from "react";
import { PreguntasContext } from "../context/PreguntasProvider";

const Quiz = () => {
  const context = useContext(PreguntasContext);
  const { preguntasOrdenadas, step } = context;

  return (
    <div className="flex w-full h-screen justify-center items-center">
      {preguntasOrdenadas?.map((preg) =>
        preg.orden === step ? (
          <Pregunta key={preg.orden} pregunta={preg} />
        ) : null
      )}
      <div className="bg-emerald-300 p-4 rounded shadow-xl absolute md:bottom-10 md:right-10 bottom-1 right-1 flex flex-col items-center border-t-8 border-t-emerald-500">
        <h4 className="">
          Pregunta {step} de {preguntasOrdenadas.length}
        </h4>
      </div>
    </div>
  );
};

export default Quiz;
