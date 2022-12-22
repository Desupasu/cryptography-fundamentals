// нахождение обратного элемента в Zm

const euclid = require("./1_euclid");

// Вычисление обратного элемента по модулю
function mod_inverse(a, n) {
    const { r, u } = euclid(a, n);
    if (r !== 1) return NaN;
    
    return (u % n + n) % n
}

module.exports = mod_inverse;