import fetchData from "./fetch.js";
import { initForm, getSelectedOptions } from "./filters.js";
import renderHouses from "./render.js";


const form = document.querySelector("form");

let housesData;
const url = 'https://mdn.github.io/shared-assets/misc/houses.json';

await fetchData(url)
  .then((response) => housesData = response)
  .catch((error) => console.error(error));

initForm(housesData);

form.addEventListener("submit", (event) => {
  renderHouses(event, getSelectedOptions(), housesData)
}); 

