import axios from "axios";
export { fetchBreeds, fetchCatByBreed };
    
axios.defaults.headers.common["x-api-key"] = "live_dJqdJhapOM38cbdSrHhG0T8Aji3B40CW07zIjZt2A0bNDSwyzotLOkrchgCT6trF";
const BASE_GET_REQUEST = 'https://api.thecatapi.com/v1/breeds';

function fetchBreeds() {
    
    return axios.get(BASE_GET_REQUEST)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            throw new Error("Oops! Something went wrong! Try reloading the page!");
        })
    };


function fetchCatByBreed(breedId) {
    const breedUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

    return axios.get(breedUrl)
        .then(response => {
            return response.data;
        })
    .catch(error => {
        throw new Error("Oops! Something went wrong! Try reloading the page!");
    })
};

