import { StatusCodes } from '@constants/status-codes'

const { INTERNAL_SERVER, BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } =
  StatusCodes

abstract class BaseError extends Error {
  // This statusCode/message will be defined in specific error type
  abstract statusCode: StatusCodes
  isOperational = true

  constructor(description: string) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this)
  }
}

export class Api400Error extends BaseError {
  statusCode: StatusCodes = BAD_REQUEST
  constructor(description: string) {
    super(description)
  }
}

export class Api401Error extends BaseError {
  statusCode: StatusCodes = UNAUTHORIZED
  constructor(description: string) {
    super(description)
  }
}

export class Api403Error extends BaseError {
  statusCode: StatusCodes = FORBIDDEN
  constructor(description: string) {
    super(description)
  }
}

export class Api404Error extends BaseError {
  statusCode: StatusCodes = NOT_FOUND
  constructor(description: string) {
    super(description)
  }
}

export class Api500Error extends BaseError {
  statusCode: StatusCodes = INTERNAL_SERVER
  constructor(description: string) {
    super(description)
  }
}
