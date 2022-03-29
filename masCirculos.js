let circulos = [];
let contador = 0;
let paleta;

function setup() {
    colorMode(HSB);
    createCanvas(windowWidth, windowHeight);
    ellipseMode(RADIUS);
    paleta = new Paleta(random(360), 2);
    console.log(paleta.hue);
}

function draw() {
    //console.log(circulos.length);
    background(50);
    noStroke();
    fill(52, 19, 70);
    rect(30, 30, width - 60, height - 60);
    noFill();
    //fill(random(360), random(50, 100), 54);
    //stroke(255);

    let circulo = nuevoCirculo();
    if (circulo != null) {
        circulos.push(circulo);
        contador = 0;
    } else {
        contador++;
        //console.log(contador);
        if (contador > 1000) {
            noLoop();
            console.log("FIN");
        }
    }
    for (let i = 0; i < circulos.length; i++) {
        circulos[i].dibuja();
    }
    chequeaCrecimiento();
}

// Circulo / null
function nuevoCirculo() {
    //let centro = createVector(mouseX, mouseY);
    let centro = createVector(
        random(width * 0.05, width * 0.95),
        random(height * 0.05, height * 0.95)
    );
    let valido = true;
    valido = esElNuevoCirculoValido(centro);

    return valido
        ? new Circulo(
              centro.x,
              centro.y,
              1,
              random(paleta.coloresPorCantidad())
          )
        : null;
}

// boolean
function esElNuevoCirculoValido(centroNuevoCirculo) {
    for (let circulo of circulos) {
        if (centroNuevoCirculo.dist(circulo.centro) <= circulo.r + 10) {
            return false;
        }
    }
    return true;
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
    coloresDeLaPaleta = [];
    constructor(hue, cant) {
        this.hue = floor(hue);
        this.coloresDeLaPaleta = this.coloresPorCantidad(cant);
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
        //console.log(color);
        return color;
    }

    // color HSB
    colorPrimario() {
        let color = [];
        color.push(random(this.hue - 5, this.hue + 5));
        color.push(random(50, 100));
        color.push(random(35, 45));
        //console.log(color);
        return color;
    }

    // color HSB
    colorSecundario() {
        let color = [];
        color.push(random(this.hue + 15, this.hue + 25));
        color.push(random(50, 100));
        color.push(random(35, 45));
        //console.log(color);
        return color;
    }

    // color HSB
    colorTerciario() {
        let color = [];
        color.push(random(this.hue - 15, this.hue - 25));
        color.push(random(50, 100));
        color.push(random(35, 45));
        //console.log(color);
        return color;
    }

    // color HSB
    colorOpuesto() {
        let color = [];
        color.push(random(this.hueMasAngulo(170), this.hueMasAngulo(190)));
        color.push(random(50, 100));
        color.push(random(35, 45));
        //console.log(color);
        return color;
    }

    // array colores HSB
    colores() {
        let colores = [];
        colores.push(this.colorPrimario());
        colores.push(this.colorSecundario());
        colores.push(this.colorTerciario());
        colores.push(this.colorOpuesto());
        return colores;
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
        //this.colorRelleno = [random(360), random(50, 100), 40];
        this.colorRelleno = color;
    }

    // display
    dibuja() {
        fill(this.colorRelleno);
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
            this.x + this.r >= width * 0.95 ||
            this.x - this.r <= width * 0.05 ||
            this.y + this.r >= height * 0.95 ||
            this.y - this.r <= height * 0.05
        );
    }
}

function mousePressed() {
    circulos = [];
}
