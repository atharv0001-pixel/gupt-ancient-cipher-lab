import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { letterStats, methods, repeatedGroups, substitutionAlphabet, transform } from '../src/lib/ciphers.ts'
import { readWord, spellNumber } from '../src/lib/katapayadi.ts'

test('Caesar reference example and alphabet wrap', () => {
  assert.equal(transform('HELLO', 'caesar', 'encode', 3), 'KHOOR')
  assert.equal(transform('KHOOR', 'caesar', 'decode', 3), 'HELLO')
  assert.equal(transform('Zz-अ', 'caesar', 'encode', 1), 'Aa-अ')
})
for (const method of methods) {
  test(method.name + ' round-trips mixed text and incomplete rows', () => {
    for (const text of ['', 'अ', 'A', 'Mixed case: कवि 🪷', 'Meet at 9!']) {
      const encoded = transform(text, method.id, 'encode', 7, 'LETTER', 4)
      assert.equal(transform(encoded, method.id, 'decode', 7, 'LETTER', 4), text)
    }
  })
}
test('reference alphabets and ragged transposition', () => {
  assert.match(substitutionAlphabet('keyword', 0, 'Letter'), /^LETRABCDF/)
  assert.equal(transform('ABC', 'atbash', 'encode'), 'ZYX')
  assert.equal(transform('HELLO', 'paired', 'encode'), 'URYYB')
  assert.equal(transform('ABCDEFG', 'columns', 'encode', 0, '', 3), 'ADGBECF')
})
test('letter evidence excludes punctuation and handles short messages', () => {
  assert.equal(letterStats('A a B!').total, 3)
  assert.equal(letterStats('A a B!').coincidence, 1/3)
  assert.equal(letterStats('क').coincidence, null)
  assert.deepEqual(repeatedGroups('THE THE',3), [['THE',2]])
})
test('Kaṭapayādi reference example, clusters, zeroes and mute consonants', () => {
  assert.deepEqual(readWord('कवि').written, [1,4])
  assert.equal(readWord('कवि').value, '41')
  assert.equal(readWord('कर्म').value, '51')
  assert.equal(readWord('अग्नि').value, '00')
  assert.equal(readWord('राम्').value, '2')
  assert.equal(readWord('क्‍र').value, '2')
  assert.equal(readWord('कं, हः।').value, '81')
  assert.equal(readWord('क्').value, '')
  assert.equal(readWord('कa').value, '')
  assert.deepEqual(readWord('कa').unsupported, ['a'])
})
test('every generated candidate sequence round-trips, including leading zeros', () => {
  for (const value of ['41', '0089', '1234567890']) {
    const choices = spellNumber(value)
    assert.equal(readWord(choices.map(c => c.letters[0]).join('')).value, value)
    assert.equal(readWord(choices.map(c => c.letters.at(-1)).join('')).value, value)
  }
  assert.deepEqual(spellNumber('4.1'), [])
})
