const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const expiredError = new Error('Token expired');
      expiredError.code = -1001;
      throw expiredError;
    }
    if (error.name === 'JsonWebTokenError') {
      const invalidError = new Error('Invalid token');
      invalidError.code = -1002;
      throw invalidError;
    }
    if (error.name === 'NotBeforeError') {
      const notActiveError = new Error('Token not active');
      notActiveError.code = -1003;
      throw notActiveError;
    }
    const unknownError = new Error('Token verification failed');
    unknownError.code = -1000;
    throw unknownError;
  }
};

module.exports = {

  verifyToken
};