/*document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".formLogin");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email) {
      alert("Por favor, preencha o campo de email.");
      return;
    }

    if (!senha) {
      alert("Por favor, preencha o campo de senha.");
      return;
    }

    alert("Login bem-sucedido!");

    loginForm.submit();
  });
});*/

document
  .querySelector(".formLogin")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    alert(result.message);
  });
