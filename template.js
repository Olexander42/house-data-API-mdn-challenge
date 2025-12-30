import { capitalize } from "./utils.js";

const emojisDict = {
  street: "🏘",
  bedrooms: "🛏",
  bathrooms: "🛁",
  kitchen: "🍽",
  garage: "🚗",
  schools: "🏫",
  bus_stations: "🚌",
}

let template, h2, propsList;

export function initHouseCardTemplate(housePropsKeys) {
  initTemplateEls();
  
  const mainProp = "price";
  housePropsKeys.splice(housePropsKeys.indexOf(mainProp), 1); // don't include "price" in the list

  housePropsKeys.forEach((propKey) => {
    const listItem = document.createElement('li');
    const properName = capitalize(propKey).replace("_", " ");
    listItem.classList.add(propKey);
    listItem.dataset.label = `${emojisDict[propKey] || ""} ${properName}:`; // TODO: remove space if no emoji
        
    propsList.append(listItem);
  })

  return template;
}

export function getUniquePropsKeys(data) {
  const housePropsKeys = new Set();

  data.forEach((obj) => Object.keys(obj).forEach((key) => housePropsKeys.add(key)));

  return [...housePropsKeys];
}

function initTemplateEls() {
  const templateEl = document.querySelector("#output template");

  template = document.importNode(templateEl.content, true);
  h2 = template.querySelector('h2');
  propsList = template.querySelector('ul');
} 


