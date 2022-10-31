import "../styles/globals.css";
import PreguntasProvider from "../context/PreguntasProvider";

function MyApp({ Component, pageProps }) {
  return (
    <PreguntasProvider>
      <Component {...pageProps} />
    </PreguntasProvider>
  );
}

export default MyApp;
