const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
});

function handleSendMessage() {
    const message = userInput.value.trim();

    if (!message) return;

    displayUserMessage(message);
    userInput.value = '';

    const analysis = analyzeInput(message);
    const response = queryDatabase(analysis.queryParams);
    const formattedResponse = formatResponse(response);

    displayBotMessage(formattedResponse);
    updateSentiment(analysis.sentiment);
}

function displayUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

function displayBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}

function updateSentiment(sentiment) {
    document.body.classList.remove('sentiment-positive', 'sentiment-neutral', 'sentiment-negative');
    document.body.classList.add(`sentiment-${sentiment}`);
}

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
