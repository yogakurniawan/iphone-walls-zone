export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceSpaceWithDash(str) {
  return str.replace(/\s+/g, '-');
}

export function replaceDashWithSpace(str) {
  return str.replace(/-/g, ' ');
}

export function isNumber(input) {
  return /^\d+$/.test(input)
}
