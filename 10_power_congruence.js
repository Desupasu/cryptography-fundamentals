// решение степенного (показательного) сравнения

// Источники для решения
// https://uni.bsu.by/arrangements/seminar_t4/lekcii/lecture_5.pdf
// https://studopedia.org/14-74615.html

const euclid = require("./1_euclid");
const prime_sequence = require("./3_prime_sequence");
const euler = require("./4_euler");
const linear_congruence = require("./6_linear_congruence");
const chinese_congruence = require("./7_chinese_congruence");
const power_mod = require("./8_power");
const { primary_root } = require("./9_prymary_root");

// Вычисление индекса по первообразному корню
const index = (b, m) => {
    b = b % m || m;

    const phi = euler(m);
    const root = primary_root(m);

    for (let i = 0; i < phi; i++) {
        if (power_mod(root, i, m) === b) return i;
    }

    return NaN;
}

// Вычисление индексов для модуля вида 2^a
const even_indexes = (b, n, c) => {
    const m = n ** c;
    b = b % m || m;

    if (c >= 2) {
        for (let i = 0; i < n ** (c -2); i++) {
            const power = power_mod(5, i, m);
            if (power === b) {
                return [0, i];
            }
            if (((-1) * power + m) % m === b) {
                return [1, i];
            }
        }
    } else {
        return [0, 0];
    }

    return NaN;
}
// Вычисление коэффициентов для модуля вида 2^a
const calculate_even_mod = (a, b, n, power) => {

    let indexesA = even_indexes(a, n, power);
    let indexesB = even_indexes(b, n, power);
    let modA = power >= 2 ? 2 : 1;
    let modB = power >= 2 ? 2 ** (power - 2) : 1;

    if (indexesA !== indexesA || indexesB !== indexesB) return NaN;

    return [[indexesA[0], indexesB[0], modA], [indexesA[1], indexesB[1], modB]];
}
// Вычисление коэффициентов для простого модуля
const calculate_prime_mod = (a, b, m) => {

    let indexA = index(a, m);
    let indexB = index(b, m);
    let mod = euler(m);

    if (indexA !== indexA || indexB !== indexB) return NaN;
    return [indexA, indexB, mod];
}

const calculate_even_coef = (a, k, b, n, power) => {

    const coefs = calculate_even_mod(a, b, n, power);
    
    if (coefs !== coefs) return NaN;

    let indexes = coefs.map(m => linear_congruence(
        k,
        m[1] - m[0] + m[2] % m[2],
        m[2]
    ));

    if (indexes.some(m => m !== m)) return NaN;

    indexes = indexes.map(m => m.x);

    const m = n ** power;
    const powerMod = power_mod(5, indexes[1], m);

    return [1, ((((-1) ** indexes[0]) * powerMod) + m) % m, m];
}
// Вычисление коэффициентов для простого модуля
const calculate_prime_coef = (a, k, b, m) => {

    const mod = calculate_prime_mod(a, b, m);

    if (mod !== mod) return NaN;

    let indexes = linear_congruence(
        k,
        mod[1] - mod[0] + mod[2] % mod[2],
        mod[2]
    );

    if (indexes !== indexes) return NaN;

    indexes = indexes.x;
    const root = primary_root(m);
    const powerMod = power_mod(root, indexes, m);

    return [1, powerMod, m];
}
// Вычисление сравнения вида a^x = b (mod m)
const exponential_up = (a, b, m) => {
    const sequence = prime_sequence(m);

    if (euclid(a, m).r !== 1 || euclid(b, m).r !== 1) return NaN;

    if (sequence.length === 0) {
        const mod = calculate_prime_mod(a, b, m);
        if (mod !== mod) return NaN;
        return linear_congruence(...mod);
    }

    const chinese_sequence = [];

    sequence.forEach(n => {
        if (n.number === 2) {
            chinese_sequence.push(...calculate_even_mod(a, b, n.number, n.count));
        } else {
            chinese_sequence.push(calculate_prime_mod(a, b, n.number ** n.count));
        }
    })

    if (chinese_sequence.some(item => item !== item || item.some(i => i !== i))) return NaN;

    const result = chinese_congruence(chinese_sequence);

    return result;
}
// Вычисление сравнения вида ax^k = b (mod m)
const exponential_down = (a, k, b, m) => {

    const sequence = prime_sequence(m);

    if (sequence.length === 0) {
        const coefs = calculate_prime_coef(a, k, b, m);
        if (coefs !== coefs) return NaN;
        return linear_congruence(...coefs);
    }

    const chinese_sequence = [];

    sequence.forEach(n => {
        if (n.number === 2) {
            chinese_sequence.push(calculate_even_coef(a, k, b, n.number, n.count));
        } else {
            chinese_sequence.push(calculate_prime_coef(a, k, b, n.number ** n.count));
        }
    })

    if (chinese_sequence.some(item => item !== item || item.some(i => i !== i))) return NaN;

    const result = chinese_congruence(chinese_sequence);

    return result;
}

module.exports = {
    index,
    exponential_up,
    exponential_down
}