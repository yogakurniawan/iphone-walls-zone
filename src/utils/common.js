export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceSpaceWithDash(str) {
  return str.replace(/\s+/g, '-');
}

export function replaceDashWithSpace(str) {
  return str.replace(/-/g, ' ');
}

export const loadItem = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    throw new Error(err);
  }
};

export const saveItem = (key, item) => {
  try {
    const serializedState = JSON.stringify(item);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    throw new Error(err);
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    throw new Error(err);
  }
};
