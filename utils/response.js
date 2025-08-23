const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    message: message,
    data: data
  };
};

const errorResponse = (message = 'Error', statusCode = 500) => {
  return {
    success: false,
    message: message,
    statusCode: statusCode
  };
};

module.exports = {
  successResponse,
  errorResponse
};