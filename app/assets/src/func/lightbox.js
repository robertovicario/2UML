let img_uml_bg = document.getElementById("img-uml-bg");
img_uml_bg.addEventListener("mouseover", () => {
    document.body.style.cursor = "pointer";
});

img_uml_bg.addEventListener("mouseout", () => {
    document.body.style.cursor = "default";
});

img_uml_bg.addEventListener("click", () => {
    if (img_uml_bg.className !== "none") {
        let modal = new bootstrap.Modal(document.getElementById("modal-5"));
        modal.show();
        document.getElementById("img-lightbox").src = document.getElementById("img-uml").src;
    }
});
