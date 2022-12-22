// задать многочлены над полем GF2, найти их НОД и его линейное разложение

const Polynomial = require("./poly");

// Обработка коэффициентов по модулю
function FieldMod(poly, m = 2) {
    poly.coeff = Object.fromEntries(Object.entries(poly.coeff).map(item => {
        item[1] = (item[1] % m + m) % m;
        return item;
    }));
    return poly.toString();
}

// Нахождение НОД многочленов алгоритмом Евклида
const euclid_poly = (r1,r2, m) => {
    let q = 0,
        x1 = 1, x2 = 0,
        y1 = 0, y2 = 1;
    
    const a = r1, b = r2;

    while (r1 != 0 && r2 != 0) {
        q = FieldMod(new Polynomial(r1).div(r2), m);
        [r1, r2] = [r2, FieldMod(new Polynomial(r1).mod(r2), m)];

        [x1, x2] = [x2, FieldMod(new Polynomial(x1).sub(FieldMod(new Polynomial(q).mul(x2), m)), m)];
        [y1, y2] = [y2, FieldMod(new Polynomial(y1).sub(FieldMod(new Polynomial(q).mul(y2), m)), m)];
    }

    return {
        r: r1,
        u: x1,
        v: y1,
        a: a,
        b: b
    };
}

module.exports = {
    euclid_poly,
    FieldMod,
}