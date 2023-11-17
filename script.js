document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('.buttons');

    // Knappe array
    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];

    // Opret knapper
    buttons.forEach(buttonValue => {
        const button = document.createElement('div');
        button.textContent = buttonValue;
        button.classList.add('button');

        // tilføj klasse til operatorerknapper
        if (buttonValue === '=' || buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
            button.classList.add('operator');
        }

        button.addEventListener('click', () => handleButtonClick(buttonValue));
        buttonsContainer.appendChild(button);
    });

    // Knappers funktionalitet
    function handleButtonClick(value) {
        if (value === '=') {
            // = Udregn i display
            display.value = eval(display.value);
        } else {
            // skriv tal/opratorer i display
            display.value += value;
        }
    }
});