// поиск простых чисел до числа n (с помощью алгоритмов, которые вы готовили на доклады)
// Алгоритм Агравала - Каяла - Саксены
// (x-1)^p = (x^p - 1) (mod p)

// Вычисление факториала
function factorial(number) {
    let result = 1n;
    for(let i = number; i > 0; i--) {
      result *= BigInt(i)
    }
    return result;
}
// Вычисление коэффициентов многочлена
function polinom_coefs(number) {
    let coefs = [];
    for(let i = 0; i <= number; i++) {
      coefs.push((factorial(number) / (factorial(i) * factorial(number - i))))
    }
    return coefs.slice(1, -1);
}
// Проверка числа на простоту
function verify_prime_slow(number) {
    if(number < 1) return false;
    if (number === 1) return true;

    let coefs = polinom_coefs(number);
    return coefs.every(coef=> coef % BigInt(number) === 0n);
}
// Нахождение простых чисел 1..n
function find_primes_slow(number) {
    const result = [];
    for (i = 2; i <= number; i = i <= 2 ? i + 1 : i + 2) {
        if (verify_prime_slow(i)) {
            result.push(i);
        }
    }
    return result;
}
// Проверка на простоту числа
function verify_prime(n) {
    if (n <= 1) return false;
    let squareRoot = Math.sqrt(n);
    for (let i = 2; i <= squareRoot; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
}

// Нахождение простых чисел 1..n
function find_primes(number) {
    const result = [];
    for (i = 2; i <= number; i = i <= 2 ? i + 1 : i + 2) {
        if (verify_prime(i)) {
            result.push(i);
        }
    }
    return result;
}

module.exports = {
    verify_prime,
    find_primes,
    find_primes_slow,
    verify_prime_slow
}