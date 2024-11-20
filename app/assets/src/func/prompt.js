import { initializeCompiler } from "../compiler/code_mirror.js";

let description_el = document.getElementById("description");
let select_uml_el = document.getElementById("select-uml");

document.addEventListener("DOMContentLoaded", () => {
    description_el.value = "";
});

document.getElementById("btn-prompt").addEventListener("click", () => {
    let description = description_el.value;
    let select_uml = select_uml_el.options[select_uml_el.selectedIndex].text;

    if (description !== "") {
        let modal = new bootstrap.Modal(document.getElementById("modal-1"));
        modal.show();

        let prompt = `Generate PlantUML code to create a ${select_uml} diagram that models a system according to the following requirements: ${description}. Ensure continuity by considering your previous response when providing new information.`;

        fetch("/prompt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt
            })
        })
        .then(response => response.json())
        .then(data => {
            let prompt_formatted = data.prompt.match(/@startuml[\s\S]*@enduml/);
            initializeCompiler().setValue(prompt_formatted[0]);
        })
        .catch(error => console.error(error))
        .finally(() => modal.hide());
    }
});
