// решение сравнений (для простого и составного m)

const euclid = require("./1_euclid");

// Решение линейного сравнения
const linear_congruence = (a, b, n) => {
    a = a % n || n;
    b = b % n || n;

    const { r, u } = euclid(a, n);

    if (b % r !== 0) return NaN;

    const k = Math.round(n / r);
 
    const x = (Math.round(u * b / r) % n + n) % k;
    
    return {
        x, k
    };
}

module.exports = linear_congruence;