// нахождение порядка всех элементов в группе Z +m , Z *m

const euclid = require("./1_euclid");
const phi = require("./4_euler");
const power_mod = require("./8_power");

// Порядок по сумме
const order_sum = (m) => {
    const result = [];
    const d = [];
    // Высчитываем делители
    for (let i = 1; i <= Math.round(m / 2) + 1; i++) {
        if (m % i === 0) d.push(i);
    }
    d.push(m);
    // Проверяем произведение
    for (let i = 0; i < m; i++) {
        result.push({ number: i, order: NaN });
        for (let di of d) {
            if (i * di % m === 0) {
                result.pop();
                result.push({ number: i, order: di });
                break;
            }
        }
    }
    return result;
}

// Порядок по умножению
const order_multiply = (m) => {
    const euler = phi(m);
    const result = [];
    const d = [];
     // Высчитываем делители
    for (let i = 1; i <= Math.round(euler / 2) + 1; i++) {
        if (euler % i === 0) d.push(i);
    }
    d.push(euler);
    // Проверяем степени
    for (let i = 1; i < m; i++) {
        if (euclid(m, i).r !== 1) continue;
        result.push({ number: i, order: NaN });
        for (let di of d) {
            if (power_mod(i, di, m) === 1) {
                result.pop();
                result.push({ number: i, order: di });
                break;
            }
        }
    }
    return result;
}

module.exports = {
    order_multiply,
    order_sum
}
