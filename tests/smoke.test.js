import { describe, it, expect } from 'vitest'

describe('Site smoke tests', () => {
  it('build output has index.html', async () => {
    const fs = await import('fs')
    const indexExists = fs.existsSync('dist/index.html')
    expect(indexExists).toBe(true)
  })

  it('netlify.toml has redirects', async () => {
    const fs = await import('fs')
    const toml = fs.readFileSync('netlify.toml', 'utf-8')
    expect(toml).toContain('[[redirects]]')
  })

  it('package.json has required scripts', async () => {
    const pkg = await import('../package.json')
    expect(pkg.default.scripts.build).toBeTruthy()
    expect(pkg.default.scripts.dev).toBeTruthy()
  })
})
