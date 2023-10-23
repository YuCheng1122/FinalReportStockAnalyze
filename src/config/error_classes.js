class AppError extends Error {
  constructor(originError, source, errorLocation, errorLevel) {
    super(originError, source, errorLocation, errorLevel)
    this.source = source
    this.errorLocation = errorLocation
    this.errorLevel = errorLevel
  }
}

module.exports = { AppError }
