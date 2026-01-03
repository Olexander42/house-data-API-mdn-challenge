import { capitalize } from "./utils.js";

let template, propsList;

export default function initCardTemplate(objPropsKeys, mainProp) {
  initTemplateEls();
  
  const h2 = document.createElement('h2');
  h2.dataset.label = properify(mainProp);
  document.querySelector('article').append(h2);
  objPropsKeys.splice(objPropsKeys.indexOf(mainProp), 1); // don't include in <ul>

  objPropsKeys.forEach((propKey) => {
    const listItem = document.createElement('li');
    const properName = properify(propKey);

    listItem.classList.add(properName);
    listItem.dataset.label = properName;
        
    propsList.append(listItem);
  })

  return template;
}

function initTemplateEls() {
  const templateEl = document.querySelector("#output template");

  template = document.importNode(templateEl.content, true);
  propsList = template.querySelector('ul');
} 

function properify(str) {
  const capitalize = str.replace(str[0], str[0].toUpperCase());
  
  return capitalize(str).replace("_", " ");
}


export { properify }; // for testing



