// нахождение первообразного корня (образующего элемента) и формирование с его
// помощью приведенной системы вычетов

const { verify_prime } = require("./2_prime");
const prime_sequence = require("./3_prime_sequence");
const euler = require("./4_euler");
const power_mod = require("./8_power");

// Первообразный корень по модулю вида 2, 4, p^k
const primary_root = (n) => {
 
    if (n === 2) return 1;

    if (n === 4) return 3;

    if (false === verify_prime(n)) {
        let flag = false;
        const root = Math.round(Math.sqrt(n));
        for (let i = 2; i <= root; i++) {
            for (let m = 2; m <= root; m++) {
                if (i % 2 !== 0 && i ** (root - m + 2) === n && verify_prime(i)) {
                    flag = true;
                }
            }
        }
        if (!flag) return NaN;
    }
 
    let phi = euler(n);

    const sequence = prime_sequence(phi).map(n => n.number);
 
    for (let r = 2; r <= phi; r++) {

        let check_next = false;

        for (let it of sequence) {
 
            if (power_mod(r, phi / it, n) === 1) {
                check_next = true;
                break;
            }
        }   

        if (check_next == false) {
            return r;
        }
    }
 
    return NaN;
}

// Система вычетов по модулю
const deduction_system = (n) => {
    const root = primary_root(n);
    // Если есть первообразный корень
    if (root === root) {
        let phi = euler(n);

        const result = [];
       for (let i = 0; i <= phi - 1; i++) {
           result.push(power_mod(root, i, n));
       }

       return result.sort((a,b) => a - b);
    }

    // Если модуль вида 2^a, где a > 2
    const sequence = prime_sequence(n);

    if (sequence[0].number === 2 && sequence[0].count > 2) {
        const result = [];

        for (let i = 0; i < sequence[0].number ** (sequence[0].count - 2); i++) {
            result.push(power_mod(5, i, n))
            result.push(((-1) * power_mod(5, i, n) + n) % n)
        }
    
        return result.sort((a,b) => a - b);
    }

    return NaN;
}

module.exports = {
    deduction_system,
    primary_root
}
