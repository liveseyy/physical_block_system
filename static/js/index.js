let result_text = document.querySelector("#result_text").textContent;
const m1 = document.querySelector("#m1").textContent,
      m2 = document.querySelector("#m2").textContent,
      m = document.querySelector("#m").textContent;

// конечные координаты
let x = document.querySelector("#x").textContent.replace(',', '.'),
    y = document.querySelector("#y").textContent.replace(',', '.'),
    x1 = document.querySelector("#x1").textContent.replace(',', '.'),
    y1 = document.querySelector("#y1").textContent.replace(',', '.'),
    x2 = document.querySelector("#x2").textContent.replace(',', '.'),
    y2 = document.querySelector("#y2").textContent.replace(',', '.');

// t - время всего движения, с цифрами - время каждой фазы
let t = document.querySelector("#t").textContent.replace(',', '.'),
    t1 = document.querySelector("#t1").textContent.replace(',', '.'),
    t2 = document.querySelector("#t2").textContent.replace(',', '.'),
    t3 = document.querySelector("#t3").textContent.replace(',', '.');

// ускорение на каждой фазе
let a1 = document.querySelector("#a1").textContent.replace(',', '.'),
    a2 = document.querySelector("#a2").textContent.replace(',', '.'),
    a3 = document.querySelector("#a3").textContent.replace(',', '.'),
    a4 = document.querySelector("#a4").textContent.replace(',', '.');

const canvas = document.querySelector('.canvas');
      ctx = canvas.getContext('2d');

canvas.height = 400;
canvas.width = 600;

const cm = 3 // Коэф увеличения
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

drawLine(193, 250, 195, 387, 250);

console.log(t1);