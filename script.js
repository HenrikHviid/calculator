document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('.buttons');

    let memory1 = 0;
    let memory2 = 0;

    function addButton(value, specialClass = '') {
        const button = document.createElement('div');
        button.textContent = value;
        button.classList.add('button');  // Fjern specialClass her
        if (specialClass) {
            button.classList.add(specialClass);  // Tilføj specialClass kun hvis det er defineret
        }
        button.addEventListener('click', () => handleButtonClick(value));
        buttonsContainer.appendChild(button);
    }
    

    function handleButtonClick(value) {
        switch (value) {
            case '=':
                evaluateExpression();
                break;
            case 'C':
                deleteLastCharacter();
                break;
            case 'CLR':
                clearDisplay();
                break;
            case 'M1':
            case 'M2':
                saveToMemory(value);
                break;
            default:
                addToDisplay(value);
        }
    }

    function evaluateExpression() {
        display.value = eval(display.value);
    }

    function deleteLastCharacter() {
        const currentExpression = display.value;
        const lastCharacter = currentExpression.slice(-1);

        if (['+', '-', '*', '/'].includes(lastCharacter)) {
            display.value = currentExpression.slice(0, -1);
        } else {
            display.value = currentExpression;
        }
    }

    function clearDisplay() {
        display.value = '';
    }

    function saveToMemory(memoryType) {
        const memoryValue = display.value;
        if (memoryType === 'M1') {
            memory1 = memoryValue;
        } else {
            memory2 = memoryValue;
        }
    }

    function addToDisplay(value) {
        const currentExpression = display.value;
    
        // Tjek om displayet er tomt og det indtastede tegn er en af de forbudte operatører
        if (currentExpression === '' && ['+', '/', '*'].includes(value)) {
            // Ignorer tilføjelsen
            return;
        }
    
        display.value += value;
    }
    
    // Tilføjede knapper: M1, M2, C, CLR
    const buttons = [
        'M1', 'M2', 'C', 'CLR',
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];

    buttons.forEach(buttonValue => {
        // Tilføj ekstra klasse til 'M1' og 'M2' knapper
        const specialClass = buttonValue === 'M1' || buttonValue === 'M2' ? 'special' : '';
        addButton(buttonValue, specialClass);
    });
});
