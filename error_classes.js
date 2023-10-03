class SqlError extends Error {
  constructor(originError, status) {
    super(originError.message)
    ;(this.name = 'SqlError'), (this.stack = originError.stack), (this.status = status)
  }
}

class ControllerError extends Error {
  constructor(originError, status) {
    super(originError.message)
    ;(this.name = 'ControllerError'), (this.stack = originError.stack), (this.status = status)
  }
}

class RouteError extends Error {
  constructor(originError, status) {
    super(originError.message)
    ;(this.name = 'RouteError'), (this.stack = originError.stack), (this.status = status)
  }
}

module.exports = { RouteError, ControllerError, SqlError }
