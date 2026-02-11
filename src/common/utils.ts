/**
 * @example 
 * properify("proper_name") | properify("proper-name")  
 * // returns "Proper name"
 */
export const properify = (str: string): string => {
  if (!str[0]) return str;

  const capitalizedStr = str.replace(str[0], str[0].toUpperCase()) 
  const properStr = capitalizedStr.replace("_", " ").replace("-", " ");

  return properStr;
}




