import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'

describe('Site smoke tests', () => {
  it('has required source pages', () => {
    expect(existsSync('src/pages/index.astro')).toBe(true)
  })

  it('has Cloudflare Pages chat function', () => {
    const chat = readFileSync('functions/chat.js', 'utf-8')
    expect(chat).toContain('OPENROUTER_API_KEY')
    expect(chat).toContain('onRequest')
  })

  it('package.json has required scripts', async () => {
    const pkg = await import('../package.json')
    expect(pkg.default.scripts.build).toBeTruthy()
    expect(pkg.default.scripts.dev).toBeTruthy()
    expect(pkg.default.scripts.test).toBeTruthy()
  })
})
