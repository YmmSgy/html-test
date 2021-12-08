"use strict";

const menubutton = document.getElementById("menubutton");
const menu = document.getElementById("menu");

let isMenuOpen = false;

function openMenu() {
	isMenuOpen = true;

	menu.style.display = "block";

	menubutton.style.position = "relative";
	menubutton.style.backgroundColor = "gainsboro";
	menubutton.style.boxShadow = "0 0 0.5rem grey";
}

function closeMenu() {
	isMenuOpen = false;

	menu.style.display = "none";

	menubutton.style = null;
}

menubutton.addEventListener("click", () => {
	if (isMenuOpen) { closeMenu(); }
	else { openMenu(); }
});
menubutton.addEventListener("blur", closeMenu);

function setvar(property, value) {
	document.documentElement.style.setProperty(property, value);
}
