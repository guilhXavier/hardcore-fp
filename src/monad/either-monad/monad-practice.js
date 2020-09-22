// Definitions
// ====================
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

const fromNullable = x => (x != null ? Right(x) : Left(null))

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}

const logIt = x => {
  console.log(x)
  return x
}

const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i

// Exercise: Either
// Goal: Refactor each example using Either
// Bonus: no curlies
// =========================

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const street = user =>
  fromNullable(user.address)
    .chain(addres => fromNullable(addres.street))
    .map(addr => addr.street)
    .fold(
      () => 'no street',
      street => street
    )

// Ex2: Refactor streetName to use Either instead of nested if's
// =========================
const streetName = user =>
  fromNullable(user)
    .chain(user => fromNullable(user.address))
    .chain(addr => fromNullable(addr.street))
    .map(street => street.name)
    .fold(
      () => 'no street',
      name => name
    )

console.log(streetName({ address: { street: { name: 'js' } } }))

// Ex3: Refactor parseDbUrl to return an Either instead of try/catch
// =========================
const parseDbUrl = cfg =>
  tryCatch(() => JSON.parse(cfg))
    .map(cfg => cfg.url.match(DB_REGEX))
    .fold(
      () => null,
      match => match
    )

// Ex4: Using Either and the functions above, refactor startApp
// =========================
const startApp = cfg =>
  fromNullable(parseDbUrl(cfg)).fold(
    () => `can't get config`,
    ([_, user, password, db]) => `starting ${db}, ${user}, ${password}`
  )
