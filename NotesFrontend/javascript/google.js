const GOOGLE_ID = "1011033418492-ajtm3rvmike5vdjd8bdaep80t5boh98u.apps.googleusercontent.com";

let tokenGoogle;
let accessToken;

// Inizializza Google quando la libreria è caricata
function initializeGoogle() {
    tokenGoogle = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        callback: (response) => {
            if (response.access_token) {
                accessToken = response.access_token;
                getUserInfo(accessToken);
            }
        },
    });
}

// Funzione da chiamare quando clicchi il bottone
function handleGoogleLogin() {
    if (!tokenGoogle) {
        console.error('Google non è ancora inizializzato!');
        return;
    }
    tokenGoogle.requestAccessToken();
}

export async function getUserInfo(token) {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userInfo = await response.json();
            
            console.log('Name: ', userInfo.name)
            console.log('Google ID:', userInfo.id);
            console.log('Email:', userInfo.email);
            
        } else {
            console.error('Errore nel recupero delle informazioni utente');
        }
    } catch (error) {
        console.error('Errore:', error);
    }

    return userInfo;
}

// ⚠️ IMPORTANTE: Aspetta che Google sia caricato
window.onload = function() {
    // Dai tempo alla libreria Google di caricarsi
    setTimeout(() => {
        if (typeof google !== 'undefined') {
            initializeGoogle();
            
            // Collega il bottone
            document.getElementById('google-btn').addEventListener('click', handleGoogleLogin);
        } else {
            console.error('La libreria Google non è stata caricata!');
        }
    }, 500);
};