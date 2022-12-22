// нахождение символа Лежандра и символа Якоби

const { verify_prime } = require("./2_prime");
const prime_sequence = require("./3_prime_sequence");

const jacobi = (a, n) => {
    if (n > 0 && n % 2 === 0) return;

    a = a % n;
    let t = 1;
    let r;

    while (a != 0) {

        while (a % 2 == 0) {

            a = a >> 1;
            r = n % 8;

            if (r == 3 || r == 5) {
                t = -t;
            }
        }

        r = n;
        n = a;
        a = r;

        if (a % 4 == 3 && n % 4 == 3) {
            t = -t;
        }
        a = a % n;
    }
    if (n == 1) {
        return t;
    }
    else {
        return 0;
    }
}

const legendre = (a, p) => {
    if ((a >= p) || (a < 0)) return legendre(a % p, p);

    if (a === 0 || a === 1) return a;

    if (a === 2) {
        if (p % 8 === 1 || p % 8 === 7) return 1;
        return -1
    }

    if (a === p - 1) {
        if (p % 4 === 1) return 1;
        return -1
    }

    if (!verify_prime(a)) {
        const factors = prime_sequence(a);
        let multi = 1
        for (let pi of factors) {
            multi *= legendre(pi.number, p)
        }
        return multi
    }

    if (((p - 1) / 2) % 2 == 0 || ((a - 1) / 2) % 2 == 0) return legendre(p, a);

    return (-1);
}

module.exports = {
    jacobi,
    legendre
}