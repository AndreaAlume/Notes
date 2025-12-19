async function renderLogin() {
  const response = await fetch('../templates/login.hbs');
  const source = await response.text();
  const template = Handlebars.compile(source);

  document.querySelector('.main').innerHTML = template({});
  emitLogin()

}

function emitLogin() {
    const loginBtn = document.getElementById("login");

  loginBtn.addEventListener("click", function(e) {
    e.preventDefault();

    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    emailInput.classList.remove("error");
    emailError.textContent = "";
    emailError.classList.remove("show");
    
    if (!validator.isEmail(email)) {
      emailInput.classList.add("error")
      emailError.textContent = "Email non valida";
      emailError.classList.add("show");
      return;
    }
    
    const isStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });
    
    passwordInput.classList.remove("error");
    passwordError.textContent = "";
    passwordError.classList.remove("show");

    if (!isStrong) {
      passwordInput.classList.add("error")
      passwordError.textContent = "Password non valida";
      passwordError.classList.add("show");
      return;
    }

    alert("Login valido! Procedi con l'autenticazione...");
  });
}

async function emitLoginGoogle() {

}

renderLogin();
