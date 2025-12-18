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

    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value.trim();

    if (!validator.isEmail(email)) {
      alert("Inserisci un'email valida!");
      return;
    }

    const isStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    });

    if (!isStrong) {
      alert("La password deve avere almeno 8 caratteri, una maiuscola e un numero!");
      return;
    }

    alert("Login valido! Procedi con l'autenticazione...");
  });
}

renderLogin();
