import "./styles.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NASMCoursePage from "./Componentes/NASMCoursePage";
import IntroNASM from "./Componentes/IntroNASM";
import EjerciciosNASM from "./Componentes/EjerciciosNASM";
import FundamentosNASM from "./Componentes/FundamentosNASM";
import LlamadasNASM from "./Componentes/LlamadasNASM";
import ProNASM from "./Componentes/ProNASM";
import RecursosNASM from "./Componentes/RecursosNASM";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NASMCoursePage />} />
        <Route path="/introduccion" element={<IntroNASM />} />
        <Route path="/ejercicios" element={<EjerciciosNASM />} />
        <Route path="/fundamentos" element={<FundamentosNASM />} />
        <Route path="/llamadas-sistema" element={<LlamadasNASM />} />
        <Route path="/programacion-avanzada" element={<ProNASM />} />
        <Route path="/recursos" element={<RecursosNASM />} />
      </Routes>
    </Router>
  );
}

export default App;
