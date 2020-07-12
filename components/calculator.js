const operations = {
    '+': [0, (a, b) => { return a + b }],
    '-': [0, (a, b) => { return a - b }],
    '*': [1, (a, b) => { return a * b }],
    '/': [1, (a, b) => { return a / b }],
}

module.exports = {
    solveEquation,
    isPartOfNumber,
    calculateWithPriorities,
    getHighestPriorityOperation,
};

function solveEquation(str) {
    let operationsArray = [];
    let bracketCount = 0;
    let start = 0;
    let number = "";
    for (let i = 0; i < str.length; i++) {
        switch (str[i]) {
            case "(":
                if (bracketCount === 0) start = i;
                bracketCount++;
                break;
            case ")":
                bracketCount--;
                if (bracketCount === 0) {
                    // Решаем выражение внутри скобок,записываем результат в массив
                    let res = solveEquation(str.substring(start + 1, i));
                    operationsArray.push(res);
                }
                break;
            default:
                if (bracketCount === 0) {
                    if (isPartOfNumber(str[i])) {
                        // Если часть числа, то собираем число в одну строку
                        number += str[i];
                    } else {
                        // Если перед минусом нет числа, то минус это часть отрицательного числа
                        if (str[i] === '-' && !isPartOfNumber(str[i - 1]) && str[i - 1] !== ')') {
                            number += str[i];
                        } else {
                            operationsArray.push(str[i]);
                        }
                    }
                }
                break;
        }
        // Если следующий символ не часть числа, то записываем число в массив
        if (!isPartOfNumber(str[i + 1]) && number !== "") {
            operationsArray.push(Number(number));
            number = "";
        }
    }
    return calculateWithPriorities(operationsArray);
}

function isPartOfNumber(char) {
    return !isNaN(Number(char)) || char === '.';
}

// Просчитываем операции в порядке приоритета
function calculateWithPriorities(operationsArray) {
    while (operationsArray.length > 1) {
        let HPO = getHighestPriorityOperation(operationsArray);
        // Выполняем операцию, заменив в массиве операцию и 2 числа на результат
        let result = HPO.funct(operationsArray[HPO.position - 1], operationsArray[HPO.position + 1]);
        operationsArray.splice(HPO.position - 1, 3, result);
    }
    return operationsArray[0];
}

function getHighestPriorityOperation(operationsArray) {
    let HPO = [];
    for (let i = 0; i < operationsArray.length; i++) {
        let current = operationsArray[i];
        // Находим операцию с наивысшим приоритетом
        if (typeof current !== "number" &&
            operations[current] &&
            (typeof HPO[0] === "undefined" || operations[current][0] > HPO[0])) {
            HPO = operations[current];
            HPO[2] = i;
        }
    }
    return { funct: HPO[1], position: HPO[2] }
}