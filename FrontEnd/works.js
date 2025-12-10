const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();

function genererGallery(works) {
    for (let i = 0; i < works.length; i++) {

        const projet = works[i];
        // Récupération de l'élément du DOM qui accueillera les projets
        const sectionGallery = document.querySelector(".gallery");
        // Création balise dédiée à un projet
        const projetElement = document.createElement("figure");
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = projet.title;

        // On rattache la balise figure a la section Gallery
        sectionGallery.appendChild(projetElement);
        // On rattache les balises img et figcaption à la balise figure
        projetElement.appendChild(imageElement);
        projetElement.appendChild(nomElement);

    };
};

genererGallery(works);

//Gestion des boutons
const btnTous = document.querySelector(".btn-tous");
btnTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(works);
});

const btnObjets = document.querySelector(".btn-objets");
btnObjets.addEventListener("click", function () {
    const worksObjets = works.filter(function (work) {
        return work.category.id === 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(worksObjets);
});

const btnAppartements = document.querySelector(".btn-appartements");
btnAppartements.addEventListener("click", function () {
    const worksAppartements = works.filter(function (work) {
        return work.category.id === 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(worksAppartements);
});

const btnHotels = document.querySelector(".btn-hotels");
btnHotels.addEventListener("click", function () {
    const worksHotels = works.filter(function (work) {
        return work.category.id === 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererGallery(worksHotels);
});

// Affichage du mode édition
const editionBar = document.querySelector(".editionMode");
const btnLogin = document.querySelector(".btn-login");
const btnLogout = document.querySelector(".btn-logout");
const btnModify = document.querySelector(".portfolio-modify");
const filters = document.querySelector(".filters")

let tokenOk = window.localStorage.getItem("sophieBluelToken");

if (tokenOk !== null) {
    editionBar.classList.remove("hidden");
    btnLogin.classList.add("hidden");
    btnLogout.classList.remove("hidden");
    btnModify.classList.remove("hidden");
    filters.classList.add("hidden");
};

btnLogout.addEventListener('click', function () {
    window.localStorage.removeItem("sophieBluelToken");
});