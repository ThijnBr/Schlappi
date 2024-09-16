// Example sentences for the chat box
const sentences = [
    "Hello! Welcome to our app.",
    "Click the button to upload your image.",
    "Use the controls to zoom in and out.",
    "Enjoy your 3D experience!"
];

let currentSentenceIndex = 0;
const chatBox = document.getElementById('chatBox');
const nextArrow = document.getElementById('nextArrow');

// Function to update the chat box content
function updateChat() {
    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
    chatBox.innerHTML = sentences[currentSentenceIndex];
}

// Add event listener to the arrow to show the next sentence
nextArrow.addEventListener('click', updateChat);

// Optionally, automatically cycle through sentences every few seconds
// setInterval(updateChat, 5000);