document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const errorMessage = document.getElementById('error-message');
    const buttonsContainer = document.querySelector('.buttons');

    let memories = new Array(10).fill('');
    let selectedMemorySlot = null;
    let calculationResult = false;

    // Funktion til at tilføje en knap
    function addButton(value, specialClass, operatorClass = '') {
        const button = document.createElement('div');
        button.textContent = value;
        button.classList.add('button'); // Tilføj standardklasse til knapper
        if (specialClass) {
            button.classList.add(specialClass); // Tilføj ekstra klasse special knapper
        }
        if (operatorClass) {
            button.classList.add(operatorClass); // Tilføj ekstra klasse til operator knapper
        }
        button.addEventListener('click', () => handleButtonClick(value));
        buttonsContainer.appendChild(button);
    }

        // Funktion til at vise fejlmeddelelse
        function showErrorMessage(message) {
            errorMessage.textContent = message;
        }
    
        // Funktion til at skjule fejlmeddelelse
        function hideErrorMessage() {
            errorMessage.textContent = '';
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
                hideErrorMessage();
                break;
            case 'M':
                saveToMemory();
                break;
            case 'R':
                showMemoryPopup();
                break;
            default:
                addToDisplay(value);
                hideErrorMessage();
        }
    }

    // Funktion til at evaluere udtrykket
    function evaluateExpression() {
        display.value = eval(display.value);
        calculationResult = true; // sætter variabel til tegn ikke må slettes
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
    function saveToMemory() {
        const inputValue = display.value;

        // Automatisk vælg den næste ledige hukommelsesplads
        selectedMemorySlot = memories.indexOf('');
        if (selectedMemorySlot === -1) {
            showErrorMessage('Alle hukommelsespladser er fyldte.');
            return;
        }

        memories[selectedMemorySlot] = inputValue;
        showErrorMessage(`Værdien er gemt i hukommelse ${selectedMemorySlot + 1}`);
    }

    // Funktion til at vise popup med gemte værdier og lade brugeren vælge
    function showMemoryPopup() {
        const memoryOptions = memories.map((value, index) => ({
            label: `Hukommelse ${index + 1}: ${value}`,
            value: index
        }));

        const selectedOption = window.prompt('Vælg en gemt værdi:\n\n' +
            memoryOptions.map(option => `${option.label}`).join('\n'));

        if (selectedOption !== null && !isNaN(selectedOption)) {
            selectedMemorySlot = parseInt(selectedOption, 10);
            retrieveFromMemory();
        }
    }

    // Funktion til at hente værdi fra hukommelse
    function retrieveFromMemory() {
        // Tjek om der er valgt en hukommelsesplads
        if (selectedMemorySlot === null || isNaN(selectedMemorySlot) ||
            selectedMemorySlot < 0 || selectedMemorySlot >= memories.length) {
            alert('Ugyldig hukommelsesplads. Hentning annulleret.');
            return;
        }

        display.value += memories[selectedMemorySlot];
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

    // Tilføjede knapper: M, R, C, CLR, osv.
    const buttons = [
        'M', 'R', 'C', 'CLR',
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+'
    ];

    // Tilføj knapper ved at iterere over knapværdierne
    buttons.forEach(buttonValue => {
        // Tilføj ekstra klasse til functions buttons knapper
        const functionclass = buttonValue === 'M' || buttonValue === 'R' || buttonValue === 'C' || buttonValue === 'CLR' ? 'function' : '';
        const operatorClass = buttonValue === '/' || buttonValue === '*' || buttonValue === '-' || buttonValue === '+' || buttonValue === '=' ? 'operator' : '';
        addButton(buttonValue, functionclass, operatorClass);

    });
});
