// расчет функции Эйлера для m

const { verify_prime } = require('./2_prime.js');
const prime_sequence = require('./3_prime_sequence.js');

// Вычисление функции эйлера
function phi(n)
{
    if (verify_prime(n)) return n - 1;

    const sequence = prime_sequence(n);

    return sequence.reduce((acc, red) => {
        acc = acc * (Math.pow(red.number, red.count) - Math.pow(red.number, red.count - 1));
        return acc;
    }, 1);
}

module.exports = phi;