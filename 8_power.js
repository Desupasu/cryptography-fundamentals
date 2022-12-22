// нахождение вычета a^k(mod m) для простого и составного m

// Вычисление степени числа по модулю
const power_mod = (a, k, m) => {
    let res = 1;
 
    a = a % m || m;

    while (k !== 0) {

        if (k & 1) {
            res = (res * a) % m;
        }
 
        k = k >> 1;
        a = (a * a) % m;
    }
    return res;
}

module.exports = power_mod;