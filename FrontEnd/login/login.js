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
    console.log(response);

    if (response.status === 200) {
        window.location.assign("http://127.0.0.1:5500/index.html");
    } else {
        alert("Erreur dans l'identifiant ou le mot de passe");
    };

    const data = await response.json();
    console.log(data);

    const sophieBluelToken = data.token;
    
    window.localStorage.setItem('sophieBluelToken', sophieBluelToken);
};

formLogin.addEventListener("submit", event => {
    event.preventDefault();

    user = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };

    console.log(user);
    tryLogin(user);
});