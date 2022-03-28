let circulos = [];
let contador = 0;

function setup() {
    colorMode(HSL);
    createCanvas(windowWidth, windowHeight);
    ellipseMode(RADIUS);
}

function draw() {
    //console.log(circulos.length);
    background(50);
    noStroke();
    fill(52, 19, 70);
    rect(width * 0.025, height * 0.025, width * 0.95, height * 0.95);
    noFill();
    //fill(random(360), random(50, 100), 54);
    //stroke(255);

    let circulo = nuevoCirculo();
    if (circulo != null) {
        circulos.push(circulo);
        contador = 0;
    } else {
        contador++;
        console.log(contador);
        if (contador > 1000) {
            noLoop();
            console.log("FIN");
        }
    }
    for (let i = 0; i < circulos.length; i++) {
        circulos[i].dibuja();
        //circulos[i].crece();
    }
}

// Circulo / null
function nuevoCirculo() {
    //let centro = createVector(mouseX, mouseY);
    let centro = createVector(
        random(width * 0.05, width * 0.95),
        random(height * 0.05, height * 0.95)
    );
    let valido = true;
    valido = nuevoCirculoValido(centro);

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

    return valido ? new Circulo(centro.x, centro.y, 1) : null;
}

function nuevoCirculoValido(centroNuevoCirculo) {
    for (let circulo of circulos) {
        if (centroNuevoCirculo.dist(circulo.centro) <= circulo.r + 10) {
            return false;
        }
    }
    return true;
}

class Circulo {
    creciendo;
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.centro = createVector();
        this.centro.set(x, y);
        this.creciendo = true;
        this.colorRelleno = [random(360), random(50, 100), 54];
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
