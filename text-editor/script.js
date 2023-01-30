'use strict';

const menubutton = document.getElementById('menubutton');
const menu = document.getElementById('menu');
const curtain = document.getElementById('curtain');
const menuClose = document.getElementById('menu-close');
const filecontent = document.getElementById('filecontent');
const filename = document.getElementById('filename');
const savefile = document.getElementById('menu-save');
const openfile = document.getElementById('menu-open');

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

function downloadFile() {
	// create blob and uri from file content
	const blob = new Blob([filecontent.value, '\n'], {type: 'text/plain'});
	const blobUri = URL.createObjectURL(blob);

	// create fake download link, add it, click it, then remove it
	const dlLink = document.createElement('a');
	dlLink.download = filename.value;
	dlLink.href = blobUri;
	document.body.appendChild(dlLink);
	dlLink.click();
	document.body.removeChild(dlLink);

	// remember to free blob uri
	URL.revokeObjectURL(blobUri);
}

function uploadFile() {
	// screens uploaded file content and updates file name and content fields
	function handleFile(fileName, text) {
		filename.value = fileName;
		filecontent.value = text;
	}

	// create temporary file input element in DOM
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.style.display = 'none';

	// add listener to trigger file reading code
	fileInput.addEventListener('change', e => {
		const chosenFile = e.target.files[0];
		chosenFile.text().then(
			text => { handleFile(chosenFile.name, text); },
			() => { throw new Error('file access error') }
		);
	});
	
	document.body.appendChild(fileInput);
	fileInput.click();
	document.body.removeChild(fileInput);
}

menubutton.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
curtain.addEventListener('click', closeMenu);
savefile.addEventListener('click', () => { downloadFile(); closeMenu(); });
openfile.addEventListener('click', () => { uploadFile(); closeMenu(); });
