import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'

describe('Site smoke tests', () => {
  it('has required source pages', () => {
    expect(existsSync('src/pages/index.astro')).toBe(true)
  })

  it('netlify.toml has redirects', () => {
    const toml = readFileSync('netlify.toml', 'utf-8')
    expect(toml).toContain('[[redirects]]')
  })

  it('package.json has required scripts', async () => {
    const pkg = await import('../package.json')
    expect(pkg.default.scripts.build).toBeTruthy()
    expect(pkg.default.scripts.dev).toBeTruthy()
    expect(pkg.default.scripts.test).toBeTruthy()
  })
})
