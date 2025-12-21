import { initGoogleRegister } from './google.js';

async function renderRegister() {
  const response = await fetch('../templates/register.hbs');
  const source = await response.text();
  const template = Handlebars.compile(source);

  document.querySelector('.main').innerHTML = template({});

  emitManualRegister();

  initGoogleRegister();
}

function emitManualRegister() {
  const loginBtn = document.getElementById("login");

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const successBox = document.getElementById("check-box");
    const loginBox = document.getElementById("login");
    const nameInput = document.getElementById("name-input");
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    nameInput.classList.remove("error");
    nameError.textContent = "";
    nameError.classList.remove("show");
    emailInput.classList.remove("error");
    emailError.textContent = "";
    emailError.classList.remove("show");
    passwordInput.classList.remove("error");
    passwordError.textContent = "";
    passwordError.classList.remove("show");

    if (!name) {
      nameError.textContent = "Inserisci il nome";
      nameInput.classList.add("error");
      nameError.classList.add("show");
      return
    }

    if (validator.isEmpty(email)) {
      emailError.textContent = "Inserisci l'email";
      emailInput.classList.add("error");
      emailError.classList.add("show");
      return
    } else if (!validator.isEmail(email)) {
      emailError.textContent = "Email non valida";
      emailInput.classList.add("error");
      emailError.classList.add("show");
      return
    }

    if (validator.isEmpty(password)) {
      passwordError.textContent = "Inserisci la password";
      passwordInput.classList.add("error");
      passwordError.classList.add("show");
      return
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

    // Invio dati al backend
    try {
      const res = await fetch("http://localhost:5183/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) throw new Error("Errore dalla richiesta");

      const data = await res.json();
      console.log("TOKEN:", data.token);
      successBox.classList.add("success");
      loginBox.classList.add("success");
    } catch (err) {
      console.error("ERRORE FETCH:", err);
    }
  });
}

// Avvia tutto
renderRegister();
