const handleControllerError = (error, res, defaultMessage) => {
  console.error('Game Controller Error:', error.message);
  
  if (error.response) {
    res.status(error.response.status).json({
      error: 'API request failed',
      message: error.response.data || error.message
    });
  } else {
    res.status(500).json({
      error: 'Internal server error',
      message: defaultMessage
    });
  }
};

module.exports = { handleControllerError };