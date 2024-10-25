document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const welcomeMessage = document.createElement("div");
  welcomeMessage.className = "message bot-message";
  welcomeMessage.textContent =
    "Welcome to Fake News Detection! Ask me if the news is real or fake.";
  chatBox.appendChild(welcomeMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
});

document
  .getElementById("news-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const chatBox = document.getElementById("chat-box");

    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = formData.get("news");
    chatBox.appendChild(userMessage);
    document.getElementById("news-text").value = "";

    const typingIndicator = document.createElement("div");
    typingIndicator.className = "message bot-message typing";
    typingIndicator.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(async function () {
      try {
        const response = await fetch("/predict", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        typingIndicator.remove();

        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.textContent =
          data.prediction === "Fake News"
            ? "This is Fake News!"
            : "This is Real News!";
        botMessage.classList.add(
          data.prediction === "Fake News" ? "fake" : "not-fake"
        );

        chatBox.appendChild(botMessage);
      } catch (error) {
        typingIndicator.remove();
        const errorMessage = document.createElement("div");
        errorMessage.className = "message bot-message fake";
        errorMessage.textContent = "Error: Unable to connect to the server.";
        chatBox.appendChild(errorMessage);
      }

      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1500);
  });

const newsText = document.getElementById("news-text");
const resetButton = document.getElementById("reset-button");
const chatBox = document.getElementById("chat-box");

newsText.addEventListener("input", function () {
  if (newsText.value.trim() !== "") {
    resetButton.style.display = "block";
  } else {
    resetButton.style.display = "none";
  }
});

resetButton.addEventListener("click", function () {
  newsText.value = "";
  chatBox.innerHTML = "";

  const resetMessage = document.createElement("div");
  resetMessage.className = "message bot-message";
  resetMessage.textContent = "What would you like to check next?";
  chatBox.appendChild(resetMessage);

  resetButton.style.display = "none";
});
