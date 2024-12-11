let editButton;
let finishButton;
let pencilButton;
let thickPencilButton;
let clearButton; // Кнопка для очистки холста

let editMode = false;
let currentShape = [];
let strokeColor = '#000000'; // Цвет рисования
let fillColor = '#FFFFFF'; // Цвет заливки

let canvas;
let isThickPencil = false; // Флаг для толстого карандаша

function setup() {
    canvas = createCanvas(800, 800);
    background(200); // Цвет фона
    noFill();
    loadPixels();

    // Кнопки для работы с фигурами
    editButton = createButton('Edit Shape');
    finishButton = createButton('Finish Shape');
    pencilButton = createButton('Normal Pencil');
    thickPencilButton = createButton('Thick Pencil');
    clearButton = createButton('Clear Canvas'); // Инициализация кнопки очистки

    // Кнопки выбора цвета
    createColorButton('Red', '#FF0000');
    createColorButton('Green', '#00FF00');
    createColorButton('Blue', '#0000FF');
    createColorButton('Yellow', '#FFFF00');

    editButton.mousePressed(() => {
        editMode = !editMode;
        editButton.html(editMode ? 'Add Vertices' : 'Edit Shape');
    });

    finishButton.mousePressed(() => {
        editMode = false;
        draw();
        loadPixels();
        currentShape = [];
    });

    pencilButton.mousePressed(() => {
        isThickPencil = false;
        strokeWeight(1); // Нормальный карандаш
    });

    thickPencilButton.mousePressed(() => {
        isThickPencil = true;
        strokeWeight(5); // Толстый карандаш
    });

    clearButton.mousePressed(() => {
        // Очистка холста
        background(200); // Возвращаем фон
        currentShape = []; // Сброс текущей формы
        editMode = false; // Выход из режима редактирования
        editButton.html('Edit Shape'); // Сброс текста кнопки редактирования
    });
}

function draw() {
    updatePixels();

    if (mouseIsPressed && mousePressOnCanvas(canvas)) {
        if (!editMode) {
            currentShape.push({ x: mouseX, y: mouseY });
        } else {
            for (let i = 0; i < currentShape.length; i++) {
                if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
                    currentShape[i].x = mouseX;
                    currentShape[i].y = mouseY;
                }
            }
        }
    }

    stroke(strokeColor);
    beginShape();
    for (let i = 0; i < currentShape.length; i++) {
        vertex(currentShape[i].x, currentShape[i].y);
        if (editMode) {
            fill('red');
            ellipse(currentShape[i].x, currentShape[i].y, 10, 10);
        }
    }
    endShape();
}

function mousePressOnCanvas(canvas) {
    return (mouseX > canvas.elt.offsetLeft &&
        mouseX < canvas.elt.offsetLeft + canvas.width &&
        mouseY > canvas.elt.offsetTop &&
        mouseY < canvas.elt.offsetTop + canvas.height);
}

function createColorButton(label, color) {
    let button = createButton(label);
    button.style('background-color', color);
    button.mousePressed(() => {
        fillColor = color;
        fill(fillColor);
        strokeColor = color; // Меняем цвет обводки
    });
}