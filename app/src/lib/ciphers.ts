export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export type Method = 'caesar' | 'atbash' | 'paired' | 'keyword' | 'columns'
export type Direction = 'encode' | 'decode'

export const methods: { id: Method; name: string; summary: string }[] = [
  { id: 'caesar', name: 'Caesar shift', summary: 'Rotate the alphabet by a fixed distance.' },
  { id: 'paired', name: 'Reciprocal pairs', summary: 'Exchange each letter with its partner.' },
  { id: 'atbash', name: 'Atbash mirror', summary: 'Read the alphabet in reverse.' },
  { id: 'keyword', name: 'Keyword alphabet', summary: 'Build a substitution alphabet from a word.' },
  { id: 'columns', name: 'Column transposition', summary: 'Write across rows and read down columns.' },
]

export function substitutionAlphabet(method: Method, shift: number, keyword: string) {
  if (method === 'keyword') {
    const key = keyword.replace(/[^a-z]/gi, '').toUpperCase()
    return [...new Set(key + alphabet)].join('')
  }
  if (method === 'atbash') return [...alphabet].reverse().join('')
  const offset = method === 'paired' ? 13 : ((shift % 26) + 26) % 26
  return alphabet.slice(offset) + alphabet.slice(0, offset)
}

function transpose(text: string, width: number, direction: Direction) {
  const letters = [...text]
  const result: string[] = []
  let index = 0
  for (let column = 0; column < width; column++) {
    for (let position = column; position < letters.length; position += width) {
      if (direction === 'encode') result.push(letters[position])
      else result[position] = letters[index++]
    }
  }
  return result.join('')
}

export function transform(text: string, method: Method, direction: Direction, shift = 3, keyword = 'LOTUS', columns = 4) {
  if (method === 'columns') return transpose(text, Math.max(1, Math.trunc(columns)), direction)
  const key = substitutionAlphabet(method, shift, keyword)
  const [from, to] = direction === 'encode' ? [alphabet, key] : [key, alphabet]
  return text.replace(/[A-Za-z]/g, c => {
    const mapped = to[from.indexOf(c.toUpperCase())]
    return c === c.toLowerCase() ? mapped.toLowerCase() : mapped
  })
}

export function letterStats(text: string) {
  const counts = Array<number>(26).fill(0)
  const letters = text.replace(/[^a-z]/gi, '').toUpperCase()
  for (const char of letters) counts[char.charCodeAt(0) - 65]++
  const frequencies = counts.map((count, i) => ({ letter: alphabet[i], count }))
  const pairs = counts.reduce((sum, count) => sum + count * (count - 1), 0)
  const coincidence = letters.length < 2 ? null : pairs / (letters.length * (letters.length - 1))
  return { frequencies, total: letters.length, coincidence }
}

export function repeatedGroups(text: string, size: number) {
  const counts = new Map<string, number>()
  // Count only runs of adjacent letters within a word.
  for (const word of text.match(/[A-Za-z]+/g) ?? []) {
    const upper = word.toUpperCase()
    for (let i = 0; i <= upper.length - size; i++) {
      const group = upper.slice(i, i + size)
      counts.set(group, (counts.get(group) ?? 0) + 1)
    }
  }
  return [...counts].filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 6)
}
