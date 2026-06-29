const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submitBtn');
const output = document.getElementById('output');

submitBtn.addEventListener('click', handleSubmit);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
});

function handleSubmit() {
    const inputValue = userInput.value.trim();

    if (inputValue === '') {
        output.textContent = 'Please enter some text.';
        output.className = 'output error';
        return;
    }

    output.textContent = `You sent: ${inputValue}`;
    output.className = 'output success';

    userInput.value = '';
    userInput.focus();
}
