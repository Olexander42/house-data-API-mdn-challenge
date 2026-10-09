import { properify } from "../common/utils.js";


export default function populateCardTemplate(
  objPropsKeys: readonly string[],
  mainProp = objPropsKeys[0]
): HTMLElement {
  if (!mainProp) {
    throw new Error("The list of property keys seems to be empty");
  }

  const template = document.getElementById("card-template") as HTMLTemplateElement;
  const articleTemplate = template.content.firstElementChild as HTMLElement;
  const articleEl = document.importNode(articleTemplate, true);
  const propsList = articleEl.querySelector('ul') as HTMLUListElement;

  const h2 = document.createElement('h2');
  h2.dataset['label'] = properify(mainProp);
  articleEl.insertBefore(h2, propsList);

  const objPropsKeysWithoutMainProp = [...objPropsKeys]
  objPropsKeysWithoutMainProp.splice(objPropsKeys.indexOf(mainProp), 1); // don't include 'mainProp' in propsList

  objPropsKeysWithoutMainProp.forEach((propKey) => {
    const listItem = document.createElement('li');
    const properName = properify(propKey);
    listItem.dataset['label'] = properName;
    propsList.append(listItem);
  })

  const templateExpandable = document.getElementById("expandable") as HTMLTemplateElement;

  articleEl.append(templateExpandable);

  return articleEl;
}




