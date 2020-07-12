var stdin = process.openStdin();

const operations = {
    '+': [0, (a, b) => { return a + b }],
    '-': [0, (a, b) => { return a - b }],
    '*': [1, (a, b) => { return a * b }],
    '/': [1, (a, b) => { return a / b }],
}

promptMsg();

stdin.addListener("data", function (d) {
    let result = solveEquation(d.toString().trim());
    console.log(`Ответ: ${result}`);
    promptMsg();
});

function promptMsg() {
    console.log("Введите математическое выражение: ");
}

function solveEquation(str) {
    let operationsArray = [];
    let bracketCount = 0;
    let start = 0;
    let number = "";
    for (let i = 0; i < str.length; i++) {
        // Считаем скобки
        switch (str[i]) {
            case "(":
                if (bracketCount === 0) start = i;
                bracketCount++;
                break;
            case ")":
                bracketCount--;
                if (bracketCount === 0) {
                    // Решаем выражение внутри скобок,записываем результат в массив
                    let res = solveEquation(str.substr(start + 1, i - 1));
                    operationsArray.push(res);
                }
                break;
            default:
                // Записываем все что вне скобок в массив
                if (bracketCount === 0) {
                    if (!isNaN(str[i]) || str[i] === ".") {
                        // Если часть числа, то собираем число в одну строку
                        number += str[i];
                    } else {
                        operationsArray.push(str[i]);
                    }
                }
                break;
        }
        // Если следующее значение не часть числа, то записываем число в массив
        if ((isNaN(str[i + 1]) || str[i + 1] === '.') && number !== "") {
            operationsArray.push(Number(number));
            number = "";
        }
    }
    // Считаем операции из массива и возвращаем результат
    return calculateWithPriorities(operationsArray);
}

// Просчитываем операции в порядке приоритета
function calculateWithPriorities(operationsArray) {
    while (operationsArray.length > 1) {
        // Highest Priority Operation
        let HPOperation = [];
        for (let i = 0; i < operationsArray.length; i++) {
            let current = operationsArray[i];
            // Находим операцию с наивысшим приоритетом
            if (typeof current !== "number" &&
                operations[current] &&
                (!HPOperation[0] || operations[current][0] > HPOperation[0])) {
                HPOperation = operations[current];
                HPOperation[2] = i;
            }
        }
        // Выполняем операцию, заменив в массиве операцию на результат
        let operation = HPOperation[1];
        let position = HPOperation[2];
        // Берем числа слева и с права (не проверяется на правильность!)
        let result = operation(operationsArray[position - 1], operationsArray[position + 1]);
        operationsArray.splice(position - 1, 3, result);
    }
    return operationsArray[0];
}