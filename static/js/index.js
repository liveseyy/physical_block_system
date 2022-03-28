let result_text = document.querySelector("#result_text").textContent;
const m1 = document.querySelector("#m1").textContent,
      m2 = document.querySelector("#m2").textContent,
      m = document.querySelector("#m").textContent;

// конечные координаты
let x = +document.querySelector("#x").textContent.replace(',', '.'),
    y = +document.querySelector("#y").textContent.replace(',', '.'),
    x1 = +document.querySelector("#x1").textContent.replace(',', '.'),
    y1 = +document.querySelector("#y1").textContent.replace(',', '.'),
    x2 = +document.querySelector("#x2").textContent.replace(',', '.'),
    y2 = +document.querySelector("#y2").textContent.replace(',', '.');

// t - время всего движения, с цифрами - время каждой фазы
let t1 = +document.querySelector("#t1").textContent.replace(',', '.'),
    t2 = +document.querySelector("#t2").textContent.replace(',', '.'),
    t3 = +document.querySelector("#t3").textContent.replace(',', '.');

// ускорение на каждой фазе
let a1 = +document.querySelector("#a1").textContent.replace(',', '.'),
    a2 = +document.querySelector("#a2").textContent.replace(',', '.'),
    a3 = +document.querySelector("#a3").textContent.replace(',', '.'),
    a4 = +document.querySelector("#a4").textContent.replace(',', '.');

const canvas = document.querySelector('.canvas');
      ctx = canvas.getContext('2d');

canvas.height = 400;
canvas.width = 600;

const cm = 3 // Коэф увеличения

const data = {
    left: {
        x0: 185,
        y0: 250,
        height: 15,
        width: 15,
    },
    mid: {
        x0: 280,
        y0: 183,
        height: 15,
        width: 15,
    },
    right: {
        x0: 380,
        y0: 250,
        height: 15,
        width: 15,
    },
    main: {
        x0: 193,
        y0: 250,
        checkP1: 185,
        checkP2: 387,
        finish: 250,
    }
};
// Table
ctx.fillStyle = 'black';
ctx.fillRect(200, 200, 60 * cm, 10 * cm);

// Rounds
// ctx.fillStyle = 'black';
ctx.arc(200, 200, 3 * cm, 0, Math.PI * 2);
ctx.fill('evenodd');

ctx.arc(380, 200, 3 * cm, 0, Math.PI * 2);
ctx.fill('evenodd');

// Отрисовка веревки
function drawLine(x0, y0, checkP1, checkP2, finish) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.lineWidth = 1 * cm;
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0, checkP1);
    ctx.lineTo(checkP2, checkP1);
    ctx.lineTo(checkP2, finish);
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
}

function getDir() {
    // Узнаю, в какую сторону двигается система
    if (y1 < -20 && x < 30) {
        return 'left';
    }
    if (y2 < -20 && x > 30) {
        return 'right';
    }
    if (x === 30) {
        return 'mid';
    }
}

function getPhase() {
    if (a4) {
        return 4;
    }
    if (a3 && t3) {
        return 3;
    }
    if (!t1) {
        return 0;
    }
}

function getSpeed() {
    if(getPhase() === 4) {
        return a4 * 2;
    }
    if(getPhase() === 3) {
        const v3 = Math.floor((a3 * t3) * 3);
        return v3;
    }
    if(getPhase() === 0) {
        return 0;
    }
}

