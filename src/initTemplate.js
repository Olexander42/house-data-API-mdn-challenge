import { properify } from "./utils.js";


export default function populateCardTemplate(objPropsKeys, mainProp = objPropsKeys[0]) {
  const article = document.importNode(
    document.querySelector("#output template")
      .content.firstElementChild,
    true
  )
  
  const propsList = article.querySelector('ul');

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




