const formLogin = document.querySelector(".formLogin");

let user = {
    "email": '',
    "password":'',
}

async function tryLogin(user) {
    const response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    if (response.status === 200) {
        const data = await response.json();
    
        const sophieBluelToken = data.token;
        
        window.localStorage.setItem('sophieBluelToken', sophieBluelToken);

        window.location.assign("../index.html");

    } else {
        alert("Erreur dans l'identifiant ou le mot de passe");
        return;
    };

};

formLogin.addEventListener("submit", event => {
    event.preventDefault();

    user = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };

    tryLogin(user);
});