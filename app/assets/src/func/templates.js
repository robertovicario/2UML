import { initializeCompiler } from "../compiler/code_mirror.js";

let select_template = document.getElementById("select-template");
let templates = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/templates.json")
        .then(response => response.json())
        .then(data => {
            templates = data;
            for (const [category, templates] of Object.entries(data)) {
                let optgroup = document.createElement("optgroup");
                optgroup.label = category;

                templates.forEach(template => {
                    let option = document.createElement("option");
                    option.value = template.name;
                    option.textContent = `${template.uml}: ${template.name}`;
                    optgroup.appendChild(option);
                });

                select_template.appendChild(optgroup);
            }
    })
    .catch(error => console.error("Error:", error));
});

let modal = new bootstrap.Modal(document.getElementById("modal-2"));
document.getElementById("btn-templates").addEventListener("click", () => {
    modal.show();
});

document.getElementById("select-template").addEventListener("change", (event) => {
    let selected_template = null;
    for (const templatesArray of Object.values(templates)) {
        selected_template = templatesArray.find(template => template.name === event.target.value);
        if (selected_template) {
            break;
        }
    }

    if (selected_template) {
        document.getElementById("description").value = selected_template.description;
        document.getElementById("select-uml").value = selected_template.uml;
        initializeCompiler().setValue(selected_template.code);
    }

    setTimeout(() => modal.hide(), 0);
});
