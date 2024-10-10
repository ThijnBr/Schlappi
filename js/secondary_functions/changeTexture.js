import * as THREE from 'three';
import { objModel } from "../app.js";

// Function to change texture of an object
export function changeTexture(materialName, texturePath) {
    // Load the new texture
    const newTexture = new THREE.TextureLoader().load(texturePath, (texture) => {
        // Ensure the texture wraps and repeats
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;  // Enable repeating
        texture.repeat.set(0.1, 0.1);

        // Calculate average color
        const averageColor = getAverageColor(texture);
        
        // Apply the texture to the material and set the PVC color
        objModel.traverse((child) => {
            if (child.isMesh && child.material.name === materialName) {
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
            if (child.isMesh && child.material.name === "pvc" && materialName == "Doek") {
                child.material.color.set(averageColor);  // Set PVC color to average color
            }
        });
    });
}

// Function to calculate the average color from the texture
function getAverageColor(texture) {
    // Create a canvas to extract pixel data
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    // Set canvas size to the texture size
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;

    // Draw the texture onto the canvas
    context.drawImage(texture.image, 0, 0);
    
    // Get pixel data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r = 0, g = 0, b = 0;
    const pixelCount = data.length / 4;

    // Calculate the sum of the RGB values
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];     // Red
        g += data[i + 1]; // Green
        b += data[i + 2]; // Blue
    }

    // Calculate the average
    r = Math.floor(r / pixelCount);
    g = Math.floor(g / pixelCount);
    b = Math.floor(b / pixelCount);

    // Return the average color as a THREE.Color
    return new THREE.Color(`rgb(${r},${g},${b})`);
}
