type NonEmptyString<T> = T extends "" ? never : T;

/** Capitalize the first letter and replace "_" and "-" with " ". */
export const properify = <T extends string>(str: NonEmptyString<T>): string => {
  const trimmedStr = str.trim();
  if (!trimmedStr[0]) {
    console.log("Empty string was passed as a parameter");
    
    return trimmedStr; // handle empty string
  }

  const capitalizedStr = trimmedStr.replace(trimmedStr[0], trimmedStr[0].toUpperCase()) 
  const properStr = capitalizedStr.replace("_", " ").replace("-", " ");

  return properStr;
}

