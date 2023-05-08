'use strict';

const menubutton = document.getElementById('menubutton');
const menu = document.getElementById('menu');
const curtain = document.getElementById('curtain');
const menuClose = document.getElementById('menu-close');
const filecontent = document.getElementById('filecontent');
const filename = document.getElementById('filename');
const savefile = document.getElementById('menu-save');
const openfile = document.getElementById('menu-open');
const changetheme = document.getElementById('menu-dark');
const symbar = document.getElementById('symbar');
const lineNo = document.getElementById('lineno');
const dispText = document.getElementById('textdisp');
const textWrapper = document.getElementById('textwrapper');

const symbarBindings = {
	symbar_tab:		'\t',
	symbar_bksl:	'\\',
	symbar_btick:	'`',
	symbar_tilde:	'~',
	symbar_lt:		'<',
	symbar_gt:		'>',
	symbar_lcurly:	'{',
	symbar_rcurly:	'}',
	symbar_lsqr:	'[',
	symbar_rsqr:	']'
}

let isMenuOpen = false;

function printCodePoints(str16) {
	let output = '';
	for (const codePoint of str16) {
		// get string representation of code point in hex
		let codePtStr = codePoint.codePointAt(0).toString(16).toUpperCase();

		// pad with leading zeros
		for (let j = 0; codePtStr.length < 6; j++) {
			codePtStr = '0' + codePtStr;
		}

		// concat to existing output
		output += `${codePtStr} `;
	}
	console.log(output);
}

function spliceString(str, start, rmCount, insStr) {
	// similar to Array.splice(): starting at index start, removes rmCount
	// characters (UTF-16 code units), and inserts insStr at start
	// returns the new string without modifying str
	if (typeof str !== 'string') return str;
	if (rmCount !== 0) rmCount ||= Infinity;
	return str.slice(0, start) + (insStr || '') + str.slice(start + rmCount);
}

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
		// remove any terminating newline
		if (text.endsWith('\r\n')) { text = text.slice(0, -2); }
		else if (text.endsWith('\n')) { text = text.slice(0, -1); }

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

function toggleTheme() {
	// toggle the dark theme class and update localstorage accordingly
	const isDarkTheme = document.documentElement.classList.toggle('dark-theme');
	localStorage.setItem('theme-selected', isDarkTheme ? 'dark' : 'light');
}

function detectTheme() {
	const htmlClass = document.documentElement.classList;

	// use previously selected theme if possible
	// otherwise check browser's preference with media query
	const selectedTheme = localStorage.getItem('theme-selected');
	if (selectedTheme === 'dark') {
		htmlClass.toggle('dark-theme', true);
	}
	else if (selectedTheme === 'light') {
		htmlClass.toggle('dark-theme', false);
	}
	else if (matchMedia('(prefers-color-scheme: dark)').matches) {
		htmlClass.toggle('dark-theme', true);
	}
	else {
		htmlClass.toggle('dark-theme', false);
	}
}

function insertSymbol(e) {
	let symId = e.target.id;
	
	// ensure that we are handling the click of a valid button
	if (!symId.startsWith('symbar-')) return;

	// replace dashes with underscores (no dashes in property names)
	symId = symId.replaceAll('-', '_');

	// lookup symbar bindings with key symId for value to insert
	const ch = symbarBindings[symId];

	// don't insert if lookup fails (ch is undefined)
	if (ch === undefined) return;	// TODO: handle error

	// insert ch and return focus to file content
	filecontent.setRangeText(ch, filecontent.selectionStart, filecontent.selectionEnd, 'end');
	filecontent.focus();
}

function adaptVirtualKbd() {
	// opt in to virtual keyboard management, if API is available
	if ('virtualKeyboard' in navigator)
		navigator.virtualKeyboard.overlaysContent = true;
}

function updateDisplayText(e) {
	dispText.innerText = e.target.value + '\u200B';
}

function updateLineNos(e) {
	let str = '1';
	let nlCounter = 1;
	for (const ch of e.target.value) {
		if (ch === '\n') str += `\n${++nlCounter}`;
	}
	lineNo.innerText = str;
}

function resizeTextarea(entries) {
	filecontent.style.width = `${entries[0].borderBoxSize[0].inlineSize}px`;
	filecontent.style.height = `${entries[0].borderBoxSize[0].blockSize}px`;
}

menubutton.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
curtain.addEventListener('click', closeMenu);
savefile.addEventListener('click', () => { downloadFile(); closeMenu(); });
openfile.addEventListener('click', () => { uploadFile(); closeMenu(); });
changetheme.addEventListener('click', () => { toggleTheme(); closeMenu(); });
symbar.addEventListener('click', insertSymbol);
filecontent.addEventListener('input', (e) => { updateDisplayText(e); updateLineNos(e); });
textWrapper.addEventListener('click', () => { filecontent.focus(); });
(new ResizeObserver(resizeTextarea)).observe(dispText);

adaptVirtualKbd();
detectTheme();
