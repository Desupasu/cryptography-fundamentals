// построить эллиптическую кривую над полем характеристики p>3 (p-простое),
// найти порядок ЭК, найти порядок точки на ЭК, определить формулу нахождения
// порядка ЭК над полем F(pr), r>1

const mod_inverse = require("./5_mod_inverse")

const calculateSum = (p, q, m) => {
    const calcX = ((((q[1] - p[1]) * mod_inverse(q[0] - p[0], m)) % m) ** 2 - p[0] - q[0]) % m;
    const calcY = (-p[1] + (((q[1] - p[1]) * mod_inverse(q[0] - p[0], m)) % m) * (p[0] - calcX)) % m;

    if (calcX !== calcX || calcY !== calcY) return 'O';
    return [(calcX + m) % m, (calcY + m) % m];
}

const calculateDouble = (p, a, m) => {
    const calcX = ((((3 * p[0] ** 2 + a) % m) * mod_inverse(2 * p[1], m)) ** 2 - (2 * p[0])) % m;
    const calcY = (-1 * p[1] + (((3 * p[0] ** 2 + a) % m) * mod_inverse(2 * p[1], m)) * (p[0] - calcX)) % m;

    if (calcX !== calcX || calcY !== calcY) return 'O';
    return [(calcX + m) % m, (calcY + m) % m];
}

const curve = (a = 5, b = 8, p = 13) => {
    // y^2 = x^3 + 5x + 8
    const opred = (4 * a ** 3 + 27 * b ** 2) % p;
    if (opred === 0) return NaN;

    const xPoints = [];
    const yPoints = [];
    const dots = [];

    for (let i = 0; i < p; i++) {
        xPoints.push((i ** 3 + a * i + b) % p);
        yPoints.push((i ** 2) % p);
    }
    xPoints.forEach((xPoint, xIndex) => {
        yPoints.forEach((yPoint, yIndex) => {
            if (xPoint === yPoint) dots.push([xIndex, yIndex])
        })
    })
    dots.push('O');

    const P = dots[6]; // [7, 10]
    const P2 = calculateDouble(P, a, p); // [11, 9]
    const P4 = calculateDouble(P2, a, p); // [1, 12]
    const P6 = calculateSum(P4, P2, p); // [2, 0]
    const P12 =  calculateDouble(P6, a, p); // O
    const N1 = dots.length;
    const ordP = 12;
    const alpha = '1 - sqrt(48i)/2';
    const beta = '1 + sqrt(48i)/2';
    const N = `13^r + 1 - (${alpha})^r - (${beta})^r`

    return {
        equation: `y^2 = x^3 + ${a}x + ${b}`,
        dots: dots,
        P: P,
        trace: [P, P2, P4, P6, P12],
        ordP: ordP,
        ordN: N1,
        N: N
    }
}

module.exports = curve;