let sound; // Переменная для аудио-дорожки
let isInitialised = false; // Состояние, которое обозначает, инициализированы ли значения или нет
let isLoaded = false; // Указывает, загружен ли звук
let amplitude; // Переменная для амплитуды звука
let amplitudes = []; // Массив для хранения амплитуд

let fft; // Переменная для анализа частот

function preload() {
    soundFormats('mp3', 'wav'); // Определяем поддерживаемые форматы аудио
    sound = loadSound('assets/yee-king_track.mp3', () => {
        console.log("Sound is loaded!");
        isLoaded = true;
    });
}

function setup() {
    createCanvas(1024, 512); // Создаём холст
    textAlign(CENTER);
    textSize(32);

    amplitude = new p5.Amplitude(); // Инициализируем объект амплитуды
    fft = new p5.FFT(); // Инициализируем объект для анализа частот

    // Заполняем массив амплитуд начальными значениями
    for (let i = 0; i < 512; i++) {
        amplitudes.push(0);
    }
}

function draw() {
    background(0); // Фон чёрный
    fill(255);

    if (isInitialised && !sound.isPlaying()) {
        text("Press any key to play sound", width / 2, height / 2);
    } else if (sound.isPlaying()) {
        let level = amplitude.getLevel(); // Текущая амплитуда звука
        amplitudes.push(level); // Добавляем новое значение
        amplitudes.shift(); // Убираем самое старое значение

        // Визуализация центральной окружности
        let size = map(level, 0, 0.2, 50, 300);
        noStroke();
        fill(255, 100, 150, 150);
        ellipse(width / 2, height / 2, size, size);

        // Визуализация волны
        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < amplitudes.length; i++) {
            let x = map(i, 0, amplitudes.length, 0, width);
            let y = map(amplitudes[i], 0, 0.2, height / 2, height / 2 - 150);
            vertex(x, y);
        }
        endShape();

        // Частотная визуализация
        let spectrum = fft.analyze();
        noStroke();
        fill(100, 150, 255, 150);
        for (let i = 0; i < spectrum.length; i++) {
            let x = map(i, 0, spectrum.length, 0, width);
            let h = map(spectrum[i], 0, 255, 0, height / 2);
            rect(x, height - h, width / spectrum.length, h);
        }

        // Дополнительные элементы
        let bassEnergy = fft.getEnergy("bass");
        fill(255, 50, 50, 200);
        ellipse(width / 4, height / 2, 50 + bassEnergy);

        let trebleEnergy = fft.getEnergy("treble");
        fill(50, 50, 255, 200);
        ellipse(width * 3 / 4, height / 2, 50 + trebleEnergy);
    }
}

function keyPressed() {
    if (!isInitialised) {
        isInitialised = true;

        let r = map(mouseX, 0, width, 0.5, 4.0); // Скорость воспроизведения
        if (isLoaded) {
            sound.loop(0, r); // Запуск воспроизведения
        }
    } else {
        if (key === ' ') {
            if (sound.isPaused()) sound.play();
            else sound.pause();
        }
    }
}