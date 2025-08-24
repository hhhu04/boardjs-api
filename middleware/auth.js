const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    const error = errorResponse('Access token is required', 401);
    return res.status(401).json(error);
  }

  try {
    const decoded = verifyToken(token);
    req.user = {
      idx: decoded.idx,
      userId: decoded.user_id,
    };
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    
    let statusCode = 403;
    let message = error.message;
    let object = error.code;

    console.log(
      'error.code',
      error.code,
      'error.name',
      error.name,
      'error.message',
      error.message)

    if (error.code === -1001) {
      statusCode = 401;
      message = 'Token expired';
    }
    
    const errorRes = errorResponse(message, statusCode);
    errorRes.object = object;
    return res.status(statusCode).json(errorRes);
  }
};

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyToken(token);
    req.user = {
      idx: decoded.idx,
      userId: decoded.user_id,
    };
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    
    let statusCode = 403;
    let message = error.message;
    let object = error.code;

    if (error.code === -1001) {
      statusCode = 401;
      message = 'Token expired';
    }
    
    const errorRes = errorResponse(message, statusCode);
    errorRes.object = object;
    return res.status(statusCode).json(errorRes);
  }
};

module.exports = {
  authenticateToken,
  optionalAuth
};