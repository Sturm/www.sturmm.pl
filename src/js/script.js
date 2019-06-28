window.setInterval(() => {
    let element = document.getElementById("dots");
    if (element.innerHTML.length > 2) {
        element.innerHTML = "";
    } else {
        element.innerHTML += ".";
    }
}, 400);