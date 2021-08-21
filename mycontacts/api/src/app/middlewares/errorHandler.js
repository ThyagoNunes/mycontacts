module.exports = (error, request, response, next) => {
  console.log('errorHandler', error);
  response.status(5000);
};
