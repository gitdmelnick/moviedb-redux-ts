export const debounce = (callback: Function, delay = 350) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

export const dateFromString = (timestamp: string) => {
  const releaseDate = new Date(timestamp);

  return releaseDate;
};

export const getItemFromLocalStorage = (key: string) => {
    const localItem = localStorage.getItem(key);
    return localItem ? JSON.parse(localItem) : null;
}

export const setItemToLocalStorage = (key:string, value: any ) => {
  localStorage.setItem(key, JSON.stringify({...value}));
}
