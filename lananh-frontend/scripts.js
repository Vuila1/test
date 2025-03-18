const sessionId = Math.random().toString(36).substring(2);

function appendMessage(sender, message) {
  const chatlog = document.getElementById("chatlog");
  const messageElement = document.createElement("div");
  messageElement.className = `message ${sender}`;
  messageElement.textContent = message;
  chatlog.appendChild(messageElement);
  chatlog.scrollTop = chatlog.scrollHeight;
}

async function sendMessage() {
  const userMessage = document.getElementById("userMessage").value;
  if (!userMessage.trim()) return;

  appendMessage("user", userMessage);
  document.getElementById("userMessage").value = "";

  try {
    const response = await fetch("http://localhost:3000/api/message", { // Cập nhật URL của backend server nếu cần
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage, sessionId }),
    });
    const data = await response.json();
    appendMessage("bot", data.reply);
  } catch (error) {
    appendMessage("bot", "Xin lỗi, có lỗi xảy ra!");
  }
}

document.getElementById("userMessage").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});