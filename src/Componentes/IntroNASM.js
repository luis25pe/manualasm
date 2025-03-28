import React from "react";
import { Link } from "react-router-dom";
import './IntroNASM.css';

const IntroNASM = () => {
  // Function to copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => alert('Código copiado al portapapeles'))
      .catch(() => alert('Error al copiar el código'));
  };

  return (
    <div className="intro-nasm">
      <div className="main-content-wrapper">
        {/* Sidebar */}
        <div className="sidebar-nasm">
          <h3 className="sidebar-title">Contenido del Curso</h3>
          <ul className="sidebar-list">
            <li>
              <Link to="/introduccion" className="sidebar-link active">
                Introducción al Ensamblador NASM x86
              </Link>
            </li>
            <li>
              <Link to="/fundamentos" className="sidebar-link">
                Fundamentos del lenguaje
              </Link>
            </li>
            <li>
              <Link to="/llamadas-sistema" className="sidebar-link">
                Llamadas al Sistema y Entrada/Salida
              </Link>
            </li>
            <li>
              <Link to="/programacion-avanzada" className="sidebar-link">
                Programación Avanzada
              </Link>
            </li>
            <li>
              <Link to="/ejercicios" className="sidebar-link">
                Ejercicios Prácticos
              </Link>
            </li>
            <li>
              <Link to="/recursos" className="sidebar-link">
                Recursos
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="content-main">
          <h1 className="intro-nasm-title">Introducción al Ensamblador NASM x86</h1>

          {/* Section: What is NASM */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">¿Qué es NASM y por qué usarlo?</h2>
            <div className="intro-nasm-text">
              <p>
                <strong>NASM</strong> (Netwide Assembler) es un ensamblador de código abierto para la arquitectura x86. Es ampliamente utilizado porque:
              </p>
              <ul className="intro-nasm-list">
                <li>Es multiplataforma (funciona en Linux, Windows, macOS, etc.)</li>
                <li>Es altamente eficiente y genera código máquina optimizado</li>
                <li>Soporta múltiples formatos de salida (como ELF, COFF, Mach-O, etc.)</li>
                <li>Es ideal para programación de bajo nivel, desarrollo de sistemas operativos, drivers, y optimización de código</li>
              </ul>
            </div>
          </section>

          {/* Section: x86 Architecture */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Arquitectura x86 y registros principales</h2>
            <div className="intro-nasm-text">
              <p>
                La arquitectura x86 es una familia de procesadores desarrollada por Intel. Algunos conceptos clave:
              </p>
              <ul className="intro-nasm-list">
                <li>
                  <strong>Registros</strong>: Son pequeñas unidades de almacenamiento dentro del CPU. Los principales registros en x86 son:
                  <ul className="intro-nasm-sublist">
                    <li><strong>Registros de propósito general</strong>: EAX, EBX, ECX, EDX (usados para operaciones aritméticas y lógicas)</li>
                    <li><strong>Registros de segmento</strong>: CS (Code Segment), DS (Data Segment), SS (Stack Segment), ES (Extra Segment)</li>
                    <li><strong>Registros de punteros</strong>: EIP (Instruction Pointer), ESP (Stack Pointer), EBP (Base Pointer)</li>
                    <li><strong>Registros de banderas (EFLAGS)</strong>: Contienen información sobre el estado del procesador (como carry, zero, overflow, etc.)</li>
                  </ul>
                </li>
                <li>
                  <strong>Modos de operación</strong>: x86 soporta varios modos, como modo real, modo protegido y modo de 64 bits
                </li>
                <li>
                  <strong>Organización de memoria</strong>: Segmentación y paginación de memoria
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Installation */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Instalación de NASM y entorno de desarrollo</h2>
            
            <h3 className="intro-nasm-subtitle">Instalación en Linux:</h3>
            <div className="intro-nasm-text">
              <p>Abre una terminal y ejecuta el siguiente comando para instalar NASM:</p>
              <div className="code-block-container">
                <pre className="intro-nasm-code">
                  <code>sudo apt-get install nasm</code>
                </pre>
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard('sudo apt-get install nasm')}
                >
                  Copiar
                </button>
              </div>
              <p>Verifica la instalación con:</p>
              <div className="code-block-container">
                <pre className="intro-nasm-code">
                  <code>nasm -v</code>
                </pre>
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard('nasm -v')}
                >
                  Copiar
                </button>
              </div>
            </div>

            <h3 className="intro-nasm-subtitle">Instalación en Windows:</h3>
            <div className="intro-nasm-text">
              <p>
                Descarga NASM desde su <a href="https://www.nasm.us/" target="_blank" rel="noopener noreferrer" className="intro-nasm-link">sitio oficial</a>. Extrae el archivo y agrega la ruta de NASM a las variables de entorno del sistema.
              </p>
              <p>Verifica la instalación desde la línea de comandos:</p>
              <div className="code-block-container">
                <pre className="intro-nasm-code">
                  <code>nasm -v</code>
                </pre>
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard('nasm -v')}
                >
                  Copiar
                </button>
              </div>
            </div>

            <h3 className="intro-nasm-subtitle">Entorno de desarrollo recomendado:</h3>
            <ul className="intro-nasm-list">
              <li><strong>Editores de texto</strong>: Visual Studio Code, Sublime Text, o cualquier editor con resaltado de sintaxis para ensamblador</li>
              <li><strong>Depuradores</strong>: GDB (GNU Debugger) para depurar programas en ensamblador</li>
              <li><strong>Extensiones útiles</strong>:
                <ul className="intro-nasm-sublist">
                  <li>NASM syntax highlighting</li>
                  <li>Hex Editor</li>
                  <li>GDB Integration</li>
                </ul>
              </li>
            </ul>
          </section>

          {/* Section: Example Code */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Ejemplo básico de código NASM</h2>
            <div className="intro-nasm-text">
              <p>Aquí tienes un ejemplo simple de un programa en NASM que imprime "Hola, mundo" en Linux:</p>
              <div className="code-block-container">
                <pre className="intro-nasm-code">
                  <code>
{`section .data
    mensaje db 'Hola, mundo', 0xA  ; Cadena de texto con salto de línea
    longitud equ $ - mensaje       ; Longitud de la cadena

section .text
    global _start

_start:
    ; Llamada al sistema para escribir (sys_write)
    mov eax, 4          ; Número de la llamada al sistema (4 = sys_write)
    mov ebx, 1          ; Descriptor de archivo (1 = stdout)
    mov ecx, mensaje    ; Dirección de la cadena
    mov edx, longitud   ; Longitud de la cadena
    int 0x80            ; Interrupción para llamar al kernel

    ; Llamada al sistema para salir (sys_exit)
    mov eax, 1          ; Número de la llamada al sistema (1 = sys_exit)
    xor ebx, ebx        ; Código de salida (0 = éxito)
    int 0x80            ; Interrupción para llamar al kernel`}
                  </code>
                </pre>
                <button 
                  className="copy-button"
                  onClick={() => copyToClipboard(`section .data
    mensaje db 'Hola, mundo', 0xA  ; Cadena de texto con salto de línea
    longitud equ $ - mensaje       ; Longitud de la cadena

section .text
    global _start

_start:
    ; Llamada al sistema para escribir (sys_write)
    mov eax, 4          ; Número de la llamada al sistema (4 = sys_write)
    mov ebx, 1          ; Descriptor de archivo (1 = stdout)
    mov ecx, mensaje    ; Dirección de la cadena
    mov edx, longitud   ; Longitud de la cadena
    int 0x80            ; Interrupción para llamar al kernel

    ; Llamada al sistema para salir (sys_exit)
    mov eax, 1          ; Número de la llamada al sistema (1 = sys_exit)
    xor ebx, ebx        ; Código de salida (0 = éxito)
    int 0x80            ; Interrupción para llamar al kernel`)}
                >
                  Copiar
                </button>
              </div>
            </div>

            <h3 className="intro-nasm-subtitle">Compilación y ejecución en Linux:</h3>
            <ol className="intro-nasm-list">
              <li>Guarda el código en un archivo, por ejemplo, <code>hola.asm</code></li>
              <li>Ensambla el código:
                <div className="code-block-container">
                  <pre className="intro-nasm-code">
                    <code>nasm -f elf hola.asm -o hola.o</code>
                  </pre>
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard('nasm -f elf hola.asm -o hola.o')}
                  >
                    Copiar
                  </button>
                </div>
              </li>
              <li>Enlaza el objeto para crear el ejecutable:
                <div className="code-block-container">
                  <pre className="intro-nasm-code">
                    <code>ld hola.o -o hola</code>
                  </pre>
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard('ld hola.o -o hola')}
                  >
                    Copiar
                  </button>
                </div>
              </li>
              <li>Ejecuta el programa:
                <div className="code-block-container">
                  <pre className="intro-nasm-code">
                    <code>./hola</code>
                  </pre>
                  <button 
                    className="copy-button"
                    onClick={() => copyToClipboard('./hola')}
                  >
                    Copiar
                  </button>
                </div>
              </li>
            </ol>

            <div className="intro-nasm-note">
              <strong>Nota:</strong> En sistemas de 64 bits, puedes necesitar usar <code>nasm -f elf64</code> y <code>ld -m elf_i386</code> para compatibilidad.
            </div>
          </section>

          {/* Section: Advantages */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Ventajas de aprender NASM</h2>
            <ul className="intro-nasm-list">
              <li><strong>Control total sobre el hardware</strong>: Permite interactuar directamente con el procesador y la memoria</li>
              <li><strong>Optimización de rendimiento</strong>: Ideal para aplicaciones donde el rendimiento es crítico</li>
              <li><strong>Base para entender sistemas operativos</strong>: Muchos sistemas operativos y kernels están escritos en ensamblador</li>
              <li><strong>Desarrollo de exploits y reversing</strong>: Esencial para seguridad informática y análisis de malware</li>
              <li><strong>Comprensión profunda de la computación</strong>: Ayuda a entender cómo funcionan realmente los programas</li>
            </ul>

            <h3 className="intro-nasm-subtitle">Casos de uso comunes:</h3>
            <div className="intro-nasm-grid">
              <div className="intro-nasm-card">
                <h4>Desarrollo de sistemas operativos</h4>
                <p>El código de arranque y partes críticas de los sistemas operativos se escriben en ensamblador</p>
              </div>
              <div className="intro-nasm-card">
                <h4>Drivers de dispositivos</h4>
                <p>Comunicación directa con hardware requiere instrucciones de bajo nivel</p>
              </div>
              <div className="intro-nasm-card">
                <h4>Optimización de código</h4>
                <p>Para secciones críticas de aplicaciones que requieren máximo rendimiento</p>
              </div>
              <div className="intro-nasm-card">
                <h4>Seguridad informática</h4>
                <p>Análisis de vulnerabilidades y desarrollo de exploits</p>
              </div>
            </div>
          </section>

          {/* Back Button */}
          <Link to="/">
            <button className="intro-nasm-button">Volver</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroNASM;