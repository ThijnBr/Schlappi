import { changeTexture } from "./materialAndColorHandler.js";

// Functie om knoppen te maken voor elk materiaal en kleurvariatie dropdown toe te voegen
export function createMaterialButtons(kleurArray) {
    let materialButtonsContainer = document.getElementById('materialButtonsContainer');
    materialButtonsContainer.innerHTML = ''; // Wis alle bestaande knoppen

    // Maak materiaal knop.
    createMaterialButton(1, materialButtonsContainer, false);

    // Maak doekvariaties aan in een dropdown
    // doekIndex, array met andere doeken variaties, container van het document, type textuur
    createMaterialDropdown(2, [2, 3, 4, 5], materialButtonsContainer, 'texture');

    // Maak kleurvariaties aan in een dropdown
    // doekIndex, array met kleuren, de container van het document, type kleur dropdown
    createMaterialDropdown(6, kleurArray, materialButtonsContainer, 'color');
}

// Algemene functie om een materiaal knop te maken
function createMaterialButton(index, container) {
    const materialContainer = document.createElement('div');
    materialContainer.classList.add('materialContainer');

    const button = document.createElement('button');
    button.classList.add('materialButton');

    const img = document.createElement('img');
    img.src = `obj/doek${index}.jpg`; // Gebruik index voor de basis textuur afbeelding
    button.appendChild(img);
    materialContainer.appendChild(button);

    // Eventlistener voor textuurverandering
    button.addEventListener('click', () => {
        changeTexture(index);
    });

    container.appendChild(materialContainer);
}

// Algemene functie om dropdowns te maken voor variaties of kleuren. 
function createMaterialDropdown(doekIndex, options, container, type) {
    const materialContainer = document.createElement('div');
    materialContainer.classList.add('materialContainer');

    const button = document.createElement('button');
    button.classList.add('materialButton');

    // Maak een afbeeldings element voor de knop (gebruik makend van doekIndex)
    const img = document.createElement('img');
    img.src = `obj/doek${doekIndex}.jpg`; // Basis textuur afbeelding
    button.appendChild(img);
    materialContainer.appendChild(button);

    // Maak een dropdown container
    const dropdown = document.createElement('div');
    dropdown.classList.add('materialDropdown');
    dropdown.style.display = 'none'; // In eerste instantie verborgen

    // Toon dropdown bij hover
    materialContainer.onmouseenter = () => {
        dropdown.style.display = 'block';
    };
    materialContainer.onmouseleave = () => {
        dropdown.style.display = 'none';
    };

    // Loop door opties en voeg ze toe als items in de dropdown
    options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('materialBox');

        // Maak een preview afbeelding op basis van het type
        const previewImage = createPreviewImage(
            `obj/doek${type === 'texture' ? option : doekIndex}.jpg`, 
            type === 'color' ? option : null
        );
        
        optionDiv.appendChild(previewImage);

        // Eventlistener om textuur of kleur te veranderen bij klikken
        optionDiv.addEventListener('click', () => {
            if (type === 'texture') {
                changeTexture(option); // Pas de geselecteerde textuurvariatie toe
            } else {
                changeTexture(doekIndex, option); // Behoud de textuur en pas kleur toe
            }
        });

        dropdown.appendChild(optionDiv);
    });

    // Voeg de dropdown toe aan de materiaalcontainer
    materialContainer.appendChild(dropdown);
    container.appendChild(materialContainer);
}

// Functie om een preview afbeelding te maken. Dit zet de kleur over het materiaal heen in preview.
function createPreviewImage(texturePath, color) {
    const canvas = document.createElement('canvas');
    canvas.width = 200; 
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = texturePath;

    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Als er een kleur is opgegeven, zet deze bovenop de texture
        if (color) {
            ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
            ctx.globalCompositeOperation = 'multiply'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };

    return canvas;
}
