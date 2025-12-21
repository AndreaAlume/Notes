
async function render() {
  const response = await fetch('../templates/notes.hbs');
  const source = await response.text();
  const template = Handlebars.compile(source);

  document.querySelector('.main').innerHTML = template({});

}

render()