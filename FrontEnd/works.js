export async function findWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    const works = await response.json();
    if(response.ok){
        return works;
    }
    return null;
};

const works = await findWorks();

generateGallery(works);

export function generateGallery(works) {
    // Récupération de l'élément du DOM qui accueillera les projets
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML="";

    for (let i = 0; i < works.length; i++) {

        const projet = works[i];
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

// Création des filtres
async function generateFilters() {
    const filtersContainer = document.getElementById("filters");
    filtersContainer.innerHTML = "";

    // Bouton "Tous"
    const btnTous = document.createElement("button");
    btnTous.classList.add("btn-filter");
    btnTous.textContent = "Tous";
    btnTous.dataset.categoryId = "0";
    filtersContainer.appendChild(btnTous);

    // Récupérer les catégories
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.classList.add("btn-filter");
        btn.textContent = cat.name;
        btn.dataset.categoryId = cat.id;
        filtersContainer.appendChild(btn);
    });

    activateFilterButtons();
}

generateFilters();

// Activation des filtres
function activateFilterButtons() {
    const buttons = document.querySelectorAll(".btn-filter");

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            const categoryId = button.dataset.categoryId;

            if (categoryId === "0") {
                generateGallery(works);
            } else {
                const filtered = works.filter(work => work.categoryId == categoryId);
                generateGallery(filtered);
            }
        });
    });
}

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