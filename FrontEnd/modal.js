// MODALE OUVERTURE / FERMETURE
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".modalOpenButton");
const closeModalBtn = document.querySelector(".modalCloseButton");

const openModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// CHARGEMENT DES WORKS
const responseModal = await fetch("http://localhost:5678/api/works");
const worksModal = await responseModal.json();

const modalGallery = document.querySelector(".modalGallery");

// Génération de la galerie de la modale
function generateGalleryModal(works) {
    modalGallery.innerHTML = ""; // vide la galerie avant génération

    works.forEach(work => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl;

        const btn = document.createElement("button");
        btn.classList.add("trashButton");
        btn.dataset.id = work.id;

        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can");
        icon.dataset.id = work.id;

        btn.appendChild(icon);
        figure.appendChild(img);
        figure.appendChild(btn);
        modalGallery.appendChild(figure);
    });
}

generateGalleryModal(worksModal);

// Bascule entre les vues de la modale
const modalReturnButton = document.querySelector(".modalReturnButton");
const modalTitleGallery = document.querySelector(".modalTitleGallery");
const modalTitleAddPhoto = document.querySelector(".modalTitleAddPhoto");
const modalForm = document.querySelector(".modalForm");
const modalAddButton = document.querySelector(".modalAddButton");

modalAddButton.addEventListener("click", () => {
    modalReturnButton.classList.remove("hidden");
    modalTitleAddPhoto.classList.remove("hidden");
    modalForm.classList.remove("hidden");

    modalTitleGallery.classList.add("hidden");
    modalGallery.classList.add("hidden");
    modalAddButton.classList.add("hidden");
});

modalReturnButton.addEventListener("click", () => {
    modalReturnButton.classList.add("hidden");
    modalTitleAddPhoto.classList.add("hidden");
    modalForm.classList.add("hidden");

    modalTitleGallery.classList.remove("hidden");
    modalGallery.classList.remove("hidden");
    modalAddButton.classList.remove("hidden");

    generateGalleryModal(worksModal);
});


// Prévisualisation de l'image dans la modale
const form = document.getElementById("form");
const fileInput = document.getElementById("fileUpload");

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formWrapper = document.querySelector(".formWrapper");
    const formImage = document.querySelector(".formImage");

    // Supprimer une prévisualisation existante
    const oldPreview = document.querySelector(".modalPreviewContainer");
    if (oldPreview) oldPreview.remove();

    const previewContainer = document.createElement("div");
    previewContainer.classList.add("modalPreviewContainer");
    const previewImg = document.createElement("img");

    const reader = new FileReader();
    reader.onload = ev => {
        previewImg.src = ev.target.result;
        previewContainer.appendChild(previewImg);
        formWrapper.insertBefore(previewContainer, formWrapper.firstChild);
        formImage.classList.add("hidden");
    };
    reader.readAsDataURL(file);
});

// Vérification champs formulaire
const title = document.getElementById("title");
const category = document.getElementById("category");
const validateButton = document.querySelector(".modalValidateButton");

form.addEventListener("input", () => {
    if (title.value && category.value && fileInput.files.length > 0) {
        validateButton.classList.add("modalValidateButtonChecked");
        validateButton.classList.remove("modalValidateButton");
    } else {
        validateButton.classList.add("modalValidateButton");
        validateButton.classList.remove("modalValidateButtonChecked");
    }
});