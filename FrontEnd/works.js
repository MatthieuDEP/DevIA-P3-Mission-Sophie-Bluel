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