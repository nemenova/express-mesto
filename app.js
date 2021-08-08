const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use((req, res, next) => {
  req.user = {
    _id: '610f768d99541551a754ac82' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use('/users', userRoute)
// app.use('/cards', require('./routes/cards'));
app.use('/cards', cardRoute);

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})