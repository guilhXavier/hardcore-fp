const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  toString: () => `Right(${x})`,
})

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  toString: () => `Left(${x})`,
})

const fromNullable = x => (x != null ? Right(x) : Left())

const tryCatch = f => {
  try {
    return Right(f())
  } catch (error) {
    return Left(error)
  }
}

const findColor = name =>
  fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name])

const res = findColor('red')
  .map(x => x.toUpperCase())
  .map(x => x.slice(1))
  .fold(
    () => 'no color!',
    color => color
  )

console.log(res)

const fs = require('fs')
const path = require('path')

const readFileSync = pathStr =>
  tryCatch(() => fs.readFileSync(path.resolve(__dirname, 'config.json')))

const getPort = () => {
  try {
    const str = fs.readFileSync('config.json')
    const config = JSON.parse(str)
    return config.port
  } catch (e) {
    return 3000
  }
}

const getPortR = () => {
  return readFileSync('./config.json')
    .map(content => JSON.parse(content))
    .map(config => config.port)
    .fold(
      () => 8080,
      x => x
    )
}

const result = getPortR()

console.log(result)
