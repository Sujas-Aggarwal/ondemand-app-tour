let messages = [
    {
        role: "bot",
        content:
            "Hello! I am your personal assistant. How can I help you today?",
    },
    {
        role: "user",
        content: "I am looking for a new job",
    },
];
const chatBotMessages = document.querySelector(".chatbot-message");
for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("message");
    chatMessage.classList.add(message.role + "-message");
    chatMessage.innerHTML = message.content;
    chatBotMessages.appendChild(chatMessage);
}
const chatbotInput = document.querySelector(".chatbot-input input");
const chatbotSend = document.querySelector(".chatbot-input button");
chatbotSend.addEventListener("click", addMessage);
chatbotInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addMessage();
    }
});
function addMessage() {
    if (chatbotInput.value === "") {
        return;
    }
    const message = chatbotInput.value;
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("message");
    chatMessage.classList.add("user-message");
    chatMessage.innerHTML = message;
    chatBotMessages.appendChild(chatMessage);
    chatbotInput.value = "";
    messages.push({
        role: "user",
        content: message,
    });
}
