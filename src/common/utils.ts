//type NonEmptyString<T> = T extends "" ? never : T;

/** Capitalize the first letter and replace "_" and "-" with " ". */
export const properify = (str: string): string => {  
  const properStr = str.replace(/[-_]/g, " ").trim();
  if (!properStr[0]) return properStr;

  const capitalizedProperStr = properStr.replace(properStr[0], properStr[0].toUpperCase());
  
  return capitalizedProperStr;
}

