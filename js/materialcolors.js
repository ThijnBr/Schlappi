import { changeColor } from "./app.js";

export function addColorContainer(kleurArray) {
    const colorContainer = document.getElementById('colorContainer');


    // Add colors to their containers. Put colors in pair of two containers.
    for (let i = 0; i < kleurArray.length; i += 2) {
        const colorRow = document.createElement('div');
        colorRow.classList.add('colorRow');

        // First color in the pair
        let colorDiv1 = document.createElement('div');
        colorDiv1.classList.add('colorBox');
        colorDiv1.style.backgroundColor = `#${kleurArray[i].toString(16).padStart(6, '0')}`;
        colorDiv1.addEventListener('click', () => handleColorChange(kleurArray[i]));
        colorRow.appendChild(colorDiv1);

        // Second color in the pair (check if it exists)
        if (kleurArray[i + 1]) {
            let colorDiv2 = document.createElement('div');
            colorDiv2.classList.add('colorBox');
            colorDiv2.style.backgroundColor = `#${kleurArray[i + 1].toString(16).padStart(6, '0')}`;
            colorDiv2.addEventListener('click', () => handleColorChange(kleurArray[i + 1]));
            colorRow.appendChild(colorDiv2);
        }

        // Append the row of two colors to the container
        colorContainer.appendChild(colorRow);
    }
}

function handleColorChange(selectedColor) {
    changeColor([
        { name: 'Doek_Boven', color: selectedColor },
        { name: 'Doek_Onder', color: selectedColor }
    ]);
}
