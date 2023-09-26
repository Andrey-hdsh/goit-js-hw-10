import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
axios.defaults.headers.common["x-api-key"] = "live_dJqdJhapOM38cbdSrHhG0T8Aji3B40CW07zIjZt2A0bNDSwyzotLOkrchgCT6trF";


const selectors = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
};

selectors.loader.classList.add('hidden')

fetchBreeds()
  .then((arrayBreed) => {
      selectors.select.insertAdjacentHTML('beforebegin' , `<p class="breed-select-text">Please, select a cat.</p>`)
        arrayBreed.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            selectors.select.appendChild(option)
        });
    })
    .catch(error => {
        throw new Error("Oops! Something went wrong! Try reloading the page!");
    })

    selectors.select.addEventListener('change', breedSelection);

function breedSelection(event) {
  const breedIdElements = selectors.select.value;
  selectors.loader.classList.replace('hidden', 'visible');
  selectors.catInfo.classList.add('hidden');
  
    
    fetchCatByBreed(breedIdElements)
      .then(newBreed => {

        if (newBreed.length !== 0) {
        newBreed.map((arrayBreed) => {
          const { name, description, temperament } = arrayBreed.breeds[0]; 
          selectors.catInfo.classList.remove('hidden');
          selectors.loader.classList.replace('visible', 'hidden');

         selectors.catInfo.innerHTML = `
          <div class="cat-card">
          <img src="${arrayBreed.url}" class="image-cat" alt="${name}" width="600">
          <div class="cat-description"><h1 class="">${name}</h1>
          <p class=""><span>Description:</span>${description}</p>
          <p class=""><span>Temperament:</span>${temperament}</p></div>
        </div>` 
        })  
        } else {
          selectors.catInfo.innerHTML = '';
          selectors.loader.classList.replace('visible', 'hidden');
        selectors.error.classList.replace('hidden', 'visible');
        selectors.error.textContent = 'At the moment there is no information about this breed, please choose another one.';
      }})
      
      .catch(error => {
      console.error(error);
      selectors.catInfo.innerHTML = '';
      selectors.loader.classList.replace('visible', 'hidden');
      selectors.error.classList.replace('hidden', 'visible');
      selectors.error.textContent = 'Oops! Something went wrong! Try reloading the page!';
    });
  selectors.error.textContent = '';

}