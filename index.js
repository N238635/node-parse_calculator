const solveEquation = require('./components/calculator');
var stdin = process.openStdin();

promptMsg();

stdin.addListener("data", function (d) {
    let result = solveEquation(d.toString().trim());
    console.log(`Ответ: ${result}`);
    promptMsg();
});

function promptMsg() {
    console.log("Введите математическое выражение: ");
}