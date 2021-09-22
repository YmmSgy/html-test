let fname = document.getElementById("fname");
let fcont = document.getElementById("fcont");
let save = document.getElementById("save");

save.onclick = function() {
    // create fake anchor
    let dl = document.createElement("a");
    // dynamically set attributes of
    // fake anchor
    dl.setAttribute("href",
      "data:text/plain;charset=utf-8," +
      encodeURIComponent(fcont.value) +
      "%0A");
    dl.setAttribute("download", fname.value);
    // append fake anchor to document
    document.body.appendChild(dl);
    // simulate click to start download
    dl.click();
    // remove fake anchor
    document.body.removeChild(dl);
};
