const EXPRESS = require('express');
const MORGAN = require('morgan');
const CORS = require('cors');
const path = require('path');

const port = 3000;

const app = EXPRESS();

// middlewares
app.use(MORGAN('dev'));
app.use(CORS());
app.use(EXPRESS.json());
app.use(EXPRESS.static(__dirname+'/public'));

// routes
app.use('/api/plant', require('./routes/plant'));
app.use('/api/family', require('./routes/family'));

// start
app.listen(port, () => {
  console.log("El servidor está escuchando en el puerto " + port)
});