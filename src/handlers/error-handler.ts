// const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken')
// const ErrorMessage = require('../constants/errorMessages.constant')

// const errorHandler = async (res, error) => {
//   // Operational errors
//   if (error.isOperational) {
//     return res.status(error.statusCode).json({ message: error.message })
//   }
//   // Exceptional errors
//   switch (true) {
//     case error instanceof TokenExpiredError: {
//       return res
//         .status(401)
//         .json({ message: ErrorMessage.USER.ERROR_EXPIRED_TOKEN })
//     }
//     case error instanceof JsonWebTokenError: {
//       return res
//         .status(401)
//         .json({ message: ErrorMessage.USER.ERROR_INVALID_TOKEN })
//     }
//   }
//   // Unknown errors
//   return res
//     .status(400)
//     .json({ message: ErrorMessage.GLOBAL.ERROR_UNKNOWN, internalError: true })
// }

// module.exports = { errorHandler }
