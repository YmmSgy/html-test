// file name and content
const fname = document.getElementById("fname");
const fcont = document.getElementById("fcont");
// menu button
const menu = document.getElementById("menu");
// dropdown
const dropdown = document.getElementById("dropdown");
const save = document.getElementById("save");
const dark = document.getElementById("dark");
/*
const open = document.getElementById("open");
const font = document.getElementById("font");
const hl = document.getElementById("hl");
const indent = document.getElementById("indent");
*/
// globals
let isDropdownOpen = false;
let isDark = false; swaptheme("light");


// define functions

// get and set css variables
function getvar(name) {
    return getComputedStyle(
      document.documentElement)
        .getPropertyValue(name);
}

function setvar(name, value) {
    document.documentElement.style
      .setProperty(name, value);
}

// dropdown
function opendropdown(canOpen) {
    dropdown.style.overflowY = "hidden";
    if (canOpen) {
        fname.setAttribute("disabled", "");
        fcont.setAttribute("disabled", "");
        menu.style.setProperty("background-color", "var(--dd-clr)");
        dropdown.style.height = "100%";
    }
    else {
        fname.removeAttribute("disabled");
        fcont.removeAttribute("disabled");
        menu.style.setProperty("background-color", "transparent");
        dropdown.style.height = "0";
    }
}

// download
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

// theme
function swaptheme(theme) {
    if (theme === "light") {
        // background colour
        setvar("--bkg-clr", "white");
        // text colour
        setvar("--txt-clr", "black");
        // disabled text colour
        setvar("--dis-clr", "dimgray");
        // highlight colour
        setvar("--hl-clr", "silver");
        // header colour
        setvar("--hdr-clr", "#d2d2d2");
        // dropdown colour
        setvar("--dd-clr", "#e9e9e9");
    }
    else {
        // background colour
        setvar("--bkg-clr", "#272b33");
        // text colour
        setvar("--txt-clr", "white");
        // disabled text colour
        setvar("--dis-clr", "#7488ad");
        // highlight colour
        setvar("--hl-clr", "#48546b");
        // header colour
        setvar("--hdr-clr", "#3a455a");
        // dropdown colour
        setvar("--dd-clr", "#323947");
    }
}


// bind event handlers

// menu button
menu.onclick = () => {
    if (isDropdownOpen) { opendropdown(false); }
    else { opendropdown(true); }
    isDropdownOpen = !isDropdownOpen;
};
dropdown.ontransitionend = () => dropdown.style.overflowY = "auto";

// save button
save.onclick = () => {
    download();

    opendropdown(false);
    isDropdownOpen = false;
};

// theme button
dark.onclick = () => {
    if (isDark) { swaptheme("light"); }
    else { swaptheme("dark"); }
    isDark = !isDark;

    opendropdown(false);
    isDropdownOpen = false;
};