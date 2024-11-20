document.getElementById("btn-save-download").addEventListener("click", () => {
    let img_uml = document.getElementById("img-uml");
    let url = img_uml.src;

    let filename = document.getElementById("input-save-download").value;
    if (filename === "") {
        filename = "Your_UML";
    }

    fetch(url)
    .then(function(response) {
        return response.blob();
    })
    .then(function(blob) {
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${filename}.png`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        bootstrap.Modal.getInstance(document.getElementById("modal-4")).hide();
    });
});
