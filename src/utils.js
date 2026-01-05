export function properify(str) {
  const capitalize = (str) => str.replace(str[0], str[0].toUpperCase());

  return capitalize(str).replace("_", " ");
}