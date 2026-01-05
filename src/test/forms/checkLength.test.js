import { checkLength } from './checkLength'
import { describe, it, expect } from 'vitest'

describe('checkLength', () => {
  it('check the longest string', () => {
    const badCall = () => checkLength('sldkfsdf')
    expect(badCall).toThrow()
  })
})
