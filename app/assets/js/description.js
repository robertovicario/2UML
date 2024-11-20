let description_el = document.getElementById("description");
let select_uml_el = document.getElementById("select-uml");

description_el.addEventListener("input", () => {
    description_el.style.height = "auto";
    description_el.style.height = `${description_el.scrollHeight}px`;
});