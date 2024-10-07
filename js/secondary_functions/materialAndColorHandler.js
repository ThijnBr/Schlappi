import * as THREE from 'three';
import { objModel } from "../app.js";
import { doekTeller, setDoekTeller, notRepeatTexture } from '../app.js';
// Function to change texture of an object
export function changeTexture(doekIndex, color) {
    const textureLoader = new THREE.TextureLoader();
    let materialTextures = null;
    setDoekTeller(doekIndex);
    if(doekTeller == 1){
        materialTextures = 
            [
                { name: 'Doek_Boven', texturePath: 'obj/doek' + doekTeller + '.jpg' },
                { name: 'Doek_Onder', texturePath: 'obj/doek' + doekTeller + 'b.jpg' }
            ];
    }
    else{
            materialTextures = 
            [
                { name: 'Doek_Boven', texturePath: 'obj/doek' + doekTeller + '.jpg' },
                { name: 'Doek_Onder', texturePath: 'obj/doek' + doekTeller + '.jpg' }
            ];
    }

    materialTextures.forEach(materialTexture => {
        textureLoader.load(materialTexture.texturePath, newTexture => {
            objModel.traverse(child => {
                if (child.isMesh) {
                    let materials = Array.isArray(child.material) ? child.material : [child.material];
                    materials.forEach(material => {
                        if (material.name === materialTexture.name) {
                            if (color == null){
                                material.color.set(0xffffff); 
                            }
                            else{
                                material.color.set(color);
                            }
                            material.map = newTexture;
                            
                            //Set the texture to repeat, if not, scale the texture with object size.   
                            let texture = material.map;      
                            if(!notRepeatTexture.includes(doekTeller)){
                                texture.wrapS = THREE.RepeatWrapping;
                                texture.wrapT = THREE.RepeatWrapping;
                                texture.repeat.set( objModel.scale.x, objModel.scale.y );
                            }
                            else{
                                texture.wrapS = THREE.ClampToEdgeWrapping;
                                texture.wrapT = THREE.ClampToEdgeWrapping;
                            }          
                            material.needsUpdate = true;
                        }
                    });
                }
            });
        });
    });
}