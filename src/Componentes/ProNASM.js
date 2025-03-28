import React from "react";
import { Link } from "react-router-dom";
import './IntroNASM.css';

const ProNASM = () => {
  // Function to copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
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
              <Link to="/llamadas-sistema" className="sidebar-link">
                Llamadas al Sistema y Entrada/Salida
              </Link>
            </li>
            <li>
              <Link to="/programacion-avanzada" className="sidebar-link active">
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
          <h1 className="intro-nasm-title">Programación avanzada</h1>

          {/* Sección: Manipulación de la pila y llamadas a funciones */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Manipulación de la pila y llamadas a funciones</h2>
            <p className="intro-nasm-text">
              La pila es fundamental para la gestión de funciones y variables locales:
            </p>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`section .text
    global _start
_start:
    ; Llamar a una función
    push dword 42        ; Pasar argumento
    call suma_uno        ; Llamada a función
    add esp, 4           ; Limpiar stack (1 argumento * 4 bytes)
    
    ; EAX ahora contiene el resultado
    mov ebx, eax         ; Código de salida
    mov eax, 1           ; syscall exit
    int 0x80

; Función que suma 1 al argumento
suma_uno:
    push ebp             ; Guardar frame pointer
    mov ebp, esp         ; Establecer nuevo frame
    
    mov eax, [ebp+8]     ; Obtener argumento (ebp+8 porque ebp ocupa 4 bytes)
    inc eax              ; Sumar 1
    
    mov esp, ebp         ; Restaurar stack pointer
    pop ebp              ; Restaurar frame pointer
    ret                  ; Retornar (EAX contiene el resultado)`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`section .text
    global _start
_start:
    ; Llamar a una función
    push dword 42        ; Pasar argumento
    call suma_uno        ; Llamada a función
    add esp, 4           ; Limpiar stack (1 argumento * 4 bytes)
    
    ; EAX ahora contiene el resultado
    mov ebx, eax         ; Código de salida
    mov eax, 1           ; syscall exit
    int 0x80

; Función que suma 1 al argumento
suma_uno:
    push ebp             ; Guardar frame pointer
    mov ebp, esp         ; Establecer nuevo frame
    
    mov eax, [ebp+8]     ; Obtener argumento (ebp+8 porque ebp ocupa 4 bytes)
    inc eax              ; Sumar 1
    
    mov esp, ebp         ; Restaurar stack pointer
    pop ebp              ; Restaurar frame pointer
    ret                  ; Retornar (EAX contiene el resultado)`)}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Estructura del stack frame:</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`Direcciones altas
    [ebp+8]  Argumento 1
    [ebp+4]  Dirección de retorno
    [ebp]    EBP anterior
    [ebp-4]  Variable local 1
    ...
Direcciones bajas`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`Direcciones altas
    [ebp+8]  Argumento 1
    [ebp+4]  Dirección de retorno
    [ebp]    EBP anterior
    [ebp-4]  Variable local 1
    ...
Direcciones bajas`)}
              >
                Copiar
              </button>
            </div>
          </section>

          {/* Sección: Macros y estructuras */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Macros y estructuras</h2>
            <p className="intro-nasm-text">
              Las macros permiten generar código repetitivo:
            </p>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`; Definición de macro
%macro PRINT 1
    pushad              ; Guardar todos los registros
    
    mov eax, 4          ; syscall write
    mov ebx, 1          ; stdout
    mov ecx, %1         ; Parámetro (dirección del mensaje)
    mov edx, dword [%1-4] ; Tamaño (asumiendo que está almacenado justo antes)
    int 0x80
    
    popad               ; Restaurar registros
%endmacro

section .data
    len1 dd 13          ; Longitud de msg1
    msg1 db 'Hola, mundo', 10
    
    len2 dd 16          ; Longitud de msg2
    msg2 db 'Soy ensamblador', 10

section .text
    global _start
_start:
    PRINT msg1          ; Usar la macro
    PRINT msg2          ; Reutilizar la macro
    
    ; Salir
    mov eax, 1
    xor ebx, ebx
    int 0x80`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`; Definición de macro
%macro PRINT 1
    pushad              ; Guardar todos los registros
    
    mov eax, 4          ; syscall write
    mov ebx, 1          ; stdout
    mov ecx, %1         ; Parámetro (dirección del mensaje)
    mov edx, dword [%1-4] ; Tamaño (asumiendo que está almacenado justo antes)
    int 0x80
    
    popad               ; Restaurar registros
%endmacro

section .data
    len1 dd 13          ; Longitud de msg1
    msg1 db 'Hola, mundo', 10
    
    len2 dd 16          ; Longitud de msg2
    msg2 db 'Soy ensamblador', 10

section .text
    global _start
_start:
    PRINT msg1          ; Usar la macro
    PRINT msg2          ; Reutilizar la macro
    
    ; Salir
    mov eax, 1
    xor ebx, ebx
    int 0x80`)}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Estructuras para organizar datos:</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`; Definición de estructura
struc persona
    .nombre: resb 30    ; Campo para nombre (30 bytes)
    .edad:   resd 1     ; Campo para edad (4 bytes)
    .altura: resd 1     ; Campo para altura (4 bytes)
endstruc

section .data
    juan istruc persona
        at persona.nombre, db 'Juan Pérez', 0
        at persona.edad,   dd 25
        at persona.altura, dd 180
    iend

section .text
    global _start
_start:
    ; Acceder a campos de estructura
    mov eax, [juan + persona.edad]   ; Obtener edad de Juan`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`; Definición de estructura
struc persona
    .nombre: resb 30    ; Campo para nombre (30 bytes)
    .edad:   resd 1     ; Campo para edad (4 bytes)
    .altura: resd 1     ; Campo para altura (4 bytes)
endstruc

section .data
    juan istruc persona
        at persona.nombre, db 'Juan Pérez', 0
        at persona.edad,   dd 25
        at persona.altura, dd 180
    iend

section .text
    global _start
_start:
    ; Acceder a campos de estructura
    mov eax, [juan + persona.edad]   ; Obtener edad de Juan`)}
              >
                Copiar
              </button>
            </div>
          </section>

          {/* Sección: Programación de interrupciones y acceso a hardware */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Programación de interrupciones y acceso a hardware</h2>
            <p className="intro-nasm-text">
              Para manejar interrupciones personalizadas:
            </p>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`section .data
    handler_msg db 'Interrupción recibida', 10
    handler_len equ $ - handler_msg

section .text
    global _start
_start:
    ; Configurar handler para SIGINT (Ctrl+C)
    mov eax, 48         ; syscall sigaction (32 bits)
    mov ebx, 2          ; SIGINT
    mov ecx, handler    ; Puntero a la función handler
    xor edx, edx        ; NULL para el resto de parámetros
    int 0x80
    
    ; Bucle infinito
loop:
    jmp loop

; Función para manejar la interrupción
handler:
    push eax
    push ebx
    push ecx
    push edx
    
    mov eax, 4          ; syscall write
    mov ebx, 1          ; stdout
    mov ecx, handler_msg
    mov edx, handler_len
    int 0x80
    
    pop edx
    pop ecx
    pop ebx
    pop eax
    ret`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`section .data
    handler_msg db 'Interrupción recibida', 10
    handler_len equ $ - handler_msg

section .text
    global _start
_start:
    ; Configurar handler para SIGINT (Ctrl+C)
    mov eax, 48         ; syscall sigaction (32 bits)
    mov ebx, 2          ; SIGINT
    mov ecx, handler    ; Puntero a la función handler
    xor edx, edx        ; NULL para el resto de parámetros
    int 0x80
    
    ; Bucle infinito
loop:
    jmp loop

; Función para manejar la interrupción
handler:
    push eax
    push ebx
    push ecx
    push edx
    
    mov eax, 4          ; syscall write
    mov ebx, 1          ; stdout
    mov ecx, handler_msg
    mov edx, handler_len
    int 0x80
    
    pop edx
    pop ecx
    pop ebx
    pop eax
    ret`)}
              >
                Copiar
              </button>
            </div>

            <h3 className="intro-nasm-subtitle">Acceso a puertos de E/S (hardware):</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`section .text
    global _start
_start:
    ; Leer del puerto 0x60 (teclado en PC)
    in al, 0x60         ; Leer un byte del puerto
    
    ; Escribir al puerto 0x3F8 (puerto serial COM1)
    mov al, 'A'
    out 0x3F8, al       ; Enviar un byte al puerto`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`section .text
    global _start
_start:
    ; Leer del puerto 0x60 (teclado en PC)
    in al, 0x60         ; Leer un byte del puerto
    
    ; Escribir al puerto 0x3F8 (puerto serial COM1)
    mov al, 'A'
    out 0x3F8, al       ; Enviar un byte al puerto`)}
              >
                Copiar
              </button>
            </div>
          </section>

          {/* Sección: Consejos para optimización */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Consejos para optimización</h2>
            <ul className="intro-nasm-list">
              <li><strong>Usar registros eficientemente</strong>: Priorizar registros sobre memoria.</li>
              <li><strong>Usar instrucciones específicas</strong>: <code>inc</code> en lugar de <code>add reg, 1</code>.</li>
              <li><strong>Minimizar accesos a memoria</strong>: Cachear valores en registros.</li>
              <li><strong>Usar XOR para poner a cero</strong>: <code>xor eax, eax</code> es más rápido que <code>mov eax, 0</code>.</li>
              <li><strong>Alinear código crítico</strong>: Alinear bucles a 16 bytes para mejor rendimiento de caché.</li>
              <li><strong>Reducir instrucciones en bucles</strong>: Desenrollar bucles cuando sea apropiado.</li>
              <li><strong>Usar instrucciones SSE/MMX</strong>: Para operaciones vectoriales.</li>
            </ul>
          </section>

          {/* Sección: Herramientas de desarrollo */}
          <section className="intro-nasm-section">
            <h2 className="intro-nasm-section-title">Herramientas de desarrollo</h2>
            <p className="intro-nasm-text">
              Para trabajar efectivamente con NASM:
            </p>
            <ul className="intro-nasm-list">
              <li><strong>NASM</strong>: Ensamblador propiamente dicho.</li>
              <li><strong>LD</strong>: Enlazador para crear ejecutables.</li>
              <li><strong>GDB</strong>: Depurador para ejecutar paso a paso.</li>
              <li><strong>objdump</strong>: Para examinar el código objeto.</li>
            </ul>

            <h3 className="intro-nasm-subtitle">Ejemplo de compilación en Linux:</h3>
            <div className="code-block-container">
              <pre className="intro-nasm-code">
                <code>
                  {`nasm -f elf programa.asm        # Ensamblar (-f formato)
ld -m elf_i386 -s -o programa programa.o  # Enlazar`}
                </code>
              </pre>
              <button 
                className="copy-button"
                onClick={() => copyToClipboard(`nasm -f elf programa.asm        # Ensamblar (-f formato)
ld -m elf_i386 -s -o programa programa.o  # Enlazar`)}
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

export default ProNASM;