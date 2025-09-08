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