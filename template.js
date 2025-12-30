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

export function initHouseCardTemplate(propsKeys) {
  initTemplateEls();
  
  const mainProp = "price";
  propsKeys.splice(propsKeys.indexOf(mainProp), 1); // don't include "price" in the list

  propsKeys.forEach((propKey) => {
    const listItem = document.createElement('li');
    const properName = capitalize(propKey).replace("_", " ");
    listItem.dataset.label = `${emojisDict[propKey] || ""} ${properName}:`; // TODO: remove space if no emoji
        
    propsList.append(listItem);
  })

  return template;
}

export function getUniquePropsKeys(data) {
  const propsKeys = new Set();

  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      propsKeys.add(key);
    })
  })

  return [...propsKeys];
}

function initTemplateEls() {
  const templateEl = document.querySelector("#output template");

  template = document.importNode(templateEl.content, true);
  h2 = template.querySelector('h2');
  propsList = template.querySelector('ul');
} 


