const fs = require('fs/promises')
const path = require('path')

;(async function () {
  const start = performance.now()

  const world = (await fs.readFile(path.join(__dirname, 'input.txt'), 'utf-8'))
    .split('\n')
    .map((line) => line.trim().split(''))

  const [x, y] = world
    .map((row, j) => {
      const i = row.indexOf('^')

      if (i !== -1) {
        return [i, j]
      }

      return null
    })
    .find((pos) => pos !== null)

  const copy = [...world.map((row) => row.slice())]

  const stack = [[x, y, 0, -1]]
  const visited = new Set()

  while (stack.length > 0) {
    const [x, y, dx, dy] = stack.pop()

    const nx = x + dx
    const ny = y + dy

    if (nx < 0 || nx >= world[0].length || ny < 0 || ny >= world.length) {
      continue
    }

    if (world[ny][nx] === '#') {
      stack.push([x, y, -dy, dx])
      continue
    }

    const ps = [nx, ny].toString()

    if (!visited.has(ps)) {
      visited.add(ps)
    }

    copy[ny][nx] = 'x'

    stack.push([nx, ny, dx, dy])
    //copy[y][x] = 'S'
    //copy.map((row) => console.log(row.join()))

    //await new Promise((res) => setTimeout(res, 1000 / 60))
  }

  copy.map((row) => console.log(row.join('')))

  console.log(visited.size + 1, performance.now() - start)
})()
