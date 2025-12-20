import { initGoogleRegister } from './google.js';

async function renderLogin() {
  // Carica template Handlebars
  const response = await fetch('../templates/register.hbs');
  const source = await response.text();
  const template = Handlebars.compile(source);

  // Inserisci HTML
  document.querySelector('.main').innerHTML = template({});

  // Inizializza registrazione manuale
  emitManualLogin();

  // Inizializza login Google
  initGoogleRegister();
}

function emitManualLogin() {
  const loginBtn = document.getElementById("login");

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name-input").value.trim();
    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value.trim();

    // Validazioni base
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    emailError.textContent = "";
    passwordError.textContent = "";

    if (!email || !validator.isEmail(email)) {
      emailError.textContent = "Email non valida";
      return;
    }

    if (!password || !validator.isStrongPassword(password, { minLength: 8, minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1 })) {
      passwordError.textContent = "Password non valida";
      return;
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
    } catch (err) {
      console.error("ERRORE FETCH:", err);
    }
  });
}

// Avvia tutto
renderLogin();
