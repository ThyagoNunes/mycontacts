const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log(error);
  response.status(5000);
});

app.listen(3000, () => console.log('🔥 Server Started at locolhost:3000'));
