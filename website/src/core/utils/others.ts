export function cssStringToObject(cssString: string): Record<string, string> {
  if (!cssString) return {}
  return cssString
    .split(";")
    .filter(Boolean)
    .map(rule => rule.split(":"))
    .reduce<Record<string, string>>((obj, [key, value]) => {
      if (key && value) obj[key.trim()] = value.trim()
      return obj
    }, {})
}

export function isNumber(number: unknown) {
    return typeof number === "number"
}

export function removeFrom<T>(array: T[], item: T): T[] {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
};

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}