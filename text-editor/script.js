"use strict";

const menubutton = document.getElementById("menubutton");
const menu = document.getElementById("menu");
const curtain = document.getElementById("curtain");
const menuClose = document.getElementById("menu-close");

let isMenuOpen = false;

function openMenu() {
	isMenuOpen = true;

	curtain.style.zIndex = 1;
	curtain.style.backgroundColor = "rgb(0 0 0 / .6)";
	menu.style.left = "0";
	curtain.classList.toggle('curtain-fade-in');
	curtain.classList.toggle('curtain-fade-out');
}

function closeMenu() {
	isMenuOpen = false;

	curtain.style.zIndex = -1;
	curtain.style.backgroundColor = "transparent";
	menu.style.left = "-40%";
	curtain.classList.toggle('curtain-fade-in');
	curtain.classList.toggle('curtain-fade-out');
}

menubutton.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);
curtain.addEventListener("click", closeMenu);

function setvar(property, value) {
	document.documentElement.style.setProperty(property, value);
}
