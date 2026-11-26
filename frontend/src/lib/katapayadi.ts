export const rows = ['कखगघङचछजझञ', 'टठडढणतथदधन', 'पफबभम', 'यरलवशषसह']
const vowels = 'अआइईउऊऋॠऌॡएऐओऔ'
const marks = 'ािीुूृॄॢॣेैोौंःँ'
export const digits = new Map(rows.flatMap(row => [...row].map((letter, index) => [letter, (index + 1) % 10] as const)))
export type Syllable = { glyph: string; digit: number | null }

export function readWord(text: string) {
  const syllables: Syllable[] = []
  const unsupported = new Set<string>()
  const chars = [...text.normalize('NFC')]
  for (let i = 0; i < chars.length; i++) {
    const first = chars[i]
    if (/[\s।॥,.;!?-]/u.test(first)) continue
    if (!digits.has(first) && !vowels.includes(first)) {
      unsupported.add(first)
      continue
    }
    let glyph = first
    let digit: number | null = digits.get(first) ?? 0
    if (digits.has(first)) {
      while (chars[i + 1] === '्') {
        glyph += chars[++i]
        if (chars[i + 1] === '\u200d' || chars[i + 1] === '\u200c') glyph += chars[++i]
        if (!digits.has(chars[i + 1])) { digit = null; break }
        glyph += chars[++i]
        digit = digits.get(chars[i])!
      }
    }
    while (chars[i + 1] && marks.includes(chars[i + 1])) glyph += chars[++i]
    syllables.push({ glyph, digit })
  }
  const written = syllables.flatMap(s => s.digit === null ? [] : [s.digit])
  return { syllables, written, value: unsupported.size ? '' : [...written].reverse().join(''), unsupported: [...unsupported] }
}

export function spellNumber(value: string) {
  if (!/^\d+$/.test(value)) return []
  return [...value].reverse().map(char => ({
    digit: Number(char),
    letters: [...digits].filter(([, digit]) => digit === Number(char)).map(([letter]) => letter),
  }))
}
