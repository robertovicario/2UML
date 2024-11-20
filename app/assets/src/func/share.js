import { initializeCompiler } from "../compiler/code_mirror.js";

let compiler = initializeCompiler();
document.getElementById("btn-share").addEventListener("click", function() {
    let uml = compiler.getValue();
    let encode = encodeURIComponent(uml);
    let currentUrl = window.location.href.split("?")[0];
    let newUrl = `${currentUrl}?uml=${encode}`;
    navigator.clipboard.writeText(newUrl);
});
