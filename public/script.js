const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  fetch("/sendfeedback", {
    method: "POST",
    headers: {0
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Successful!");
        window.location.href = "/feedback.html";
      } else {
        alert("Error!");
      }
    })
    .catch((error) => {
      console.error("Error adding feedback:", error);
    });
});

// script.js
