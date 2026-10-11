//type NonEmptyString<T> = T extends "" ? never : T;

/** Capitalize the first letter and replace "_" and "-" with " ". */
export const properify = (str: string): string => {  
  while (str.includes("_") || str.includes("-")) {
    str = str.replace("_", " ").replace("-", " ");    
  }

  const properStr = str.trim()
  if (!properStr[0]) return properStr;

  const capitalizedProperStr = properStr.replace(properStr[0], properStr[0].toUpperCase());
  
  return capitalizedProperStr;
}

