type ClassList = string | string[]
type ClassListObject = Record<string, boolean>

/**
 * Generate a string of class names given any number of `string`s, `Array`s of `string`s, or
 * `Objects` with `string` keys and `boolean` values. Removes extra whitespace and duplicates from
 * input arguments.
 *
 * @param args Class names in any form.
 * @returns A string of classnames.
 */
export function classify (...args: Array<ClassList | ClassListObject>): string {
  const tmp: Set<string> = new Set()

  for (const arg of args) {
    if (Array.isArray(arg)) {
      arg.flat(Infinity)
        .forEach(val => tmp.add(val.trim()))
    } else if (typeof arg === 'string') {
      arg.trim()
        .split(/\s+/)
        .forEach(val => tmp.add(val.trim()))
    } else if (typeof arg === 'object' && arg !== null) {
      Object.entries(arg)
        .filter(([_, val]) => val)
        .forEach(([key, _]) => tmp.add(key.trim()))
    }
  }

  tmp.delete('')
  return [...tmp].join(' ')
}
