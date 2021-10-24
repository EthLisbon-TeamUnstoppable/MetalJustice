
export const getFromLocalStorage = <T>(key: string):T | undefined => {
  let unwrappedValue = localStorage.getItem(key);
  return unwrappedValue ? JSON.parse(unwrappedValue) : undefined;
}

export const setToLocalStorage = <T>(key: string, value: T) => {
  let parsedValue = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(key, parsedValue);
}