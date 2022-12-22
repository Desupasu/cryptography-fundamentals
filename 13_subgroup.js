// разложение группы на подгруппы и формирование для каждой подгруппы
// смежных классов (для Z +m , Z *m )

const { order_sum, order_multiply } = require("./12_order");
const phi = require("./4_euler");
const power_mod = require("./8_power");

const subgroup_sum = (m) => {

    const orderSum = order_sum(m);
    const result = [];
    const orders = [ ... new Set(orderSum.map(n => n.order)) ].sort((a, b) => a - b).filter(n => n === n).reverse();

    orders.forEach((ord) => {
        const group = [];
        for (let i = 0; i < ord; i++) {
            const subgroup = [];
            orderSum.forEach(({ number }) => {
                if (number % ord === 0) {
                    subgroup.push(number + i);
                }
            })
            group.push(subgroup);
        };
        result.push({
            order: ord,
            group: group
        })
    })

    return result;
}

const subgroup_multiply = (m) => {

    const orderMul = order_multiply(m).filter(n => n.order === n.order).sort((a, b) => a.order - b.order);
    const orders = orderMul.filter((item, index, arr) => !arr[index - 1] || arr[index - 1].order !== item.order);
    const result = [];
    const euler = phi(m);

    orders.forEach(({ order: ord, number }) => {
        const group = [];
        for (let i = 0; i < Math.round(euler / ord); i++) {
            const subgroup = [];
            const num = orderMul.find(item => !group.flat().some(n => item.number === n));
            for (let j = 0; j < ord; j++) {
                subgroup.push(power_mod(number, j, m) * num.number % m);
            };
            group.push(subgroup);
        }
        result.push({
            order: ord,
            group: group
        })
    })

    return result;
}

module.exports = {
    subgroup_sum,
    subgroup_multiply
}