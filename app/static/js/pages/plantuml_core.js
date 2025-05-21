import { initializeCompiler } from "./code_mirror.js";

let currentPath = window.location.pathname.replace("index.html", "");
let compiler = initializeCompiler();
let params = new URLSearchParams(window.location.search);

if (!params.has("uml")) {
    compiler.setValue(`@startuml
    Client -> Server: Request
    Server --> Client: Response
@enduml`);
} else {
    compiler.setValue(decodeURIComponent(params.get("uml")));
} 

let loader_img_uml = document.getElementById("loader-img-uml");
let img_uml = document.getElementById("img-uml");

loader_img_uml.classList.remove("none");
img_uml.classList.add("none");

setTimeout(() => {
    loader_img_uml.classList.add("none");
    img_uml.classList.remove("none");
}, 5000);

function render() {
    loader_img_uml.classList.remove("none");
    img_uml.classList.add("none");

    plantuml.renderPng(compiler.getValue())
        .then(blob => {
            img_uml.src = window.URL.createObjectURL(blob);
            setTimeout(() => {
                loader_img_uml.classList.add("none");
                img_uml.classList.remove("none");
            }, 2000);
        })
        .catch(error => {
            console.error(error);
        });
}

function debounce(func, delay = 500) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => func.apply(this, args), delay);
    };
}
compiler.on("change", debounce(render));

currentPath = currentPath === "/" ? "" : window.location.pathname;
let jarPath = `/app/${currentPath}assets/lib`;

plantuml.initialize(jarPath)
    .then(() => {
        loader_img_uml.classList.add("none");
        img_uml.classList.remove("none");

        render();
    })
    .catch(error => {
        console.error(error);
    });
