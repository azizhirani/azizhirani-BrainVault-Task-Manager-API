const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
  }
  
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status);
  res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : '🥞',
      isError: true
  });
};

export { errorHandler };
