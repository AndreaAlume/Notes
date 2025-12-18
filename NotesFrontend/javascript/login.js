import validator from '../../node_modules/emailvalid/index';
import PasswordValidator from '../../node_modules/password-validator/src/index';

async function renderLogin() {
  const response = await fetch('../templates/login.hbs');
  const source = await response.text();
  const template = Handlebars.compile(source);

  document.querySelector('.main').innerHTML = template({});

  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");
  const login = document.getElementById("login");

  const schema = new PasswordValidator();
  schema
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

  login.addEventListener("click", function() {
    const emailValid = validator.validate(emailInput.value.trim());
    const passwordValid = schema.validate(passwordInput.value.trim());

    if (emailValid && passwordValid) {
      alert("Login valido!");
    } else {
      alert("Email o password non valida.");
    }
  });
}

renderLogin();
