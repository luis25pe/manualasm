import React from "react";
import { Link } from "react-router-dom";
import './IntroNASM.css';
import registros from '../images/registros.png';

const FundamentosNASM = () => {
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
              <Link to="/introduccion" className="sidebar-link">
                Introducción al Ensamblador NASM x86
              </Link>
            </li>
            <li>
              <Link to="/fundamentos" className="sidebar-link active">
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

        {/* Contenido principal */}
        <div className="content-main">
          <h1 className="intro-nasm-title">Fundamentos de Ensamblador NASM x86</h1>

          {/* Sección: Instrucciones básicas */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Instrucciones básicas</h2>
            <p className="intro-nasm-text">
              El ensamblador x86 utiliza un conjunto extenso de instrucciones que permiten manipular datos y controlar el flujo del programa:
            </p>

            <h3 className="intro-nasm-subtitle">MOV: Transfiere datos entre registros, memoria y valores inmediatos</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`mov eax, 42      ; Carga el valor 42 en el registro EAX
mov ebx, eax     ; Copia el contenido de EAX a EBX
mov [var], ecx   ; Guarda el contenido de ECX en la dirección de memoria 'var'`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`mov eax, 42      ; Carga el valor 42 en el registro EAX
mov ebx, eax     ; Copia el contenido de EAX a EBX
mov [var], ecx   ; Guarda el contenido de ECX en la dirección de memoria 'var'`)}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Operaciones aritméticas: ADD, SUB, MUL, DIV, INC, DEC</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`add eax, 5       ; Suma 5 a EAX
sub ecx, edx     ; Resta EDX de ECX
inc ebx          ; Incrementa EBX en 1
dec esi          ; Decrementa ESI en 1
mul ebx          ; Multiplica EAX por EBX (resultado en EDX:EAX)
div ecx          ; Divide EDX:EAX por ECX`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`add eax, 5       ; Suma 5 a EAX
sub ecx, edx     ; Resta EDX de ECX
inc ebx          ; Incrementa EBX en 1
dec esi          ; Decrementa ESI en 1
mul ebx          ; Multiplica EAX por EBX (resultado en EDX:EAX)
div ecx          ; Divide EDX:EAX por ECX`)}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Comparaciones y operaciones lógicas: CMP, TEST, AND, OR, XOR, NOT</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`cmp eax, ebx     ; Compara EAX con EBX, establece flags para saltos
test ecx, ecx    ; Operación AND sin guardar resultado (para verificar cero)
and eax, 0xFF    ; AND bit a bit (mantiene solo el byte bajo)
or edx, 0x8000   ; OR bit a bit (activa el bit más significativo)
xor eax, eax     ; XOR de EAX consigo mismo (forma eficiente de poner a cero)
not ebx          ; Invierte todos los bits de EBX`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`cmp eax, ebx     ; Compara EAX con EBX, establece flags para saltos
test ecx, ecx    ; Operación AND sin guardar resultado (para verificar cero)
and eax, 0xFF    ; AND bit a bit (mantiene solo el byte bajo)
or edx, 0x8000   ; OR bit a bit (activa el bit más significativo)
xor eax, eax     ; XOR de EAX consigo mismo (forma eficiente de poner a cero)
not ebx          ; Invierte todos los bits de EBX`)}
              >
                Copiar
              </button>
            </div>
            <div className="intro-nasm-images">
              <img src={registros} alt="registros" />
            </div>
          </section>

          {/* Sección: Segmentación de código, datos y pila */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Segmentación de código, datos y pila</h2>
            <p className="intro-nasm-text">
              Un programa en NASM típicamente se divide en secciones:
            </p>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`section .data           ; Sección para datos inicializados
    mensaje db 'Hola', 0 ; Define un string terminado en cero

section .bss            ; Sección para datos no inicializados
    buffer resb 64      ; Reserva 64 bytes para un buffer
    entero resd 1       ; Reserva espacio para un entero de 32 bits

section .text           ; Sección para el código ejecutable
    global _start       ; Punto de entrada para el programa
_start:
    ; Código del programa`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`section .data           ; Sección para datos inicializados
    mensaje db 'Hola', 0 ; Define un string terminado en cero

section .bss            ; Sección para datos no inicializados
    buffer resb 64      ; Reserva 64 bytes para un buffer
    entero resd 1       ; Reserva espacio para un entero de 32 bits

section .text           ; Sección para el código ejecutable
    global _start       ; Punto de entrada para el programa
_start:
    ; Código del programa`)}
              >
                Copiar
              </button>
            </div>
            <p className="intro-nasm-text">
              <strong>section .data</strong>: Almacena variables inicializadas.<br />
              <strong>section .bss</strong>: Reserva espacio para variables no inicializadas (más eficiente).<br />
              <strong>section .text</strong>: Contiene el código ejecutable.
            </p>
          </section>

          {/* Sección: Modos de direccionamiento */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Modos de direccionamiento</h2>
            <p className="intro-nasm-text">
              NASM ofrece varios modos de direccionamiento para acceder a datos:
            </p>

            <h3 className="intro-nasm-subtitle">Inmediato: El valor está en la instrucción</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>mov eax, 42          ; 42 es un valor inmediato</code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard('mov eax, 42          ; 42 es un valor inmediato')}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Registro: El operando es un registro</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>mov ebx, eax         ; EAX es el registro fuente</code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard('mov ebx, eax         ; EAX es el registro fuente')}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Directo: La dirección de memoria está especificada directamente</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>mov eax, [variable]  ; Carga desde la dirección 'variable'</code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard('mov eax, [variable]  ; Carga desde la dirección \'variable\'')}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Indirecto: La dirección está en un registro</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>mov eax, [ebx]       ; Usa el valor en EBX como dirección</code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard('mov eax, [ebx]       ; Usa el valor en EBX como dirección')}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Indexado: Base + Índice * Escala + Desplazamiento</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>mov al, [ebx + esi*4 + 8]  ; Acceso complejo a memoria</code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard('mov al, [ebx + esi*4 + 8]  ; Acceso complejo a memoria')}
              >
                Copiar
              </button>
            </div>
          </section>

          {/* Sección: Etiquetas y saltos condicionales */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Etiquetas y saltos condicionales</h2>
            <p className="intro-nasm-text">
              Las etiquetas permiten marcar posiciones en el código para realizar saltos:
            </p>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`    cmp eax, 10         ; Compara EAX con 10
    jl menor            ; Salta a 'menor' si EAX < 10
    je igual            ; Salta a 'igual' si EAX = 10
    jg mayor            ; Salta a 'mayor' si EAX > 10

menor:
    ; Código para cuando EAX < 10
    jmp fin

igual:
    ; Código para cuando EAX = 10
    jmp fin

mayor:
    ; Código para cuando EAX > 10

fin:
    ; Continúa el programa`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`    cmp eax, 10         ; Compara EAX con 10
    jl menor            ; Salta a 'menor' si EAX < 10
    je igual            ; Salta a 'igual' si EAX = 10
    jg mayor            ; Salta a 'mayor' si EAX > 10

menor:
    ; Código para cuando EAX < 10
    jmp fin

igual:
    ; Código para cuando EAX = 10
    jmp fin

mayor:
    ; Código para cuando EAX > 10

fin:
    ; Continúa el programa`)}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Tipos de saltos condicionales principales:</h3>
            <ul className="intro-nasm-list">
              <li><strong>je/jz</strong>: Salta si igual (ZF=1)</li>
              <li><strong>jne/jnz</strong>: Salta si no igual (ZF=0)</li>
              <li><strong>jl/jnge</strong>: Salta si menor (SF≠OF)</li>
              <li><strong>jle/jng</strong>: Salta si menor o igual (ZF=1 o SF≠OF)</li>
              <li><strong>jg/jnle</strong>: Salta si mayor (ZF=0 y SF=OF)</li>
              <li><strong>jge/jnl</strong>: Salta si mayor o igual (SF=OF)</li>
              <li><strong>jc/jb</strong>: Salta si hay acarreo (CF=1)</li>
            </ul>
          </section>

          {/* Botón para volver al curso */}
          <Link to="/">
            <button className="intro-nasm-button">Volver</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FundamentosNASM;