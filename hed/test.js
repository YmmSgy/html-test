const menubutton = document.getElementById("menubutton");
const menu = document.getElementById("menu");

let isMenuOpen = false;
menubutton.addEventListener("click", () => {
	if (isMenuOpen) { menu.style.display = "none"; }
	else { menu.style.display = "block"; }
	isMenuOpen = !isMenuOpen;
});
