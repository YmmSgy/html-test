// file name and content
const fname = document.getElementById("fname");
const fcont = document.getElementById("fcont");
// menu button
const menu = document.getElementById("menu");
// dropdown
const dropdown = document.getElementById("dropdown");
const save = document.getElementById("save");
/*
const open = document.getElementById("open");
const dark = document getElementById("dark");
const font = document.getElementById("font");
const hl = document.getElementById("hl");
const indent = document.getElementById("indent");
*/
// globals
let isDropdownOpen = false;

// define functions
function getvar(name) {
    return getComputedStyle(
      document.documentElement)
        .getPropertyValue(name);
}

function setvar(name, value) {
    document.documentElement.style
      .setProperty(name, value);
}

function openDropdown() {
    fname.setAttribute("disabled", "");
    fcont.setAttribute("disabled", "");
    menu.style.backgroundColor = getvar("--dd-clr");
    dropdown.style.height = "100%";
    dropdown.style.overflowY = "hidden";
    isDropdownOpen = true;
}

function closeDropdown() {
    fname.removeAttribute("disabled");
    fcont.removeAttribute("disabled");
    menu.style.backgroundColor = "transparent";
    dropdown.style.height = "0";
    dropdown.style.overflowY = "hidden";
    isDropdownOpen = false;
}

function download() {
    // create fake anchor
    const dl = document.createElement("a");
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
}

// bind event handlers
menu.onclick = () => {
    if (isDropdownOpen) { closeDropdown(); }
    else { openDropdown(); }
};
dropdown.ontransitionend = () => dropdown.style.overflowY = "auto";
save.onclick = download;
