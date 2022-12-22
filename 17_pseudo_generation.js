// построить псевдослучайную последовательность по одному из алгоритмов
// генерации, обосновать выбор параметров для обеспечения максимально-
// возможного периода

const mod_inverse = require("./5_mod_inverse");
// Генератор Эйхенауэра - Лена с обращением
// Tmax = 2^(q-1) при
// x0 = 1 (mod 2)
// a = 1 (mod 4)
// c = 2 (mod 4)
const pseudo_generation = ( x0 = 1, q = 5, length = 2 ** (q - 1) - 1, a = 123512361137, c = 917231237598870) => {
    const n = 2 ** q;
    const result = [x0];
    a = a % n || n;
    c = c % n || n;

    while (length > 0) {
        if (x0 === 0) {
            result.push(c);
        } else {
            const inverse = mod_inverse(x0, n);
            result.push((a * inverse + c) % n);
        }
        x0 = result.slice(-1)[0];
        length--;
    }

    return result;
}

module.exports = pseudo_generation;