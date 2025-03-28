import React from "react";
import { Link } from "react-router-dom";
import './IntroNASM.css'; // Importa el archivo CSS
import hola from '../images/hola.png';
import leer from '../images/leer.png';
import suma from '../images/suma.png';
import cicloIm from '../images/ciclo.png';
import suma_y_ciclo from '../images/suma_y_ciclo.png';
import calculadora1 from '../images/calculadora1.png';
import calculadora2 from '../images/calculadora2.png';
import calculadoragccIMG from '../images/calculadoragcc.png';
import leergccIMG from '../images/leergcc.png';
import sumagccIMG from '../images/sumagcc.png';
import raizIMG from '../images/raiz.png';
import piramideIMG from '../images/piramide.png';
import factorialIMG from '../images/factorial.png';
import es_parIMG from '../images/es_par.png';

const EjerciciosNASM = () => {
  
  // Función para copiar el código al portapapeles
  const copiarCodigo = (codigo) => {
    navigator.clipboard.writeText(codigo)
      .then(() => alert("Código copiado al portapapeles"))
      .catch(() => alert("Error al copiar el código"));
  };

  // Función para descargar el código como archivo .asm
  const descargarCodigo = (codigo, nombreArchivo) => {
    const blob = new Blob([codigo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nombreArchivo;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Códigos de los programas
  const holaCodigo = `;1.- ENSAMBLAMOS: nasm -f elf32 hola.asm -o hola.o
;2.- ENLAZAMOS: ld -m elf_i386 -s -o hola hola.o
;3.- EJECUTAMOS: ./hola


;db: define una variable de tipo byte, 8 bits.
;dw: define una variable de tipo palabra (word), 2 bytes = 16 bits.
;dd: define una variable de tipo doble palabra (double word), 2 palabras = 4 bytes = 32 bits.
;dq: define una variable de tipo cuádruple palabra (quad word), 4 palabras = 8 bytes = 64 bits.


;Nota: Si estás en un sistema de 64 bits, es posible que necesites ;instalar las bibliotecas de 32 bits:
;sudo apt install gcc-multilib


section .data
    mensaje db "Hola, mundo!", 0xA  ; Mensaje con salto de línea (0xA representa un salto de línea (\n en ASCII).)
                                    ;msg db "Hola, mundo!", 10  ; Mensaje con salto de línea
    len equ $ - mensaje             ; Longitud del mensaje, $ representa la posición actual en la memoria. 
                                    ;len tendrá la cantidad de bytes del mensaje (incluyendo 0xA).

section .text
    global _start             ; seccion ELF
                              ; ELF es un formato de archivo que se utiliza para almacenar aplicaciones ejecutables en sistemas operativos como Linux y BSD. El lenguaje ensamblador es un lenguaje de programación que se utiliza en microprocesadores. 


_start:
    ; Llamada al sistema write (syscall número 1 en Linux)
    mov eax, 4       ; syscall número 4 -> sys_write (Carga el número de syscall 4 (sys_write))
    mov ebx, 1       ; File descriptor 1 -> stdout (Elige la salida estándar (stdout), que tiene el descriptor de archivo 1.)
    mov ecx, mensaje ; Dirección del mensaje ( Carga la dirección del mensaje en ecx.)
    mov edx, len     ; Longitud del mensaje ( Carga la longitud del mensaje en edx.)
    int 0x80         ; Llamado a la interrupción de Linux (Llama al kernel de Linux para ejecutar la syscall.)

    ; Llamada al sistema exit (syscall número 1 en Linux)
    mov eax, 1       ; syscall número 1 -> sys_exit ( Carga el número de syscall 1 (sys_exit).)
    xor ebx, ebx     ; Código de salida 0 (Coloca 0 en ebx, indicando que el programa terminó sin errores.)
    int 0x80         ; Llamado a la interrupción de Linux (Llama al kernel de Linux para ejecutar la syscall.)`;

  const leerCodigo = `; nasm -f elf32 leer.asm -o leer.o
; ld -m elf_i386 leer.o -o leer
; ./leer

section .bss
    buffer resb 10  ; Buffer para almacenar el número ingresado

section .data
    msg db "Ingresa un número: ", 0
    msg_result db "Número ingresado: ", 0
    newline db 10, 0  ; Salto de línea

section .text
    global _start

_start:
    ; Mostrar mensaje
    mov eax, 4          ; syscall write
    mov ebx, 1          ; stdout
    mov ecx, msg        ; Dirección del mensaje
    mov edx, 18         ; Longitud del mensaje
    int 0x80            ; Llamado al sistema

    ; Leer número desde la entrada estándar
    mov eax, 3          ; syscall read
    mov ebx, 0          ; stdin
    mov ecx, buffer     ; Dirección donde guardar el número
    mov edx, 10         ; Longitud máxima
    int 0x80            ; Llamado al sistema

    ; Mostrar mensaje del resultado
    mov eax, 4
    mov ebx, 1
    mov ecx, msg_result
    mov edx, 18
    int 0x80

    ; Mostrar el número ingresado
    mov eax, 4
    mov ebx, 1
    mov ecx, buffer
    mov edx, 10
    int 0x80

    ; Imprimir salto de línea
    mov eax, 4
    mov ebx, 1
    mov ecx, newline
    mov edx, 1
    int 0x80

    ; Salir del programa
    mov eax, 1          ; syscall exit
    xor ebx, ebx        ; Código de salida 0
    int 0x80`;

  const sumaCodigo = `;nasm -f elf32 suma.asm -o suma.o
;ld -m elf_i386 suma.o -o suma
;./suma


; Sección .bss, variables no inicializadas
;Dentro de esta sección se declaran y se reserva espacio para las variables de
;nuestro programa para las cuales no queremos dar un valor inicial.


;resb: reserva espacio en unidades de byte
;resw: reserva espacio en unidades de palabra, 2 bytes
;resd: reserva espacio en unidades de doble palabra, 4 bytes
;resq: reserva espacio en unidades de cuádruple palabra, 8 bytes


;var1 resb 1 ;reserva 1 byte
;var2 resb 4 ;reserva 4 bytes
;var3 resw 2 ;reserva 2 palabras = 4 bytes, equivalente al caso anterior
;var3 resd 1 ;reserva una cuádruple palabra = 4 bytes


section .bss
    num1 resb 2    ; Reservar espacio para num1
    num2 resb 2    ; Reservar espacio para num2
    resultado resb 64  ; Reservar espacio para el resultado

section .data
    msg1 db "Ingresa el primer número?", 0
    msg2 db "Ingresa el segundo número?", 0
    msg_result db "La suma es: ", 0
    newline db 10, 0  ; Salto de línea

section .text
    global _start

_start:
    ; Mostrar mensaje 1
    mov eax, 4          ; syscall write
    mov ebx, 1          ; stdout
    mov ecx, msg1       ; Dirección del mensaje
    mov edx, 25         ; Longitud del mensaje
    int 0x80            ; Llamado al sistema

    ; Leer primer número
    mov eax, 3          ; syscall read
    mov ebx, 0          ; stdin
    mov ecx, num1       ; Dirección donde guardar el número
    mov edx, 2          ; Longitud (1 dígito + Enter)
    int 0x80            ; Llamado al sistema

    ; Mostrar mensaje 2
    mov eax, 4
    mov ebx, 1
    mov ecx, msg2
    mov edx, 26
    int 0x80

    ; Leer segundo número
    mov eax, 3
    mov ebx, 0
    mov ecx, num2
    mov edx, 2
    int 0x80

    ; Convertir caracteres ASCII a números
    mov al, [num1]  
    sub al, '0'      ; Convierte de ASCII a valor numérico
    mov bl, [num2]  
    sub bl, '0'

    ; Sumar los números
    add al, bl
    add al, '0'      ; Convertir resultado de vuelta a ASCII
    mov [resultado], al

    ; Mostrar mensaje del resultado
    mov eax, 4
    mov ebx, 1
    mov ecx, msg_result
    mov edx, 13
    int 0x80

    ; Mostrar el resultado
    mov eax, 4
    mov ebx, 1
    mov ecx, resultado
    mov edx, 1
    int 0x80

    ; Imprimir salto de línea
    mov eax, 4
    mov ebx, 1
    mov ecx, newline
    mov edx, 1
    int 0x80

    ; Salir del programa
    mov eax, 1          ; syscall exit
    xor ebx, ebx        ; Código de salida 0
    int 0x80`;

  const ciclo = `;1.- ENSAMBLAMOS: nasm -f elf32 ciclo.asm -o ciclo.o
;2.- ENLAZAMOS: ld -m elf_i386 -s -o ciclo ciclo.o
;3.- EJECUTAMOS: ./ciclo

section .data
    hello db "Hello", 10  ; "Hello" seguido de un salto de línea
    hello_len equ $ - hello
    N equ 10  ; Número de repeticiones

section .text
    global _start

_start:
    mov ecx, N      ; Usamos ECX como contador

.loop:
    push ecx        ; Guardamos el valor del contador
    mov edx, hello_len  ; Longitud del mensaje
    mov ecx, hello  ; Dirección del mensaje
    mov ebx, 1      ; Descriptor de archivo (stdout)
    mov eax, 4      ; syscall: sys_write
    int 0x80        ; Llamada al sistema
    pop ecx         ; Restauramos el contador
    loop .loop      ; Decrementa ECX y salta si no es 0

    mov eax, 1      ; syscall: sys_exit
    xor ebx, ebx    ; Código de salida 0
    int 0x80        ; Llamada al sistema`;

  const sumaYCicloCodigo = `;1.- ENSAMBLAMOS: nasm -f elf32 suma_y_ciclo.asm -o suma_y_ciclo.o
;2.- ENLAZAMOS: ld -m elf_i386 -s -o suma_y_ciclo suma_y_ciclo.o
;3.- EJECUTAMOS: ./suma_y_ciclo


section .bss
    num1 resb 1    ; Reservar espacio para num1
    num2 resb 1    ; Reservar espacio para num2
    resultado resb 1  ; Reservar espacio para el resultado
    aux resb 1  ; Reservar espacio para el resultado


section .data
    msg1 db "Ingresa el primer número?", 0
    msg2 db "Ingresa el segundo número?", 0
    msg_result db "La suma es: ", 0
    newline db 10, 0  ; Salto de línea

    hello db "Hello", 10  ; "Hello" seguido de un salto de línea
    hello_len equ $ - hello


section .text
    global _start

_start:
    ; Mostrar mensaje 1
    mov eax, 4          ; syscall write
    mov ebx, 1          ; stdout
    mov ecx, msg1       ; Dirección del mensaje
    mov edx, 25         ; Longitud del mensaje
    int 0x80            ; Llamado al sistema

    ; Leer primer número
    mov eax, 3          ; syscall read
    mov ebx, 0          ; stdin
    mov ecx, num1       ; Dirección donde guardar el número
    mov edx, 2          ; Longitud (1 dígito + Enter)
    int 0x80            ; Llamado al sistema

    ; Mostrar mensaje 2
    mov eax, 4
    mov ebx, 1
    mov ecx, msg2
    mov edx, 26
    int 0x80

    ; Leer segundo número
    mov eax, 3
    mov ebx, 0
    mov ecx, num2
    mov edx, 2
    int 0x80

    ; Convertir caracteres ASCII a números
    mov al, [num1]  
    sub al, '0'      ; Convierte de ASCII a valor numérico
    mov bl, [num2]  
    sub bl, '0'

    ; Sumar los números
    add al, bl
    add al, '0'      ; Convertir resultado de vuelta a ASCII
    mov [resultado], al
 

    ; Mostrar mensaje del resultado
    mov eax, 4
    mov ebx, 1
    mov ecx, msg_result
    mov edx, 13
    int 0x80

    ; Mostrar el resultado
    mov eax, 4
    mov ebx, 1
    mov ecx, resultado
    mov edx, 1
    int 0x80

    ; Imprimir salto de línea
    mov eax, 4
    mov ebx, 1
    mov ecx, newline
    mov edx, 1
    int 0x80

    ;la suma para el ciclo (HAY QUE VOLVER A HACERLA)

    ; Convertir caracteres ASCII a números
    mov al, [num1]  
    sub al, '0'      ; Convierte de ASCII a valor numérico
    mov bl, [num2]  
    sub bl, '0'

    add al, bl
    mov [resultado], al
    movzx ecx, byte[resultado] ;MOVZX — Move With Zero-Extend

.loop:
    push ecx        ; Guardamos el valor del contador
    mov edx, hello_len  ; Longitud del mensaje
    mov ecx, hello  ; Dirección del mensaje
    mov ebx, 1      ; Descriptor de archivo (stdout)
    mov eax, 4      ; syscall: sys_write
    int 0x80        ; Llamada al sistema
    pop ecx         ; Restauramos el contador
    loop .loop      ; Decrementa ECX y salta si no es 0

    mov eax, 1      ; syscall: sys_exit
    xor ebx, ebx    ; Código de salida 0
    int 0x80        ; Llamada al sistema`;

  const calculadoraCodigo = `;1.- ENSAMBLAMOS: nasm -f elf32 calculadora.asm -o calculadora.o
;2.- ENLAZAMOS: ld -m elf_i386 -s -o calculadora calculadora.o
;3.- EJECUTAMOS: ./calculadora

section .data
 
   ; Mensajes
 
   msg1     db    10,'-Calculadora-',10,0
   lmsg1    equ      $ - msg1
 
   msg2     db    10,'Numero 1: ',0
   lmsg2    equ      $ - msg2
 
   msg3     db    'Numero 2: ',0
   lmsg3    equ      $ - msg3
 
   msg4     db    10,'1. Sumar',10,0
   lmsg4    equ      $ - msg4
 
   msg5     db    '2. Restar',10,0
   lmsg5    equ      $ - msg5
 
   msg6     db    '3. Multiplicar',10,0
   lmsg6    equ      $ - msg6
 
   msg7     db    '4. Dividir',10,0
   lmsg7    equ      $ - msg7
 
   msg8     db    'Operacion: ',0
   lmsg8    equ      $ - msg8
 
   msg9     db    10,'Resultado: ',0
   lmsg9    equ      $ - msg9
 
   msg10    db    10,'Opcion Invalida',10,0
   lmsg10      equ      $ - msg10
 
   nlinea      db    10,10,0
   lnlinea     equ      $ - nlinea
 
section .bss
 
   ; Espacios en la memoria reservados para almacenar los valores introducidos por el usuario y el resultado de la operacion.
 
   opcion:     resb  2
   num1:       resb  2
   num2:       resb  2
   resultado:  resb  2
 
section .text
 
   global _start
 
_start:
 
   ; Imprimimos en pantalla el mensaje 1
   mov eax, 4
   mov ebx, 1
   mov ecx, msg1
   mov edx, lmsg1
   int 80h
 
   ; Imprimimos en pantalla el mensaje 2
   mov eax, 4
   mov ebx, 1
   mov ecx, msg2
   mov edx, lmsg2
   int 80h
 
   ; Obtenemos el numero 1
   mov eax, 3
   mov ebx, 0
   mov ecx, num1
   mov edx, 2
   int 80h
 
   ; Imprimimos en pantalla el mensaje 3
   mov eax, 4
   mov ebx, 1
   mov ecx, msg3
   mov edx, lmsg3
   int 80h
 
   ; Obtenemos el numero 2
   mov eax, 3
   mov ebx, 0
   mov ecx, num2
   mov edx, 2
   int 80h
 
   ; Imprimimos en pantalla el mensaje 4
   mov eax, 4
   mov ebx, 1
   mov ecx, msg4
   mov edx, lmsg4
   int 80h
 
   ; Imprimimos en pantalla el mensaje 5
   mov eax, 4
   mov ebx, 1
   mov ecx, msg5
   mov edx, lmsg5
   int 80h
 
   ; Imprimimos en pantalla el mensaje 6
   mov eax, 4
   mov ebx, 1
   mov ecx, msg6
   mov edx, lmsg6
   int 80h
 
   ; Imprimimos en pantalla el mensaje 7
   mov eax, 4
   mov ebx, 1
   mov ecx, msg7
   mov edx, lmsg7
   int 80h
 
   ; Print on screen the message 8
   mov eax, 4
   mov ebx, 1
   mov ecx, msg8
   mov edx, lmsg8
   int 80h
 
   ; Obtenemos la opcion seleccionada por el usuario
   mov ebx, 0
   mov ecx, opcion
   mov edx, 2
   mov eax, 3
   int 80h
 
   mov ah, [opcion]  ; Movemos la opcion seleccionada a el registro AH
   sub ah, '0'    ; Convertimos el valor ingresado de ascii a decimal
 
   ; Comparamos el valor ingresado por el usuario para saber que operacion realizar.
   ; JE = Jump if equal = Saltamos si el valor comparado es igual
 
   cmp ah, 1
   je sumar
 
   cmp ah, 2
   je restar
 
   cmp ah, 3
   je multiplicar
 
   cmp ah, 4
   je dividir
 
   ; Si el valor ingresado no cumple con ninguna de las condiciones anteriores entonces mostramos un mensaje de error y finalizamos
   ; la ejecucion del programa
   mov eax, 4
   mov ebx, 1
   mov ecx, msg10
   mov edx, lmsg10
   int 80h
 
   jmp salir
 
sumar:
   ; Movemos los numeros ingresados a los registro AL y BL
   mov al, [num1]
   mov bl, [num2]
 
   ; Convertimos los valores ingresados de ascii a decimal
   sub al, '0'
   sub bl, '0'
 
   ; Sumamos el registro AL y BL
   add al, bl
 
   ; Convertimos el resultado de la suma de decimal a ascii
   add al, '0'
 
   ; Movemos el resultado a un espacio reservado en la memoria
   mov [resultado], al
 
   ; Imprimimos en pantalla el mensaje 9
   mov eax, 4
   mov ebx, 1
   mov ecx, msg9
   mov edx, lmsg9
   int 80h
 
   ; Imprimimos en pantalla el resultado
   mov eax, 4
   mov ebx, 1
   mov ecx, resultado
   mov edx, 2
   int 80h
 
   ; Finalizamos el programa
   jmp salir
 
restar:
   ; Movemos los numeros ingresados a los registro AL y BL
   mov al, [num1]
   mov bl, [num2]
 
   ; Convertimos los valores ingresados de ascii a decimal
   sub al, '0'
   sub bl, '0'
 
   ; Restamos el registro AL y BL
   sub al, bl
 
   ; Convertimos el resultado de la resta de decimal a ascii
   add al, '0'
 
   ; Movemos el resultado a un espacio reservado en la memoria
   mov [resultado], al
 
   ; Imprimimos en pantalla el mensaje 9
   mov eax, 4
   mov ebx, 1
   mov ecx, msg9
   mov edx, lmsg9
   int 80h
 
   ; Imprimimos en pantalla el resultado
   mov eax, 4
   mov ebx, 1
   mov ecx, resultado
   mov edx, 1
   int 80h
 
   ; Finalizamos el programa
   jmp salir
 
multiplicar:
 
   ; Movemos los numeros ingresados a los registro AL y BL
   mov al, [num1]
   mov bl, [num2]
 
   ; Convertimos los valores ingresados de ascii a decimal
   sub al, '0'
   sub bl, '0'
 
   ; Multiplicamos. AX = AL X BL
   mul bl
 
   ; Convertimos el resultado de la resta de decimal a ascii
   add ax, '0'
 
   ; Movemos el resultado a un espacio reservado en la memoria
   mov [resultado], ax
 
   ; Imprimimos en pantalla el mensaje 9
   mov eax, 4
   mov ebx, 1
   mov ecx, msg9
   mov edx, lmsg9
   int 80h
 
   ; Imprimimos en pantalla el resultado
   mov eax, 4
   mov ebx, 1
   mov ecx, resultado
   mov edx, 1
   int 80h
 
   ; Finalizamos el programa
   jmp salir
 
dividir:
 
   ; Movemos los numeros ingresados a los registro AL y BL
   mov al, [num1]
   mov bl, [num2]
 
   ; Igualamos a cero los registros DX y AH
   mov dx, 0
   mov ah, 0
 
   ; Convertimos los valores ingresados de ascii a decimal
   sub al, '0'
   sub bl, '0'
 
   ; Division. AL = AX / BL. AX = AH:AL
   div bl
 
   ; Convertimos el resultado de la resta de decimal a ascii
   add ax, '0'
 
   ; Movemos el resultado a un espacio reservado en la memoria
   mov [resultado], ax
 
   ; Print on screen the message 9
   mov eax, 4
   mov ebx, 1
   mov ecx, msg9
   mov edx, lmsg9
   int 80h
 
   ; Imprimimos en pantalla el resultado
   mov eax, 4
   mov ebx, 1
   mov ecx, resultado
   mov edx, 1
   int 80h
 
   ; Finalizamos el programa
   jmp salir
 
salir:
   ; Imprimimos en pantalla dos nuevas lineas
   mov eax, 4
   mov ebx, 1
   mov ecx, nlinea
   mov edx, lnlinea
   int 80h
 
   ; Finalizamos el programa
   mov eax, 1
   mov ebx, 0
   int 80h`;

   const calculadoragcc = `section .data
    prompt1 db "Ingrese el primer numero: ", 0
    prompt2 db "Ingrese el segundo numero: ", 0
    prompt3 db "Ingrese la operacion (+, -, *, /): ", 0
    fmt_in_num db "%d", 0
    fmt_in_char db " %c", 0
    fmt_out db "Resultado: %d", 10, 0
    error_msg db "Error: Division por cero", 10, 0

section .bss
    num1 resd 1
    num2 resd 1
    oper resb 1
    result resd 1

section .text
    global main
    extern printf, scanf

main:
    ; Pedir primer número
    push prompt1
    call printf
    add esp, 4

    push num1
    push fmt_in_num
    call scanf
    add esp, 8

    ; Pedir segundo número
    push prompt2
    call printf
    add esp, 4

    push num2
    push fmt_in_num
    call scanf
    add esp, 8

    ; Pedir operación
    push prompt3
    call printf
    add esp, 4

    push oper
    push fmt_in_char
    call scanf
    add esp, 8

    ; Cargar operandos en registros
    mov eax, [num1]  ; Cargar primer número en EAX
    mov ebx, [num2]  ; Cargar segundo número en EBX

    ; Evaluar la operación ingresada
    mov cl, [oper]   
    cmp cl, '+'
    je sumar
    cmp cl, '-'
    je restar
    cmp cl, '*'
    je multiplicar
    cmp cl, '/'
    je dividir
    jmp fin          ; Si no es una operación válida, termina

sumar:
    add eax, ebx
    jmp guardar_resultado

restar:
    sub eax, ebx
    jmp guardar_resultado

multiplicar:
    imul ebx
    jmp guardar_resultado

dividir:
    cmp ebx, 0
    je error_division
    cdq            ; Extender signo en EDX:EAX para división
    idiv ebx
    jmp guardar_resultado

error_division:
    push error_msg
    call printf
    add esp, 4
    jmp fin

guardar_resultado:
    mov [result], eax

    ; Imprimir resultado
    push dword [result]
    push fmt_out
    call printf
    add esp, 8

fin:
    xor eax, eax
    ret`;
   const es_par = `;nasm -f elf32 es_par.asm -o es_par.o
;gcc -m32 es_par.o -o es_par -no-pie
;./es_par

section .data
    num dd 10
    par db "El número es par", 10, 0
    inpar db "El número es impar", 10, 0

section .text
    global main
    extern printf

main:
    mov eax, dword [num]
    test eax, 1         ; Comprobar si el bit menos significativo es 1
    jz print_par       ; "saltar si no es cero".
    push inpar
    call printf
    add esp, 4
    jmp end_programa

print_par:
    push par
    call printf
    add esp, 4

end_programa:
    xor eax, eax
    ret`;
   const factorial = `;nasm -f elf32 factorial.asm -o factorial.o
;gcc -m32 factorial.o -o factorial -no-pie
;./factorial

section .data
    num dd 5
    fmt db "Factorial: %d", 10, 0

section .bss
    res resb 4

section .text
    global main
    extern printf

main:
    mov eax, 1       ; Inicializar resultado en 1
    mov ecx, dword [num]  ; Cargar número

factorial_loop:
    cmp ecx, 1       ; Si ecx <= 1, termina
    jle end_loop
    imul eax, ecx    ; Multiplicar eax * ecx
    dec ecx          ; Decrementar contador
    jmp factorial_loop

end_loop:
    mov [res], eax   ; Guardar resultado

    push dword [res]
    push fmt
    call printf
    add esp, 8

    xor eax, eax
    ret`;
   const leergcc = `; nasm -f elf32 leer.asm -o leer.o
; gcc -m32 leer.o -o leer -no-pie
; ./leer

section .data
    prompt db "Ingrese un valor: ", 0
    fmt_in db "%d", 0
    fmt_out db "Valor ingresado: %d", 10, 0

section .bss
    num resd 1  ; Espacio para almacenar el número ingresado

section .text
    global main
    extern printf, scanf

main:
    ; Mostrar mensaje de entrada
    push prompt
    call printf
    add esp, 4

    ; Leer el valor desde la consola
    push num
    push fmt_in
    call scanf
    add esp, 8

    ; Imprimir el valor ingresado
    push dword [num]
    push fmt_out
    call printf
    add esp, 8

    ; Terminar el programa
    xor eax, eax
    ret`;
   const piramide = `; nasm -f elf32 piramide.asm -o piramide.o
; gcc -m32 piramide.o -o piramide -no-pie
; ./piramide

section .data
    prompt db "Ingrese el numero de filas: ", 0
    fmt_in db "%d", 0
    fmt_out db "%c", 0
    newline db 10, 0
    space db " ", 0
    asterisk db " * ", 0

section .bss
    filas resd 1

section .text
    global main
    extern printf, scanf

main:
    ; Pedir el número de filas
    push prompt
    call printf
    add esp, 4

    push filas
    push fmt_in
    call scanf
    add esp, 8

    ; Cargar el número de filas en ECX
    mov ecx, [filas]
    mov edi, 1   ; Controla la cantidad de asteriscos por fila

fila_loop:
    push ecx  ; Guardar ECX en la pila

    ; Imprimir espacios antes de los asteriscos
    mov eax, [filas]
    sub eax, edi  ; Calcular los espacios a imprimir
    mov ebx, eax

espacio_loop:
    cmp ebx, 0
    je imprimir_asteriscos
    push space
    call printf
    add esp, 4
    dec ebx
    jmp espacio_loop

imprimir_asteriscos:
    mov ebx, edi  ; EBX controla la cantidad de asteriscos en la fila

asterisco_loop:
    cmp ebx, 0
    je nueva_linea
    push asterisk
    call printf
    add esp, 4
    dec ebx
    jmp asterisco_loop

nueva_linea:
    push newline
    call printf
    add esp, 4

    pop ecx   ; Restaurar ECX
    inc edi   ; Aumentar la cantidad de asteriscos en la siguiente fila
    loop fila_loop  ; Repetir hasta completar todas las filas

    xor eax, eax
    ret`;
   const raiz = `;nasm -f elf32 raiz.asm -o raiz.o
;gcc -m32 raiz.o -o raiz -no-pie
;./raiz

section .data
    num dd 25.0             ; Número de entrada
    fmt db "Raíz cuadrada: %lf", 10, 0  ; %lf para double

section .bss
    res resq 1              ; Espacio para un número de 8 bytes (double)

section .text
    global main
    extern printf

main:
    finit                   ; Inicializar la FPU para "unidades de punto flotante"
    fld dword [num]         ; Cargar el número en la FPU
    fsqrt                   ; Calcular la raíz cuadrada
    fstp qword [res]        ; Guardar el resultado en 64 bits

    push dword [res+4]      ; Parte alta del double
    push dword [res]        ; Parte baja del double
    push fmt
    call printf
    add esp, 12             ; Limpiar la pila

    xor eax, eax
    ret`;
   const sumagcc = `nasm -f elf32 suma.asm -o suma.o
;gcc -m32 suma.o -o suma -no-pie
;./suma

;sudo apt install gcc-multilib

section .data
    num1 dd 500
    num2 dd 10
    fmt db "Resultado: %d", 10, 0

section .bss
    res resb 4

section .text
    global main
    extern printf

main:
    mov eax, dword [num1]  ; Cargar num1 en eax
    add eax, dword [num2]  ; Sumar num2
    mov [res], eax         ; Guardar resultado

    push dword [res]       ; Pasar el resultado a printf
    push fmt
    call printf
    add esp, 8             ; Limpiar pila

    xor eax, eax
    ret`;

    return (
      
      <div className="intro-nasm">
        <h1 className="intro-nasm-title">Ejercicios Prácticos de NASM y GCC</h1>
    
        {/* Contenedor principal para NASM y GCC */}
        <div className="main-container">
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
                        <Link to="/programacion-avanzada" className="sidebar-link">
                          Programación Avanzada
                        </Link>
                      </li>
                      <li>
                        <Link to="/ejercicios" className="sidebar-link active">
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
          {/* Contenedor para NASM */}
          <div className="nasm-container">
            {/* Ejercicio 1: Hola Mundo */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h2 className="intro-nasm-section-title">Ejercicio 1: Hola Mundo</h2>
                <p className="intro-nasm-text">
                  Un programa básico en NASM que imprime "Hola, mundo!" en la consola.
                </p>
                <pre>
                  <code>{holaCodigo}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(holaCodigo)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(holaCodigo, "hola.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
                <img src={hola} alt="hola" />
              </div>
            </section>
            {/* Ejercicio 2: Leer */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h2 className="intro-nasm-section-title">Ejercicio 2: Leer Número</h2>
                <p className="intro-nasm-text">
                Un programa que lee un número ingresado por el usuario y lo muestra en la consola.
                </p>
                <pre>
                  <code>{leerCodigo}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(leerCodigo)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(leerCodigo, "leer.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={leer} alt="leer" />
              </div>
            </section>
            {/* Ejercicio 3: Suma */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h2 className="intro-nasm-section-title">Ejercicio 3: Suma de Dos Números</h2>
                <p className="intro-nasm-text">
                Un programa que suma dos números ingresados por el usuario y muestra el resultado.
                </p>
                <pre>
                  <code>{sumaCodigo}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(sumaCodigo)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(sumaCodigo, "suma.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={suma} alt="suma" />
              </div>
            </section>
            {/* EEjercicio 4: Ciclo */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h2 className="intro-nasm-section-title">Ejercicio 4: Ciclo</h2>
                <p className="intro-nasm-text">
                Un programa que hace un ciclo que imprime hola.
                </p>
                <pre>
                  <code>{ciclo}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(ciclo)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(ciclo, "ciclo.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={cicloIm} alt="cicloIm" />
              </div>
            </section>
            {/* Ejercicio 5: Suma y Ciclo  */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h2 className="intro-nasm-section-title">Ejercicio 5: Suma y Ciclo</h2>
                <p className="intro-nasm-text">
                Un programa que suma dos números y luego imprime "Hello" en un ciclo.
                </p>
                <pre>
                  <code>{sumaYCicloCodigo}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(sumaYCicloCodigo)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(sumaYCicloCodigo, "suma_y_ciclo.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={suma_y_ciclo} alt="suma_y_ciclo" />
              </div>
            </section>
            
            {/* Ejercicio 6: Calculadora */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h2 className="intro-nasm-section-title">Ejercicio 6: Calculadora</h2>
                <p className="intro-nasm-text">
                Una calculadora básica que permite sumar, restar, multiplicar y dividir dos números.
                </p>
                <pre>
                  <code>{calculadoraCodigo}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(calculadoraCodigo)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(calculadoraCodigo, "calculadora.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={calculadora1} alt="calculadora1" />
              <img src={calculadora2} alt="calculadora2" />
              </div>
            </section>
            {/* Repite este patrón para los demás ejercicios de NASM */}
          </div>
    
          {/* Contenedor para GCC */}
          <div className="gcc-container">
            <h2 className="intro-nasm-section-title">Ejercicios con GCC</h2>
    
            {/* Ejercicio 1: leer con GCC */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h3 className="intro-nasm-section-title">Leer con GCC</h3>
                <p className="intro-nasm-text">
                  Un programa que lee un número ingresado por el usuario y lo muestra en la consola.
                </p>
                <pre>
                  <code>{leergcc}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(leergcc)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(leergcc, "leer_gcc.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={leergccIMG} alt="leergcc" />
              </div>
            </section>
    
            {/* Ejercicio 2: suma con GCC */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h3 className="intro-nasm-section-title">Suma con GCC</h3>
                <p className="intro-nasm-text">
                  Un programa que suma dos números y muestra el resultado en la consola.
                </p>
                <pre>
                  <code>{sumagcc}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(sumagcc)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(sumagcc, "suma_gcc.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={sumagccIMG} alt="sumagcc" />
              </div>
            </section>
    
            {/* Ejercicio 3: piramide con GCC */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h3 className="intro-nasm-section-title">Piramide con GCC</h3>
                <p className="intro-nasm-text">
                  Un programa que imprime una pirámide de asteriscos en la consola.
                </p>
                <pre>
                  <code>{piramide}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(piramide)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(piramide, "raiz_gcc.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={piramideIMG} alt="piramide" />
              </div>
            </section>
            {/* Ejercicio 4: es_par */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h3 className="intro-nasm-section-title">Es par con GCC</h3>
                <p className="intro-nasm-text">
                  Un programa que determina si un número es par o impar.
                </p>
                <pre>
                  <code>{es_par}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(es_par)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(es_par, "es_par_gcc.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={es_parIMG} alt="piramide" />
              </div>
            </section>
            {/* Ejercicio 5: calculadora con GCC */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h3 className="intro-nasm-section-title">Calculadora con GCC</h3>
                <p className="intro-nasm-text">
                  Una calculadora que hace operaciones basicas
                </p>
                <pre>
                  <code>{calculadoragcc}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(calculadoragcc)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(calculadoragcc, "calculadora_gcc.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={calculadoragccIMG} alt="calculadoragcc" />
              </div>
            </section>
            {/* Ejercicio 6: Raíz cuadrada con GCC */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h3 className="intro-nasm-section-title">Raíz cuadrada con GCC</h3>
                <p className="intro-nasm-text">
                  Un programa que calcula la raíz cuadrada de un número.
                </p>
                <pre>
                  <code>{raiz}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(raiz)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(raiz, "raiz_gcc.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={raizIMG} alt="raiz" />
              </div>
            </section>
            {/* Ejercicio 7: factorial con GCC */}
            <section className="intro-nasm-section">
              <div className="intro-nasm-code">
                <h3 className="intro-nasm-section-title">Factorial con GCC</h3>
                <p className="intro-nasm-text">
                  Un programa que calcula el factorial de un número.
                </p>
                <pre>
                  <code>{factorial}</code>
                </pre>
                <div className="intro-nasm-buttons">
                  <button className="intro-nasm-button" onClick={() => copiarCodigo(factorial)}>
                    Copiar código
                  </button>
                  <button className="intro-nasm-button" onClick={() => descargarCodigo(factorial, "factorial.asm")}>
                    Descargar código (.asm)
                  </button>
                </div>
              </div>
              <div className="intro-nasm-images">
              <img src={factorialIMG} alt="factorial" />
              </div>
            </section>

          </div>
        </div>
    
        {/* Botón para volver al curso */}
        <Link to="/">
          <button className="intro-nasm-button">Volver</button>
        </Link>
      </div>
    );
};


export default EjerciciosNASM;