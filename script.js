document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttonsContainer = document.querySelector('.buttons');

    let memory1 = 0;
    let memory2 = 0;
    let calculationResult = false;

    // Funktion til at tilføje en knap
    function addButton(value, specialClass = '') {
        const button = document.createElement('div');
        button.textContent = value;
        button.classList.add('button'); // Tilføj standardklasse til knapper
        if (specialClass) {
            button.classList.add(specialClass); // Tilføj ekstra klasse til særlige knapper
        }
        button.addEventListener('click', () => handleButtonClick(value));
        buttonsContainer.appendChild(button);
    }

    // Funktion til at håndtere knaptryk
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

    // Funktion til at evaluere udtrykket
    function evaluateExpression() {
        display.value = eval(display.value);
        calculationResult = true // sætter variabel til tegn ikke må slettes
    }

    // Funktion til at slette det sidste tegn
    function deleteLastCharacter() {
        const currentExpression = display.value;

        // Tjek om det sidste tegn er resultatet af en udregning
        if (calculationResult) {
            return;
        }
        // Slet det sidste tegn
        display.value = currentExpression.slice(0, -1);
    }

    // Funktion til at rydde displayet
    function clearDisplay() {
        display.value = '';
    }

    // Funktion til at gemme værdi i hukommelse
    function saveToMemory(memoryType) {
        const memoryValue = display.value;
        if (memoryType === 'M1') {
            memory1 = memoryValue;
        } else {
            memory2 = memoryValue;
        }
    }

    // Funktion til at tilføje værdi til displayet
    function addToDisplay(value) {
        const currentExpression = display.value;
        const lastCharacter = currentExpression.slice(-1);
    
        // Tjek om displayet er tomt, og det indtastede tegn er en af de forbudte operatører
        if (currentExpression === '' && ['+', '/', '*'].includes(value)) {
            // Ignorer tilføjelsen
            return;
        }
    
        // Tjek om det sidste tegn er resultatet af en udregning
        if (calculationResult && !['+', '-', '*', '/'].includes(value)) {
            // Ignorer tilføjelsen, hvis det er et tal efter en udregning
            return;
        }
    
        display.value += value;
        calculationResult = false; // Nulstil variablen, når der tilføjes en ny værdi
    }

    // Tilføjede knapper: M1, M2, C, CLR, osv.
    const buttons = [
        'M1', 'M2', 'C', 'CLR',
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];

    // Tilføj knapper ved at iterere over knapværdierne
    buttons.forEach(buttonValue => {
        // Tilføj ekstra klasse til 'M1' og 'M2' knapper
        const specialClass = buttonValue === 'M1' || buttonValue === 'M2' ? 'special' : '';
        addButton(buttonValue, specialClass);
    });
});
