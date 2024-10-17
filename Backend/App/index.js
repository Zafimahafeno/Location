const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routes = require('./router/route'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const router = express.Router();

const packRoutes = require('./router/route');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(express.static('App/photo'));

app.use('/', routes);

app.use('/api', packRoutes); 

module.exports = router;

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
