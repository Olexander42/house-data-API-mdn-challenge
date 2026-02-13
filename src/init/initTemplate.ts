import { properify } from "../common/utils.js";


export default function populateCardTemplate(
  objPropsKeys: readonly string[],
  mainProp = objPropsKeys[0]
): HTMLElement {
  if (!mainProp) {
    throw new Error("The list of property keys seems to be empty");
  }

  const templateSelector = "#output template"
  const template = document.querySelector(templateSelector) as HTMLTemplateElement;
  if (!template) {
    throw new Error(`${templateSelector} failed to query anything`);
  }

  const articleTemplate =  template.content.firstElementChild as HTMLElement;
  if (!articleTemplate) {
    throw new Error("The template has no children of type 'Element'")
  }

  const article = document.importNode(articleTemplate, true);
  const propsList = article.querySelector('ul');
  if (!propsList) {
    throw new Error("'ul' query yielded no result.")
  }

  const h2 = document.createElement('h2');

  h2.dataset['label'] = properify(mainProp);
  article.insertBefore(h2, propsList);

  const objPropsKeysWithoutMainProp = [...objPropsKeys]
  objPropsKeysWithoutMainProp.splice(objPropsKeys.indexOf(mainProp), 1); // don't include 'mainProp' in propsList

  objPropsKeysWithoutMainProp.forEach((propKey) => {
    const listItem = document.createElement('li');
    const properName = properify(propKey);
    listItem.dataset['label'] = properName;
      
    propsList.append(listItem);
  })

  return article;
}




