'use strict';

const menubutton = document.getElementById('menubutton');
const menu = document.getElementById('menu');
const curtain = document.getElementById('curtain');
const menuClose = document.getElementById('menu-close');

let isMenuOpen = false;

function openMenu() {
	isMenuOpen = true;

	curtain.classList.remove('closed-curtain');
	menu.classList.remove('closed-menu');
	curtain.classList.add('opened-curtain');
	menu.classList.add('opened-menu')
}

function closeMenu() {
	isMenuOpen = false;

	curtain.classList.add('closed-curtain');
	menu.classList.add('closed-menu');
	curtain.classList.remove('opened-curtain');
	menu.classList.remove('opened-menu');
}

menubutton.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
curtain.addEventListener('click', closeMenu);
