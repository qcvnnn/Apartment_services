window.onload = function(){
    // Переменные для хранения чисел и операций
    let a = ''           // Первое число
    let b = ''           // Второе число
    let expressionResult = ''  // Результат вычисления
    let selectedOperation = null  // Выбранная операция
        // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")


    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
        function onDigitButtonClicked(digit) {

        if (!selectedOperation) {

            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {

                a += digit;
            }
            outputElement.innerHTML = a;
        }

        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });


    // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    }

        // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        numberHistory = [];
        outputElement.innerHTML = 0
    }

    function updateDisplay(value) {
        outputElement.innerHTML = value;
    }

    document.getElementById("btn_op_percent").onclick = function () {
        if (!selectedOperation && a !== '') {
            expressionResult = (parseFloat(a) / 100);
        } else if (selectedOperation && b !== '') {
            expressionResult = (parseFloat(b) / 100);
        } else if (a !== '' && selectedOperation && b === '') {
            expressionResult = (parseFloat(a) / 100);
        }
                a = expressionResult.toString()
        b = ''
        selectedOperation = null

        // Показываем результат на экране
        outputElement.innerHTML = a
    }

    document.getElementById("btn_op_backspace").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = a.slice(0, -1);
        outputElement.innerHTML = a || '0';
        } else if (selectedOperation && b !== '') {
            b = b.slice(0, -1);
        outputElement.innerHTML = b || '0';
        }
    }

document.getElementById("btn_op_sqrt").onclick = function() {
    if (!selectedOperation && a !== '') {
        expressionResult = Math.sqrt(parseFloat(a));
        a = expressionResult.toString();
        outputElement.innerHTML = a;
    } else if (selectedOperation && b !== '') {
        expressionResult = Math.sqrt(parseFloat(b));
        b = expressionResult.toString();
        outputElement.innerHTML = b;
    }
}

document.getElementById("btn_op_square").onclick = function() {
    if (!selectedOperation && a !== '') {
        expressionResult = Math.pow(parseFloat(a), 2);
        a = expressionResult.toString();
        outputElement.innerHTML = a;
    } else if (selectedOperation && b !== '') {
        expressionResult = Math.pow(parseFloat(b), 2);
        b = expressionResult.toString();
        outputElement.innerHTML = b;
    }
}

document.getElementById("btn_op_factorial").onclick = function() {
    if (!selectedOperation && a !== '') {
        let num = parseFloat(a);
        if (Number.isInteger(num) && num >= 0) {
            let fact = 1;
            for (let i = 2; i <= num; i++) fact *= i;
            a = fact.toString();
            outputElement.innerHTML = a;
        } else {
            outputElement.innerHTML = "Error";
        }
    } else if (selectedOperation && b !== '') {
        let num = parseFloat(b);
        if (Number.isInteger(num) && num >= 0) {
            let fact = 1;
            for (let i = 2; i <= num; i++) fact *= i;
            b = fact.toString();
            outputElement.innerHTML = b;
        }
    }
}

document.getElementById("btn_op_000").onclick = function() {
    if (!selectedOperation) {
        a += '000';
        outputElement.innerHTML = a;
    } else {
        b += '000';
        outputElement.innerHTML = b;
    }
}

let numberHistory = [];

document.getElementById("btn_op_avg").onclick = function() {
    if (a !== '') {
        numberHistory.push(parseFloat(a));
        a = '';
    }

    if (b !== '') {
        numberHistory.push(parseFloat(b));
        b = '';
    }

    if (numberHistory.length === 0) {
        outputElement.innerHTML = "0";
        return;
    }

    let sorted = [...numberHistory].sort((x, y) => x - y);
    let median;
    let mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
        median = sorted[mid];
    }

    outputElement.innerHTML = median;

    selectedOperation = null;
}



    document.getElementById("btn_op_equal").onclick = function() {

        if (a === '' || b === '' || !selectedOperation)
            return


        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)

                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;

            default:
                break;
        }
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
    }
};
