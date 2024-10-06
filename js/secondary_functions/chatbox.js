// Example sentences for the chatbox, including the table as HTML
const sentences = [
    "Hallo! Klik volgende voor de instructies",
    "Upload uw foto en druk op de knop.",
    "Kies een kleur.",
    `------------------------------------------------------------------
    | TOETS                | EFFECT                                    |
    ------------------------------------------------------------------
    | ↑                     | Object naar boven verplaatsen            |
    | ↓                     | Object naar beneden verplaatsen          |
    | ←                     | Object naar links verplaatsen            |
    | →                     | Object naar rechts verplaatsen           |
    | c                     | Object kopieren                          |
    | v                     | Object plakken                           |
    | s                     | Switch tussen objecten                   |
    | +                     | Object groter maken                      |
    | -                     | Object kleiner maken                     |
    | w                     | Object smaller maken                     |
    | W                     | Object breder maken                      |
    | p                     | Huidige beeld exporteren naar afbeelding |
    | Scrollwiel            | Camera in -en uitzoomen                  |
    | Muis klik en draaien  | Camera verplaatsen                       |
    | l                     | Lichtinval veranderen                    |
    | L                     | Alle lichten aanzetten                   |
    ------------------------------------------------------------------`,
    "Geniet van uw 3D ervaring!"
];

let currentSentenceIndex = 0;
const chatBox = document.getElementById('chatBox');
const nextArrow = document.getElementById('nextArrow');

// Function to update the chatbox content
function updateChat() {
    const currentSentence = sentences[currentSentenceIndex];
    
    // Check if the sentence contains the table, render it as HTML
    if (currentSentence.includes('|')) {
        const tableHTML = `
        <table>
            <tr><th>TOETS</th><th>EFFECT</th></tr>
            <tr><td>↑</td><td>Object naar boven verplaatsen</td></tr>
            <tr><td>↓</td><td>Object naar beneden verplaatsen</td></tr>
            <tr><td>←</td><td>Object naar links verplaatsen</td></tr>
            <tr><td>→</td><td>Object naar rechts verplaatsen</td></tr>
            <tr><td>c</td><td>Object kopieren</td></tr>
            <tr><td>v</td><td>Object plakken</td></tr>
            <tr><td>s</td><td>Switch tussen objecten</td></tr>
            <tr><td>+</td><td>Object groter maken</td></tr>
            <tr><td>-</td><td>Object kleiner maken</td></tr>
            <tr><td>w</td><td>Object smaller maken</td></tr>
            <tr><td>W</td><td>Object breder maken</td></tr>
            <tr><td>p</td><td>Huidige beeld exporteren naar afbeelding</td></tr>
            <tr><td>Scrollwiel</td><td>Camera in -en uitzoomen</td></tr>
            <tr><td>Muis klik en draaien</td><td>Camera verplaatsen</td></tr>
            <tr><td>l</td><td>Lichtinval veranderen</td></tr>
            <tr><td>L</td><td>Alle lichten aanzetten</td></tr>
        </table>`;
        chatBox.innerHTML = tableHTML;
    } else {
        chatBox.innerHTML = currentSentence;
    }

    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
}

// Add event listener to the button to show the next sentence
nextArrow.addEventListener('click', updateChat);

// Optionally, automatically cycle through sentences every 5 seconds
// setInterval(updateChat, 5000);

// Initial call to display the first sentence
updateChat();
