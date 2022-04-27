export default (error, request, response, next) => {
  console.log('errorHandler', error);
  response.status(500);
};
