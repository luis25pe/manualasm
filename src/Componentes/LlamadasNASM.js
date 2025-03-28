import React from "react";
import { Link } from "react-router-dom";
import './IntroNASM.css';

const LlamadasSistemaNASM = () => {
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
              <Link to="/fundamentos" className="sidebar-link">
                Fundamentos del lenguaje
              </Link>
            </li>
            <li>
              <Link to="/llamadas-sistema" className="sidebar-link active">
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
          <h1 className="intro-nasm-title">Llamadas al sistema y Entrada/Salida</h1>

          {/* Sección: Linux (int 0x80) */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Linux (int 0x80)</h2>
            <p className="intro-nasm-text">
              En Linux, las llamadas al sistema se realizan con la interrupción <code>0x80</code>:
            </p>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`section .data
    mensaje db 'Hola, mundo', 10, 0  ; Mensaje con salto de línea y terminación
    longitud equ $ - mensaje - 1     ; Longitud del mensaje (sin el 0 final)

section .text
    global _start
_start:
    ; Escribir mensaje (syscall write)
    mov eax, 4          ; Número de syscall para write
    mov ebx, 1          ; File descriptor: 1 es stdout
    mov ecx, mensaje    ; Puntero al buffer
    mov edx, longitud   ; Longitud del buffer
    int 0x80            ; Llamada al sistema
    
    ; Salir del programa (syscall exit)
    mov eax, 1          ; Número de syscall para exit
    mov ebx, 0          ; Código de salida 0 (éxito)
    int 0x80            ; Llamada al sistema`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`section .data
    mensaje db 'Hola, mundo', 10, 0  ; Mensaje con salto de línea y terminación
    longitud equ $ - mensaje - 1     ; Longitud del mensaje (sin el 0 final)

section .text
    global _start
_start:
    ; Escribir mensaje (syscall write)
    mov eax, 4          ; Número de syscall para write
    mov ebx, 1          ; File descriptor: 1 es stdout
    mov ecx, mensaje    ; Puntero al buffer
    mov edx, longitud   ; Longitud del buffer
    int 0x80            ; Llamada al sistema
    
    ; Salir del programa (syscall exit)
    mov eax, 1          ; Número de syscall para exit
    mov ebx, 0          ; Código de salida 0 (éxito)
    int 0x80            ; Llamada al sistema`)}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Llamadas al sistema comunes en Linux (32 bits):</h3>
            <ul className="intro-nasm-list">
              <li><strong>1: exit</strong> - Termina el programa</li>
              <li><strong>2: fork</strong> - Crea un nuevo proceso</li>
              <li><strong>3: read</strong> - Lee de un descriptor de archivo</li>
              <li><strong>4: write</strong> - Escribe a un descriptor de archivo</li>
              <li><strong>5: open</strong> - Abre un archivo</li>
              <li><strong>6: close</strong> - Cierra un descriptor de archivo</li>
            </ul>
          </section>

          {/* Sección: Windows (stdcall) */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Windows (stdcall)</h2>
            <p className="intro-nasm-text">
              En Windows, las llamadas a la API se realizan mediante <code>CALL</code> a funciones de DLL:
            </p>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`section .data
    mensaje db 'Hola, mundo', 0
    fmt db '%s', 10, 0  ; Formato para printf

section .text
    global _main
    extern _printf, _ExitProcess@4  ; Funciones externas de Windows

_main:
    ; Preservar el stack
    push ebp
    mov ebp, esp
    
    ; Llamada a printf
    push mensaje        ; Segundo argumento (string)
    push fmt            ; Primer argumento (formato)
    call _printf        ; Llamada a la función
    add esp, 8          ; Limpiar stack (2 argumentos * 4 bytes)
    
    ; Salir
    push 0              ; Código de salida
    call _ExitProcess@4 ; No necesita limpiar stack (convención stdcall)`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`section .data
    mensaje db 'Hola, mundo', 0
    fmt db '%s', 10, 0  ; Formato para printf

section .text
    global _main
    extern _printf, _ExitProcess@4  ; Funciones externas de Windows

_main:
    ; Preservar el stack
    push ebp
    mov ebp, esp
    
    ; Llamada a printf
    push mensaje        ; Segundo argumento (string)
    push fmt            ; Primer argumento (formato)
    call _printf        ; Llamada a la función
    add esp, 8          ; Limpiar stack (2 argumentos * 4 bytes)
    
    ; Salir
    push 0              ; Código de salida
    call _ExitProcess@4 ; No necesita limpiar stack (convención stdcall)`)}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Convención stdcall en Windows:</h3>
            <ul className="intro-nasm-list">
              <li>Los argumentos se envían a la pila de derecha a izquierda</li>
              <li>La función llamada limpia la pila antes de retornar</li>
              <li>El valor de retorno se coloca en <code>EAX</code></li>
            </ul>
          </section>

          {/* Sección: Manejo de archivos y memoria */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Manejo de archivos y memoria</h2>

            <h3 className="intro-nasm-subtitle">Manejo de archivos en Linux:</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`section .data
    nombre_archivo db 'datos.txt', 0
    contenido db 'Este es un test', 10
    longitud equ $ - contenido

section .bss
    descriptor resd 1    ; Descriptor del archivo
    buffer resb 100      ; Buffer para lectura

section .text
    global _start
_start:
    ; Abrir archivo (crear si no existe)
    mov eax, 5           ; syscall open
    mov ebx, nombre_archivo
    mov ecx, 101o        ; O_CREAT | O_WRONLY (octal)
    mov edx, 0666o       ; Permisos
    int 0x80
    mov [descriptor], eax ; Guardar descriptor

    ; Escribir en archivo
    mov eax, 4           ; syscall write
    mov ebx, [descriptor]
    mov ecx, contenido
    mov edx, longitud
    int 0x80

    ; Cerrar archivo
    mov eax, 6           ; syscall close
    mov ebx, [descriptor]
    int 0x80

    ; Salir
    mov eax, 1
    xor ebx, ebx
    int 0x80`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`section .data
    nombre_archivo db 'datos.txt', 0
    contenido db 'Este es un test', 10
    longitud equ $ - contenido

section .bss
    descriptor resd 1    ; Descriptor del archivo
    buffer resb 100      ; Buffer para lectura

section .text
    global _start
_start:
    ; Abrir archivo (crear si no existe)
    mov eax, 5           ; syscall open
    mov ebx, nombre_archivo
    mov ecx, 101o        ; O_CREAT | O_WRONLY (octal)
    mov edx, 0666o       ; Permisos
    int 0x80
    mov [descriptor], eax ; Guardar descriptor

    ; Escribir en archivo
    mov eax, 4           ; syscall write
    mov ebx, [descriptor]
    mov ecx, contenido
    mov edx, longitud
    int 0x80

    ; Cerrar archivo
    mov eax, 6           ; syscall close
    mov ebx, [descriptor]
    int 0x80

    ; Salir
    mov eax, 1
    xor ebx, ebx
    int 0x80`)}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Manejo de memoria dinámica en Linux:</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`section .text
    global _start
_start:
    ; Solicitar memoria (brk)
    mov eax, 45          ; syscall brk
    xor ebx, ebx         ; 0 para obtener la dirección actual
    int 0x80
    
    ; Aumentar el tamaño del heap
    mov ebx, eax         ; Dirección actual
    add ebx, 4096        ; Solicitar 4KB
    mov eax, 45          ; syscall brk
    int 0x80
    
    ; EAX ahora contiene la nueva dirección de brk
    ; La memoria está disponible desde la dirección anterior hasta la nueva`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`section .text
    global _start
_start:
    ; Solicitar memoria (brk)
    mov eax, 45          ; syscall brk
    xor ebx, ebx         ; 0 para obtener la dirección actual
    int 0x80
    
    ; Aumentar el tamaño del heap
    mov ebx, eax         ; Dirección actual
    add ebx, 4096        ; Solicitar 4KB
    mov eax, 45          ; syscall brk
    int 0x80
    
    ; EAX ahora contiene la nueva dirección de brk
    ; La memoria está disponible desde la dirección anterior hasta la nueva`)}
              >
                Copiar
              </button>
            </div>
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

export default LlamadasSistemaNASM;