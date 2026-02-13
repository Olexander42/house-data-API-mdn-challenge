export function isSameLength(
  obj1: readonly unknown[] | Record<PropertyKey, unknown>,
  obj2: readonly unknown[] | Record<PropertyKey, unknown>
): boolean {
  return Object.keys(obj1).length === Object.keys(obj2).length;
}

export function isArrsMatch(
  arr1: readonly unknown[],
  arr2: readonly unknown[]
): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  } 

  return arr1.every((val, i) => val === arr2[i]);
}

export function isNodesSame(expDOM: HTMLElement, actDOM: HTMLElement): boolean {
  const expectedNodes = [...expDOM.querySelectorAll('*')]
  const actualNodes = [...actDOM.querySelectorAll('*')];

  if (!isSameLength(expectedNodes, actualNodes)) {
    return false; 
  }
  
  return expectedNodes.every((expNode, i) => {
    expNode.innerHTML = toNormalizedHTML(expNode.innerHTML);
    actualNodes[i].innerHTML = toNormalizedHTML(actualNodes[i].innerHTML);
  
    return expNode.isEqualNode(actualNodes[i]);
  })
}

/** Removes whitespace between nodes */
export function toNormalizedHTML(html: string): string {
  return html.replace(/\s*(<|>)\s*/g, '$1').trim(); 
}






