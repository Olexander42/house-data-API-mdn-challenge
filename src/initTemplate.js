export default function initCardTemplate(objPropsKeys, mainProp = objPropsKeys[0]) {
  const template = document.importNode(
    document.querySelector("#output template").content,
    true
  )
  
  const propsList = template.querySelector('ul');

  const h2 = document.createElement('h2');
  h2.dataset.label = properify(mainProp);
  template.querySelector('article').insertBefore(h2, propsList);

  objPropsKeys.splice(objPropsKeys.indexOf(mainProp), 1); // don't include in propsList

  objPropsKeys.forEach((propKey) => {
    const listItem = document.createElement('li');
    const properName = properify(propKey);
    listItem.dataset.label = properName;
      
    propsList.append(listItem);
  })
  
  return template;
}


function properify(str) {
  const capitalize = (str) => str.replace(str[0], str[0].toUpperCase());

  return capitalize(str).replace("_", " ");
}


export { properify }; // for testing



