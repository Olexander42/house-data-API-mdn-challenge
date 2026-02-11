/**
 * @example 
 * properify("proper_name") | properify("proper-name")  
 * // returns "Proper name"
 */
export function properify(str: string): string {
  const capitalize = (str: string) => str.replace(str[0], str[0].toUpperCase());

  return capitalize(str).replace("_", " ").replace("-", " ");
}

