// решение системы сравнений китайским алгоритмом

const euclid = require("./1_euclid");
const mod_inverse = require("./5_mod_inverse");

// Решение системы сравнений китайским алгоритмом
const chinese_congruence = (equations) => {
    const xIndex = 0, numberIndex = 1, modIndex = 2;
// Преобразования со сравнениями, приведение к виду x = b (mod m)
    // Делим все на gcd, если возможно
    let editedEquations = equations.map(n => {
        const gcd = euclid(n[xIndex], n[modIndex], euclid(n[xIndex], n[numberIndex]).r).r;
        if (gcd > 1) {
            n[xIndex] = Math.round(n[xIndex] / gcd);
            n[numberIndex] = Math.round(n[numberIndex] / gcd);
            n[modIndex] = Math.round(n[modIndex] / gcd);
        }
        return n
    });
    // Проверяем возможность решения каждого сравнения
    const isNotSolvable = editedEquations.some(n => {
        const { r } = euclid(n[xIndex], n[modIndex]);
        return n[numberIndex] % r !== 0;
    });

    if (isNotSolvable) return NaN;

    // приводим сравнения к виду x = a (mod m)
    editedEquations = editedEquations.map(n => {

        n[xIndex] = n[xIndex] % n[modIndex] || n[modIndex];
        n[numberIndex] = n[numberIndex] % n[modIndex] || n[modIndex];
        while (n[xIndex] !== 1) {
            const gcd = euclid(n[xIndex], n[numberIndex]).r;
            n[numberIndex] = Math.round(n[numberIndex] / gcd);
            n[xIndex] = Math.round(n[xIndex] / gcd);
            if (n[xIndex] !== 1) n[numberIndex] = n[numberIndex] + n[modIndex];
        }
        return n
    });
    editedEquations = Array.from(new Set(editedEquations.map(JSON.stringify))).map(JSON.parse);

    // Пытаемся сделать модули взаимно простыми, если это возможно
    for (let i = 0; i < editedEquations.length; i++) {
        for (let j = 0; j < editedEquations.length; j++) {
            if (i !== j) {
                const gcd = euclid(editedEquations[i][modIndex], editedEquations[j][modIndex]).r;
                if (gcd !== 1) {
                    editedEquations[i][modIndex] = Math.round(editedEquations[i][modIndex] / gcd);
                }
            }
        }
    }
//
// Решение системы сравнений китайским алгоритмом
    while(editedEquations.length !== 1)
    {
        const mod1 = mod_inverse(editedEquations[1][modIndex], editedEquations[0][modIndex]);
        const mod2 = mod_inverse(editedEquations[0][modIndex], editedEquations[1][modIndex]);

        if (mod1 !== mod1 || mod2 !== mod2) return NaN;

        let temp1 = mod1 * editedEquations[0][numberIndex] * editedEquations[1][modIndex]
                  + mod2 * editedEquations[1][numberIndex] * editedEquations[0][modIndex];
 
        let temp2 = editedEquations[0][modIndex] * editedEquations[1][modIndex];

        editedEquations.shift();
        editedEquations.shift();
        editedEquations.unshift([1, temp1 % temp2, temp2]);
    }

    return {
        x: editedEquations[0][numberIndex],
        k: editedEquations[0][modIndex]
    };
}

module.exports = chinese_congruence;