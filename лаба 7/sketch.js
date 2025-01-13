let tool = 'pencil'; // Текущий инструмент
let strokeColor = '#000000'; // Цвет карандаша
let fillColor = '#ffffff'; // Цвет заливки фигуры
let strokeWeightValue = 2; // Толщина линии
let shapes = []; // Хранилище фигур для отрисовки

function setup() {
    createCanvas(800, 600);
    background(255);

    createUI(); // Создаём элементы управления
}

function draw() {
    if (mouseIsPressed && tool === 'pencil') {
        stroke(strokeColor);
        strokeWeight(strokeWeightValue);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

// Отслеживаем действия пользователя при клике
function mousePressed() {
    if (tool === 'circle') {
        let circle = {
            x: mouseX,
            y: mouseY,
            size: 50,
            fill: fillColor,
            stroke: strokeColor,
            strokeWeight: strokeWeightValue,
        };
        shapes.push(circle);
    }
}

// Отображение всех фигур
function drawShapes() {
    for (let shape of shapes) {
        fill(shape.fill);
        stroke(shape.stroke);
        strokeWeight(shape.strokeWeight);
        ellipse(shape.x, shape.y, shape.size, shape.size);
    }
}

// Создание панели управления
function createUI() {
    // Кнопка для выбора "обычного карандаша"
    let pencilButton = createButton('Обычный карандаш');
    pencilButton.mousePressed(() => {
        tool = 'pencil';
        strokeWeightValue = 2;
    });

    // Кнопка для выбора "толстого карандаша"
    let thickPencilButton = createButton('Толстый карандаш');
    thickPencilButton.mousePressed(() => {
        tool = 'pencil';
        strokeWeightValue = 8;
    });

    // Кнопка для выбора "рисования круга"
    let circleButton = createButton('Круг');
    circleButton.mousePressed(() => {
        tool = 'circle';
    });

    // Кнопки выбора цвета карандаша
    createDiv('Цвет карандаша:');
    ['#000000', '#ff0000', '#00ff00', '#0000ff'].forEach((color) => {
        let colorButton = createButton('');
        colorButton.style('background-color', color);
        colorButton.style('width', '20px');
        colorButton.style('height', '20px');
        colorButton.style('margin', '5px');
        colorButton.mousePressed(() => (strokeColor = color));
    });

    // Кнопки выбора цвета заливки
    createDiv('Цвет заливки:');
    ['#ffffff', '#ffaaaa', '#aaffaa', '#aaaaff'].forEach((color) => {
        let fillColorButton = createButton('');
        fillColorButton.style('background-color', color);
        fillColorButton.style('width', '20px');
        fillColorButton.style('height', '20px');
        fillColorButton.style('margin', '5px');
        fillColorButton.mousePressed(() => (fillColor = color));
    });

    // Кнопка "Очистить холст"
    let clearButton = createButton('Очистить холст');
    clearButton.mousePressed(() => {
        background(255);
        shapes = [];
    });
}