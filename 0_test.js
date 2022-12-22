const process = require('process');
const { exponential_up, exponential_down } = require('./10_power_congruence');
const { legendre, jacobi } = require('./11_jacobi');
const { order_sum, order_multiply } = require('./12_order');
const { subgroup_sum, subgroup_multiply } = require('./13_subgroup');
const { euclid_poly } = require('./14_euclid_poly');
const extend_field = require('./15_extend_field');
const curve = require('./16_curve');
const pseudo_generation = require('./17_pseudo_generation');
const euclid = require('./1_euclid');
const { find_primes_slow } = require('./2_prime');
const prime_sequence = require('./3_prime_sequence');
const phi = require('./4_euler');
const mod_inverse = require('./5_mod_inverse');
const linear_congruence = require('./6_linear_congruence');
const chinese_congruence = require('./7_chinese_congruence');
const power_mod = require('./8_power');
const { primary_root, deduction_system } = require('./9_prymary_root');

const test1 = () => {
    const a = 16, b = 12;
    const result = euclid(a, b);
    console.log(`a = ${a}, b = ${b}`)
    console.log(`(${result.a} * ${result.u}) + (${result.b} * ${result.v}) = ${result.r}`)
}

const test2 = () => {
    const n = 300
    const primes = find_primes_slow(n);
    console.log(`Простые числа 1 - ${n}: [ ${primes} ]`)
}

const test3 = () => {
    const number = 120;
    const sequence = prime_sequence(number);
    console.log(`${number} = ` + sequence.map(n => `${n.number}^${n.count}`).join(" * "));
}

const test4 = () => {
    const n = 400;
    const fi = phi(n);
    console.log(`Fi(${n}): ${fi}`);
}

const test5 = () => {
    const n = 2, mod = 15;
    const result = mod_inverse(n, mod);
    console.log(result !== result ? "Обратный элемент не существует" : `Обратный элемент ${n} (mod ${mod}): ${result}`);
}

const test6 = () => {
    const a = 27, b = 123, mod = 5;
    const a2 = 27, b2 = 123, mod2 = 12; 
    const result = linear_congruence(a, b, mod);
    const result2 = linear_congruence(a2, b2, mod2);
    console.log(`Уравнение: ${a}x = ${b} (mod ${mod})`);
    console.log(result !== result ? "Уравнение не имеет решений" : `Решение: x = ${result.x} + ${result.k}k`);
    console.log(`Уравнение: ${a2}x = ${b2} (mod ${mod2})`);
    console.log(result2 !== result2 ? "Уравнение не имеет решений" : `Решение: x = ${result2.x} + ${result2.k}k`);
}

const test7 = () => {
    const numbers = [[3,5,14],[5,1,9], [7,2,25]];
    const result = chinese_congruence([[3,5,14],[5,1,9], [7,2,25]]);
    console.log(['Система:', ...numbers.map(n => `${n[0]}x = ${n[1]} (mod ${n[2]})`)].join('\n'));
    console.log(result !== result ? "Система не имеет решений" : `Решение: x = ${result.x} + ${result.k}k`);
}

const test8 = () => {
    const a = 3, b = 4, mod = 6;
    const a2 = 3, b2 = 4, mod2 = 17;
    const result = power_mod(a, b, mod);
    const result2 = power_mod(a, b, mod2);
    console.log(`${a}^${b} (mod ${mod}) = ${result}`);
    console.log(`${a}^${b} (mod ${mod2}) = ${result2}`);
}

const test9 = () => {
    const n = 23;
    const root = primary_root(n);
    const result = deduction_system(n);
    console.log(`U(${n}) = {${result}}`);
    console.log(root !== root ? "Первообразного корня не существует" : `Первообразный корень = ${root}`);
}

const test10 = () => {
    const a1 = 7, b1 = 55, mod1 = 576;
    const a2 = 7, k = 17, b2 = 157, mod2 = 1144;
    const upResult = exponential_up(a1, b1, mod1);
    const downResult = exponential_down(a2, k, b2, mod2);
    console.log(`Уравнение: ${a1}^x = ${b1} (mod ${mod1})`);
    console.log(upResult !== upResult ? 'Решений нет' : `Решение: x = ${upResult.x} + ${upResult.k}k`);
    console.log(`Уравнение: ${a2}x^${k} = ${b2} (mod ${mod2})`);
    console.log(downResult !== downResult ? 'Решений нет' : `Решение: x = ${downResult.x} + ${downResult.k}k`);
}

