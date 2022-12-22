// 15.задать неприводимый многочлен g(x) над полем GF2 и сформировать поле
// многочленов F[X]/g(x) как конечное расширение поля GF2, построить таблицы
// Кэли для «+» и «*» групп поля

const Polynomial = require("./poly")

function FieldMod(poly, m = 3) {
    poly.coeff = Object.fromEntries(Object.entries(poly.coeff).map(item => {
        item[1] = (item[1] % m + m) % m;
        if (item[1] === 2) item[1] = item[1] - m;
        return item;
    }));
    return poly.toString();
}

const extend_field = (polyStr) => {
    const m = 3;
    const poly = new Polynomial(polyStr);
    const maxCoef = Math.max(...Object.keys(poly.coeff).map(Number));
    let extendedField = [];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < maxCoef + 1; j++) {
            const polynom = new Polynomial();
            polynom.coeff = Object.fromEntries(Array(maxCoef).fill(null).map((_, index) => [`${index}`, (index * i+j) % m]));
            extendedField.push(FieldMod(polynom));
        }
    }
    extendedField = extendedField.sort((a,b) => {
        if (Number(b) === Number(b)) return 1;
        if (Number(a) === Number(a)) return -1;
        if (a.length > b.length) return 1;
        if (b.length > a.length) return -1;
        return 0;
    })

    const kelyPlus = [['+', ...extendedField]];
    for (let i = 0; i < extendedField.length; i++) {
        const currentOperationResult = [extendedField[i]];
        for (let j = 0; j < extendedField.length; j++) {
            currentOperationResult.push(FieldMod(new Polynomial(extendedField[i]).add(extendedField[j])));
        }
        kelyPlus.push(currentOperationResult);
    }

    const kelyMul = [['*', ...extendedField]];
    for (let i = 0; i < extendedField.length; i++) {
        const currentOperationResult = [extendedField[i]];
        for (let j = 0; j < extendedField.length; j++) {
            currentOperationResult.push(FieldMod(new Polynomial(extendedField[i]).mul(extendedField[j])));
        }
        kelyMul.push(currentOperationResult);
    }
    
    return {
        field: extendedField,
        tables: [kelyPlus, kelyMul]
    };
}

module.exports = extend_field;