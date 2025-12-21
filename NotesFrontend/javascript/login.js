import { initGoogleLogin } from './google.js';

async function renderLogin() {
  const response = await fetch('../templates/login.hbs');
  const source = await response.text();
  const template = Handlebars.compile(source);

  document.querySelector('.main').innerHTML = template({});
  emitManualLogin()

  initGoogleLogin()

}

function emitManualLogin() {
    const loginBtn = document.getElementById("login-btn");

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const successBox = document.getElementById("check-box");
    const loginBox = document.getElementById("login");
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    

    emailInput.classList.remove("error");
    emailError.textContent = "";
    emailError.classList.remove("show");
    passwordInput.classList.remove("error");
    passwordError.textContent = "";
    passwordError.classList.remove("show");


    if (validator.isEmpty(email)) {
      emailError.textContent = "Inserisci l'email";
      emailInput.classList.add("error");
      emailError.classList.add("show");
    } else if (!validator.isEmail(email)) {
      emailError.textContent = "Email non valida";
      emailInput.classList.add("error");
      emailError.classList.add("show");
    }

    if (validator.isEmpty(password)) {
      passwordError.textContent = "Inserisci la password";
      passwordInput.classList.add("error");
      passwordError.classList.add("show");
    } else if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
    ) {
      passwordError.textContent =
        "La password deve avere almeno 8 caratteri, una maiuscola, un numero e un carattere speciale";
      passwordInput.classList.add("error");
      passwordError.classList.add("show");
    }


  fetch("http://localhost:5183/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Errore dalla richiesta");
    }
    return res.json();
  })
  .then(data => {
    successBox.classList.add("success");
    loginBox.classList.add("success");
    console.log("TOKEN:", data.token);
  })
  .catch(err => {
    console.error("ERRORE FETCH:", err);
  });  

  });
}

renderLogin();