const test11 = () => {
    const a = 13, m = 47;
    const symbol_legendre = legendre(a, m);
    const symbol_jacobi = jacobi(a, m);
    console.log(`Символ Лежандра (${a} / ${m}) = ${symbol_legendre}`);
    console.log(`Символ Якоби (${a} / ${m}) = ${symbol_jacobi}`);
}

const test12 = () => {
    const m = 15;
    const orderSum = order_sum(m);
    const orderMul = order_multiply(m);
    console.log(`Группа Z+${m}`);
    console.log(orderSum.map(n => `ord ${n.number} = ${n.order === n.order ? n.order : '∞'}`).join('\n'));
    console.log(`\nГруппа Z*${m}`);
    console.log(orderMul.map(n => `ord ${n.number} = ${n.order === n.order ? n.order : '∞'}`).join('\n'));
}

const test13 = () => {
    const m = 15;
    const orderSum = subgroup_sum(m);
    const orderMul = subgroup_multiply(m);
    console.log(`Группа Z+${m}`);
    orderSum.forEach(n => {
        console.log(`Подгруппа (ord = ${n.order}):[ ${n.group[0]} ] \nКлассы смежности: [${n.group.slice(1).map(n => ` [${n}]`)} ]`);
    })
    console.log(`\nГруппа Z*${m}`);
    orderMul.forEach(n => {
        console.log(`Подгруппа (ord = ${n.order}):[ ${n.group[0]} ] \nКлассы смежности: [${n.group.slice(1).map(n => ` [${n}]`)} ]`);
    })
}

const test14 = () => {
    const f = "x^6+x^5+x^4+1";
    const g = "x^4+x^2";
    const m = 2;
    const result = euclid_poly(f, g);
    console.log(`f(x): ${f},  g(x): ${g}`);
    console.log(`GF${m}: (${result.a} * ${result.u}) + (${result.b} * ${result.v}) = ${result.r}`)
}

const test15 = () => {
    const f = 'x^2+x-1';
    const result = extend_field(f);

    const prettyResultPlus = result.tables[0].map(n => `${n.map(m => m.toString().padEnd(2, ' ').padStart(4, ' ')).join(' | ')}`);
    const prettyResultMul = result.tables[1].map(n => `${n.map(m => m.toString().padEnd(4, ' ').padStart(8, ' ')).join(' | ')}`);

    console.log(`f(x): ${f}`);
    console.log(`F[x]/f[x] = { ${result.field.join(', ')} } `);
    console.log('\nТаблица Кэли для сложения\n');
    console.log('\x1b[36m', prettyResultPlus.join(`  \n${'-'.repeat(prettyResultPlus[0].length + 1)}\n`), '\x1b[0m');
    console.log('\nТаблица Кэли для умножения\n');
    console.log('\x1b[36m', prettyResultMul.join(`  \n${'-'.repeat(prettyResultMul[0].length + 1)}\n`), '\x1b[36m');
}

const test16 = () => {
    const a = 5;
    const b = 8;
    const p = 13;
    const result = curve(a, b, p);
    console.log(`Уравнение ЭК: ${result.equation}`);
    console.log('Точки ЭК: { ' + result.dots.map(n => `(${n})`).join(' ; ') + ' }');
    console.log(`Нахождение порядка точки: P (${result.trace[0]}) --> 2P (${result.trace[1]}) --> 4P (${result.trace[2]}) --> 6P (${result.trace[3]}) --> 12P (${result.trace[4]})`)
    console.log(`Порядок ЭК: ${result.ordN}`);
    console.log(`Порядок P (${result.P}) = ${result.ordP}`);
    console.log(`Порядок ЭК Над полем F(p^r) = ${result.N}`);
}

const test17 = () => {
    const result = pseudo_generation();
    console.log(`Результат генерации = ${result}`);
}

const argv = process.argv[2];
if (!argv) return;

switch(argv) {
    case "1": test1(); break;
    case "2": test2(); break;
    case "3": test3(); break;
    case "4": test4(); break;
    case "5": test5(); break;
    case "6": test6(); break;
    case "7": test7(); break;
    case "8": test8(); break;
    case "9": test9(); break;
    case "10": test10(); break;
    case "11": test11(); break;
    case "12": test12(); break;
    case "13": test13(); break;
    case "14": test14(); break;
    case "15": test15(); break;
    case "16": test16(); break;
    case "17": test17(); break;
}