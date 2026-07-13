// =========================
// PexiNest AI
// =========================

const chatArea = document.querySelector(".chat-area");
const textarea = document.querySelector("textarea");
const sendBtn = document.querySelector(".send-btn");
const clearChatBtn = document.querySelector(".Clear-Chat");

// إرسال عند الضغط على زر Send
sendBtn.addEventListener("click", sendMessage);

// إرسال عند الضغط على Enter
textarea.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }

});

// زر مسح المحادثة
clearChatBtn.addEventListener("click", clearChat);

// معرفة هل النص عربي
function isArabic(text) {
    return /[\u0600-\u06FF]/.test(text);
}

// إرسال الرسالة
function sendMessage() {

    const message = textarea.value.trim();

    if (message === "") return;

    addMessage("🧑", "You", message);

    textarea.value = "";

    setTimeout(() => {

        const reply = findAnswer(message);

        addMessage("🤖", "PexiNest AI", reply);

    }, 400);

}

// البحث عن الإجابة
function findAnswer(question) {

    const text = question.toLowerCase();

    let bestAnswer = null;
    let bestScore = 0;

    for (const item of knowledge) {

        let score = 0;

        for (const keyword of item.keywords) {

            if (text.includes(keyword.toLowerCase())) {
                score++;
            }

        }

        if (score > bestScore) {

            bestScore = score;

            if (isArabic(question)) {

                if (Array.isArray(item.answer_ar)) {

                    bestAnswer =
                        item.answer_ar[
                            Math.floor(Math.random() * item.answer_ar.length)
                        ];

                } else {

                    bestAnswer = item.answer_ar;

                }

            } else {

                if (Array.isArray(item.answer_en)) {

                    bestAnswer =
                        item.answer_en[
                            Math.floor(Math.random() * item.answer_en.length)
                        ];

                } else {

                    bestAnswer = item.answer_en;

                }

            }

        }

    }

    if (bestAnswer) {
        return bestAnswer;
    }

    if (isArabic(question)) {
        return "❌ آسف، لا أعرف إجابة هذا السؤال حالياً.";
    }

    return "❌ Sorry, I don't know the answer yet.";

}

// إضافة رسالة
function addMessage(icon, name, text) {

    const message = document.createElement("div");

    message.className =
        icon === "🧑" ? "message-user" : "message-ai";

    message.innerHTML = `
        <div class="avatar">${icon}</div>

        <div class="text">
            <h3>${name}</h3>
            <p>${text}</p>
        </div>
    `;

    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;

}

// مسح المحادثة
function clearChat() {

    chatArea.innerHTML = "";

    addMessage(
        "🤖",
        "PexiNest AI",
        `👋 Welcome!

I'm the official AI assistant for PexiNest.

I can help you with everything related to this website.

Feel free to ask me anything!`
    );

}