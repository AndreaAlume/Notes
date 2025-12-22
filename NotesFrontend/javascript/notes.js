
async function render() {
  const response = await fetch('../templates/notes.hbs');
  const source = await response.text();
  const template = Handlebars.compile(source);

  
  try {
    const res = await fetch("http://localhost:5183/api/notes");
    
    if (!res.ok) throw new Error("Errore dalla richiesta");
    
    const notes = await res.json();
    console.log(notes);
    document.querySelector('.main').innerHTML = template({ notes: notes });
      
    } catch (err) {
      console.error("ERRORE FETCH:", err);
    }
    
};

async function modify() {
  const modifyBtn = document.getElementById("modify-btn");
  modifyBtn.addEventListener("click", async (e) => {
    e.preventDefault();

  const res = await fetch(`http://localhost:5183/api/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name, description, exipiryDate, deleted, tag
    })
  });

  });
}


render()