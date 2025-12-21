const GOOGLE_ID = "1011033418492-ajtm3rvmike5vdjd8bdaep80t5boh98u.apps.googleusercontent.com";

let tokenGoogle;

export function initGoogleRegister() {
  const btn = document.getElementById('google-btn');

  tokenGoogle = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    callback: async (response) => {
      if (response.access_token) {
        const userInfo = await getUserInfo(response.access_token);
        emitRegisterGoogle(userInfo);
      }
    }
  });

  btn.addEventListener('click', handleGoogleRegister);
}

export function initGoogleLogin() {
  const btn = document.getElementById('google-btn');

  // Inizializza Google
  tokenGoogle = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    callback: async (response) => {
      if (response.access_token) {
        const userInfo = await getUserInfo(response.access_token);
        emitLoginrGoogle(userInfo);
        const successBox = document.getElementById("check-box");
        const loginBox = document.getElementById("login");
        successBox.classList.add("success");
        loginBox.classList.add("success");
      }
    }
  });

  // Evento click
  btn.addEventListener('click', handleGoogleRegister);
}

function handleGoogleRegister() {
  if (!tokenGoogle) {
    console.error("Google non inizializzato");
    return;
  }
  tokenGoogle.requestAccessToken();
}

async function getUserInfo(token) {
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(res);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

async function emitRegisterGoogle(googleData) {
  /*
  console.log("DATI RICEVUTI DA GOOGLE:");
  console.log("Nome:", googleData.name);
  console.log("Email:", googleData.email);
  console.log("Google ID:", googleData.id);
  console.log("Foto:", googleData.picture);
  */
  try {
    const res = await fetch("http://localhost:5183/api/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: googleData.name,
        email: googleData.email,
        googleId: googleData.id
      })
    });

    if (!res.ok) throw new Error("Errore dalla richiesta");
    const data = await res.json();
    console.log("TOKEN GOOGLE:", data.token);
  } catch (err) {
    console.error("ERRORE FETCH GOOGLE:", err);
  }
}


async function emitLoginrGoogle(googleData) {
  /*
  console.log("DATI RICEVUTI DA GOOGLE:");
  console.log("Nome:", googleData.name);
  console.log("Email:", googleData.email);
  console.log("Google ID:", googleData.id);
  console.log("Foto:", googleData.picture);
  */
  try {
    const res = await fetch("http://localhost:5183/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: googleData.email,
        googleId: googleData.id
      })
    });

    if (!res.ok) throw new Error("Errore dalla richiesta");

    const data = await res.json();
    console.log("TOKEN GOOGLE:", data.token);
    const successBox = document.getElementById("check-box");
    const loginBox = document.getElementById("login");
    successBox.classList.add("success");
    loginBox.classList.add("success");
  } catch (err) {
    console.error("ERRORE FETCH GOOGLE:", err);
  }
}
