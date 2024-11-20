import { initializeCompiler } from "../compiler/code_mirror.js";

document.addEventListener("DOMContentLoaded", () => {
    function loadChats() {
        let chats = JSON.parse(localStorage.getItem("chats")) || [];
        let links = JSON.parse(localStorage.getItem("links")) || [];

        chats.forEach((title, index) => {
            let link = links[index];
            newChat("ul-menu", title, link);
            newChat("ul-menu-mobile", title, link);
        });
    }
    loadChats();

    function storeChat(title, newUrl) {
        let chats = JSON.parse(localStorage.getItem("chats")) || [];
        if (!chats.includes(title)) {
            chats.push(title);
            localStorage.setItem("chats", JSON.stringify(chats));
        }

        let links = JSON.parse(localStorage.getItem("links")) || [];
        if (!links.includes(newUrl)) {
            links.push(newUrl);
            localStorage.setItem("links", JSON.stringify(links));
        }
    }

    function newChat(ul_el, title, link) {
        let li_el = document.createElement("li");
        li_el.className = "nav-item d-flex flex-row justify-content-center align-items-center";
        li_el.style = "margin: 0 0 8px;width: 100%;";

        let link_el = document.createElement("a");
        link_el.className = "btn btn-primary text-truncate d-md-flex justify-content-md-start align-items-md-center btn-menu";
        link_el.setAttribute("role", "button");
        link_el.style = "width: 100%;color: var(--bs-body-color);text-align: left;padding: 10px 20px;border-style: none;border-radius: 10px;height: 40px;background: transparent;";
        link_el.href = link;
        link_el.textContent = title;

        let btn_el = document.createElement("button");
        btn_el.className = "btn btn-primary d-flex justify-content-center align-items-center btn-menu btn-chat-edit";
        btn_el.type = "button";
        btn_el.style = "background: transparent;padding: 10px;height: 40px;border-style: none;border-radius: 10px;width: 40px;";

        let svg_el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg_el.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg_el.setAttribute("width", "1em");
        svg_el.setAttribute("height", "1em");
        svg_el.setAttribute("viewBox", "0 0 20 20");
        svg_el.setAttribute("fill", "none");
        svg_el.style = "color: var(--bs-body-color);";

        let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M6 10C6 11.1046 5.10457 12 4 12C2.89543 12 2 11.1046 2 10C2 8.89543 2.89543 8 4 8C5.10457 8 6 8.89543 6 10Z");
        path1.setAttribute("fill", "currentColor");

        let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10Z");
        path2.setAttribute("fill", "currentColor");

        let path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path3.setAttribute("d", "M16 12C17.1046 12 18 11.1046 18 10C18 8.89543 17.1046 8 16 8C14.8954 8 14 8.89543 14 10C14 11.1046 14.8954 12 16 12Z");
        path3.setAttribute("fill", "currentColor");

        svg_el.appendChild(path1);
        svg_el.appendChild(path2);
        svg_el.appendChild(path3);
        btn_el.appendChild(svg_el);
        li_el.appendChild(link_el);
        li_el.appendChild(btn_el);
        document.getElementById(ul_el).appendChild(li_el);
    }

    let count = 0;

    function saveChat() {
        let compiler = initializeCompiler();
        let uml = compiler.getValue();
        let encode = encodeURIComponent(uml);
        let currentUrl = window.location.href.split("?")[0];
        let newUrl = `${currentUrl}?uml=${encode}`;

        let title = "Diagram " + count;
        newChat("ul-menu", title, newUrl);
        newChat("ul-menu-mobile", title, newUrl);
        storeChat(title, newUrl);
        
        count++;
    }

    document.getElementById("btn-new-chat").addEventListener("click", saveChat);
    document.getElementById("btn-new-chat-mobile").addEventListener("click", saveChat);

    function clearChats() {
        count = 0;
        localStorage.removeItem("chats");
        localStorage.removeItem("links");
        document.getElementById("ul-menu").innerHTML = "";
        document.getElementById("ul-menu-mobile").innerHTML = "";
    }
    document.getElementById("btn-clear-chats").addEventListener("click", clearChats);
    document.getElementById("btn-clear-chats-mobile").addEventListener("click", clearChats);
});
