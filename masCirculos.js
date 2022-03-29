let circulos = [];
let contador = 0;
let paleta;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    ellipseMode(RADIUS);
    paleta = nuevaPaleta();
}

function draw() {
    background(50);
    //noStroke();
    fill(52, 19, 70);
    stroke(52, 19, 70);
    rect(30, 30, width - 60, height - 60);
    noFill();

    let circulo = nuevoCirculo();
    if (circulo != null) {
        circulos.push(circulo);
        contador = 0;
    } else {
        contador++;
        if (contador > 750) {
            paleta = nuevaPaleta();
            circulos = [];
        }
    }
    lineas();
    for (let i = 0; i < circulos.length; i++) {
        circulos[i].dibuja();
    }
    chequeaCrecimiento();
}

// Paleta
function nuevaPaleta() {
    return new Paleta(random(360), ceil(random(6)));
}

// Circulo / null
function nuevoCirculo() {
    let centro = createVector(random(45, width - 45), random(45, height - 45));
    let valido = true;
    valido = esElNuevoCirculoValido(centro);

    return valido
        ? new Circulo(
              centro.x,
              centro.y,
              2,
              random(paleta.coloresPorCantidad())
          )
        : null;
}

// boolean
function esElNuevoCirculoValido(centroNuevoCirculo) {
    for (let circulo of circulos) {
        if (centroNuevoCirculo.dist(circulo.centro) <= circulo.r + 5) {
            return false;
        }
    }
    return true;
}

//void
function lineas() {
    let centroAnterior = createVector(0, 0);
    stroke(0, 100, 0, 0.1);
    for (let circulo of circulos) {
        if (centroAnterior.x != 0) {
            line(
                circulo.centro.x,
                circulo.centro.y,
                centroAnterior.x,
                centroAnterior.y
            );
        }
        centroAnterior.set(circulo.centro.x, circulo.centro.y);
    }
}

// void
function chequeaCrecimiento() {
    for (let circulo of circulos) {
        for (let otroCirculo of circulos) {
            if (circulo != otroCirculo) {
                if (
                    circulo.centro.dist(otroCirculo.centro) <=
                    circulo.r + otroCirculo.r + 5
                ) {
                    circulo.creciendo = false;
                    break;
                }
            }
        }
    }
}

class Paleta {
    constructor(hue, cant) {
        this.hue = floor(hue);
        this.cant = cant;
    }

    // int 0 - 360
    hueMasAngulo(angulo) {
        let resultante = floor(angulo + this.hue);
        //console.log(resultante);
        return resultante <= 360 ? resultante : resultante - 360;
    }

    entre360(angulo) {
        return angulo <= 360 ? angulo : angulo - 360;
    }

    //
    coloresPorCantidad() {
        let colores = [];
        let hueAngular = this.hue;
        let angulo = floor(360 / this.cant);
        for (let i = 0; i < this.cant; i++) {
            colores.push(this.colorHue(hueAngular));
            hueAngular += angulo;
            hueAngular = this.entre360(hueAngular);
        }
        return colores;
    }

    // color HSB
    colorHue(angulo) {
        let color = [];
        color.push(this.entre360(floor(random(angulo - 10, angulo + 10))));
        color.push(floor(random(50, 100)));
        color.push(floor(random(35, 55)));
        return color;
    }
}

class Circulo {
    creciendo;
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.centro = createVector();
        this.centro.set(x, y);
        this.creciendo = true;
        this.colorRelleno = color;
    }

    // display
    dibuja() {
        fill(this.colorRelleno);
        stroke(this.colorRelleno);
        ellipse(this.x, this.y, this.r - 1);
        this.crece();
    }

    // void
    crece() {
        if (!this.llegoAlBorde() && this.creciendo) {
            this.r++;
        }
    }

    // boolean
    llegoAlBorde() {
        return (
            this.x + this.r >= width - 45 ||
            this.x - this.r <= 45 ||
            this.y + this.r >= height - 45 ||
            this.y - this.r <= 45
        );
    }
}

function mousePressed() {
    circulos = [];
    paleta = nuevaPaleta();
}