function moveRight() {
    if (data.main.y0 > data.main.checkP1) {
        ctx.clearRect(data.left.x0, data.main.y0, data.left.width, data.left.height);
        ctx.clearRect(data.mid.x0, data.mid.y0, data.mid.width, data.mid.height);
        ctx.clearRect(data.right.x0, data.right.y0, data.right.width, data.right.height);

        data.main.y0 -= 1;
        data.left.y0 -= 1;

        // Движение центрального блока
        if (data.mid.x0 >= data.main.checkP2) {
            data.mid.y0 += 1;

            ctx.fillRect(data.mid.x0, data.mid.y0, data.mid.height, data.mid.width);
        } else {
            data.mid.x0 += 1;

            ctx.fillRect(data.mid.x0, data.mid.y0, data.mid.width, data.mid.height);
        }
        // Движение правого блока
        data.right.y0 += 1;
        ctx.fillRect(data.right.x0, data.right.y0, data.right.width, data.right.height);

        ctx.fillRect(data.left.x0, data.main.y0, data.left.width, data.left.height);
    }
    // Центральная часть стола
    if (data.main.y0 === data.main.checkP1 && data.main.x0 < data.main.checkP2) {
        ctx.clearRect(data.left.x0, data.left.y0, data.left.height, data.left.width);
        ctx.clearRect(data.mid.x0, data.mid.y0, data.mid.width, data.mid.height);
        ctx.clearRect(data.right.x0, data.right.y0, data.right.width, data.right.height);

        if (data.left.y0 !== data.main.checkP1 - 5) {
            data.left.y0 -= 5; // Костыль, чтобы нормально стиралась нить
        }

        data.main.x0 += 1;
        data.left.x0 += 1;

        // Движение центрального блока
        if (data.mid.x0 >= data.main.checkP2 - 7) {
            if(data.mid.x0 !== data.main.checkP2 - 7) {
                data.mid.x0 -= 7;
            }
            data.mid.y0 += 1;

            ctx.fillRect(data.mid.x0, data.mid.y0, data.mid.height, data.mid.width);
        } else {
            data.mid.x0 += 1;

            ctx.fillRect(data.mid.x0, data.mid.y0, data.mid.width, data.mid.height);
        }

        ctx.fillRect(data.left.x0, data.left.y0, data.left.height, data.left.width);

        data.right.y0 += 1;
        ctx.fillRect(data.right.x0, data.right.y0, data.right.width, data.right.height);
    }
    drawLine(data.main.x0, data.main.y0, data.main.checkP1, data.main.checkP2, data.right.y0);
}

function moveLeft() {
    if(data.main.finish > data.main.checkP1) {
        ctx.clearRect(data.right.x0, data.right.y0, data.right.width, data.right.height);
        ctx.clearRect(data.mid.x0, data.mid.y0, data.mid.width, data.mid.height);
        ctx.clearRect(data.left.x0, data.left.y0, data.left.width, data.left.height);

        data.main.finish -= 1;
        data.right.y0 -= 1;

        // Движение центрального блока
        if(data.mid.x0 < data.main.x0) {
            data.mid.y0 += 1

            ctx.fillRect(data.mid.x0, data.mid.y0, data.mid.height, data.mid.width)
        } else {
            data.mid.x0 -= 1;

            ctx.fillRect(data.mid.x0, data.mid.y0, data.mid.width, data.mid.height);
        }
        //Движение левого блока
        data.left.y0 += 1;
        ctx.fillRect(data.left.x0, data.left.y0, data.left.width, data.left.height);

        ctx.fillRect(data.right.x0, data.right.y0, data.right.width, data.right.height);
    }
    // Центральная часть стола
    if(data.main.finish === data.main.checkP1 && data.main.checkP2 > data.main.x0) {
        ctx.clearRect(data.right.x0, data.right.y0, data.right.height, data.right.width);
        ctx.clearRect(data.mid.x0, data.mid.y0, data.mid.width, data.mid.height);
        ctx.clearRect(data.left.x0, data.left.y0, data.left.width, data.left.height);

        if (data.right.y0 !== data.main.checkP1 - 5) {
            data.right.y0 -= 5; // Костыль, чтобы нормально стиралась нить
        }

        data.main.checkP2 -= 1;
        data.right.x0 -= 1;

        // Движение центрального блока
        if(data.mid.x0 <= data.main.x0) {
            if (data.mid.x0 !== data.main.x0 - 7) {
                data.mid.x0 -= 7; // Костыль, чтобы нормально стиралась нить
            }
            data.mid.y0 += 1;

            ctx.fillRect(data.mid.x0, data.mid.y0, data.mid.height, data.mid.width);
        } else {
            data.mid.x0 -= 1;

            ctx.fillRect(data.mid.x0, data.mid.y0, data.mid.width, data.mid.height);
        }

        ctx.fillRect(data.right.x0, data.right.y0, data.right.height, data.right.width);

        data.left.y0 += 1;
        ctx.fillRect(data.left.x0, data.left.y0, data.left.width, data.left.height);

        ctx.fillRect(data.right.x0, data.right.y0, data.right.width, data.right.height);
    }

    drawLine(data.main.checkP2, data.main.finish, data.main.checkP1, data.main.x0, data.left.y0);
}

function start() {
    if (getDir() === 'right') {
        moveRight();
    } else {
        moveLeft();
    }
}

if(getSpeed() === 0) {
    start();
} else {
    setInterval(() => {
        start()
    }, getSpeed());
}