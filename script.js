// Clase base para el juego del Ahorcado
class JuegoAhorcado {
    constructor(palabras) {
        if (new.target === JuegoAhorcado) {
            throw new Error('No se puede instanciar la clase abstracta JuegoAhorcado');
        }
        this.palabras = palabras;
        this.palabraSeleccionada = '';
        this.palabraOculta = '';
        this.intentosRestantes = 6;
        this.letrasAdivinadas = new Set();
        this.imagenAhorcado = document.getElementById('hangmanImage');
        this.imagenes = [
            'images/ahorcado0.png',
            'images/ahorcado1.png',
            'images/ahorcado2.png',
            'images/ahorcado3.png',
            'images/ahorcado4.png',
            'images/ahorcado5.png',
            'images/ahorcado6.png',
            'images/ahorcado7.png'
        ];
        this.actualizarImagen(); // Inicializar la imagen del ahorcado
    }

    // Método abstracto que las subclases deben implementar
    seleccionarPalabra() {
        throw new Error('El método seleccionarPalabra debe ser implementado por las subclases');
    }

    actualizarPalabraDisplay() {
        document.getElementById('wordDisplay').textContent = this.palabraOculta.split('').join(' ');
    }

    actualizarImagen() {
        this.imagenAhorcado.src = this.imagenes[6 - this.intentosRestantes];
        console.log('Imagen actualizada a:', this.imagenes[6 - this.intentosRestantes]); // Verifica que la URL sea correcta
    }

    adivinarLetra(letra) {
        if (letra.length !== 1 || !/^[a-z]$/.test(letra)) {
            throw new Error('Por favor, ingresa una letra válida.');
        }

        if (this.letrasAdivinadas.has(letra)) {
            throw new Error('Ya adivinaste esa letra.');
        }

        this.letrasAdivinadas.add(letra);

        if (this.palabraSeleccionada.includes(letra)) {
            this.palabraOculta = this.palabraOculta.split('').map((char, index) =>
                this.palabraSeleccionada[index] === letra ? letra : char
            ).join('');
        } else {
            this.intentosRestantes--;
            this.actualizarImagen(); // Asegúrate de que esto se llama
        }

        this.actualizarPalabraDisplay();

        if (this.palabraOculta === this.palabraSeleccionada) {
            throw new Error('¡Ganaste! La palabra es ' + this.palabraSeleccionada);
        } else if (this.intentosRestantes === 0) {
            throw new Error('Perdiste. La palabra era ' + this.palabraSeleccionada);
        } else {
            document.getElementById('attemptCount').textContent = this.intentosRestantes;
        }
    }

    reiniciarJuego() {
        this.seleccionarPalabra();
        this.actualizarPalabraDisplay();
        this.intentosRestantes = 6;
        this.actualizarImagen(); // Reiniciar la imagen del ahorcado
        document.getElementById('attemptCount').textContent = this.intentosRestantes;
        document.getElementById('message').textContent = 'Adivina la palabra!';
    }
}
