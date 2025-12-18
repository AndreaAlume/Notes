async function renderLogin() {
  const response = await fetch('../templates/login.hbs');
  const source = await response.text();

  const template = Handlebars.compile(source);

  document.querySelector('.main').innerHTML = template({});
}

renderLogin();
