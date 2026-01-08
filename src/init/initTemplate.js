import { properify } from "../common/utils.js";


/**
 * @param {string[]} objPropsKeys - Unique property keys
 * @param {string} [mainProp] - The main property of the card (defaults to first key)
 * @returns {HTMLElement} Card template
 */
export default function populateCardTemplate(objPropsKeys, mainProp = objPropsKeys[0]) {
  const template = /** @type {HTMLTemplateElement} */ (document.querySelector("#output template"));
  const article = /** @type {HTMLElement} */ (document.importNode(
    template.content.firstElementChild,
    true
  ))
  
  const propsList = /** @type {HTMLUListElement} */ (article.querySelector('ul'));

  const h2 = document.createElement('h2');
  h2.dataset.label = properify(mainProp);
  article.insertBefore(h2, propsList);

  objPropsKeys.splice(objPropsKeys.indexOf(mainProp), 1); // don't include in propsList

  objPropsKeys.forEach((propKey) => {
    const listItem = document.createElement('li');
    const properName = properify(propKey);
    listItem.dataset.label = properName;
      
    propsList.append(listItem);
  })
  
  return article;
}




