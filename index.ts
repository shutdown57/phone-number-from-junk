import fs from 'node:fs'
import readline from 'readline'

const pattern = /(\++\d+[\s|\-]?[(]?\d+[)]?([\s|\-]?\d+)+)/gi

try {
  const rs = fs.createReadStream('sample.txt')
  const ws = fs.createWriteStream('output.txt')
  const rl = readline.createInterface({ input: rs })

  const result = new Set<string>()
  rl.on('line', (line: string | null) => {
    if (typeof line === 'string' && line.length > 0) {
      const matches = line.match(pattern) || []
      for (const match of matches) {
        result.add(match.trim())
      }
    }
  })

  rl.on('close', () => {
    console.log(result)
    result.forEach((v: string) => {
      ws.write(`${v}\n`)
    })
  })
} catch (err) {
  console.error(err)
}
