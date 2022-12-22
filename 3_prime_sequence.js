// Каноническое разложение числа на простые множители

const { find_primes } = require("./2_prime");

// Разложение числа на простые множители
const prime_sequence = (number) => {
    const result = [];
    const primes = find_primes(Math.ceil(number / 2));

    primes.forEach(n => {
        let count = 0;
        let currentNumber = number;
        while (currentNumber % n === 0) {
            count++;
            currentNumber = Math.round(currentNumber / n);
        }
        if (count) result.push({ number: n, count })
    });

    return result;
}

module.exports = prime_sequence;