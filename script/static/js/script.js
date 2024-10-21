document
  .getElementById("news-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const resultDiv = document.getElementById("result");

    try {
      const response = await fetch("/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        if (data.prediction === "Fake News") {
          resultDiv.textContent = "This is Fake News!";
          resultDiv.className = "result fake";
        } else {
          resultDiv.textContent = "This is Real News!";
          resultDiv.className = "result not-fake";
        }
      } else {
        resultDiv.textContent = "Error: " + data.error;
        resultDiv.className = "result fake";
      }
    } catch (error) {
      resultDiv.textContent = "Error: Unable to connect to the server.";
      resultDiv.className = "result fake";
    }

    resultDiv.style.display = "block";
  });

const newsText = document.getElementById("news-text");
const resetButton = document.getElementById("reset-button");
const resultDiv = document.getElementById("result");

newsText.addEventListener("input", function () {
  if (newsText.value.trim() !== "") {
    resetButton.style.display = "block";
  } else {
    resetButton.style.display = "none";
  }
  resultDiv.style.display = "none";
});

resetButton.addEventListener("click", function () {
  newsText.value = "";
  resetButton.style.display = "none";
  resultDiv.style.display = "none";
});
