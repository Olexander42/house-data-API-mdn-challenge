export const isSameLength = (obj1, obj2) => Object.keys(obj1).length === Object.keys(obj2).length;
export const isArrsMatch = (arr1, arr2) => arr1.every((val, i) => val === arr2[i]);

export const isNodesSame = (expDOM, actDOM) => {
  const expectedNodes = [...expDOM.querySelectorAll('*')]
  const actualNodes = [...actDOM.querySelectorAll('*')];

  if (!isSameLength(expectedNodes, actualNodes)) return false; 
  
  return expectedNodes.every((expNode, i) => {
    expNode.innerHTML = toNormalizedHTML(expNode.innerHTML);
    actualNodes[i].innerHTML = toNormalizedHTML(actualNodes[i].innerHTML);
  
    return expNode.isEqualNode(actualNodes[i]);
  })
}

function toNormalizedHTML(html) {
  return html.replace(/\s*(<|>)\s*/g, '$1').trim(); // remove whitespace between nodes
}

