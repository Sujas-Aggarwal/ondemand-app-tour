let messages = [];
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
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        role: "user",
        message: message,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/chatbot", requestOptions)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            const chatMessage = document.createElement("div");
            chatMessage.classList.add("message");
            chatMessage.classList.add("bot-message");
            chatMessage.innerHTML = result.response;
            chatBotMessages.appendChild(chatMessage);
            messages.push({
                role: "bot",
                content: result.response,
            });
            if (result.type == "help") {
                startTour(result.steps.steps);
            }
        })
        .catch((error) => console.error(error));
}
