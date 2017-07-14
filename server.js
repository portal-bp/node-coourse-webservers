const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var logMsg = `Now is ${now}: ${req.method} ${req.path}`;
  console.log(logMsg);
  fs.appendFile('server.log', logMsg + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log .');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintanance.hbs')
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcome: 'Welcome !'
  });
});

app.get('/about', (req, res) => {
   res.render('about.hbs',{
     pageTitle: 'About page'
   });
  })

app.listen(3000, () => {
  console.log('Server is up on  port 3000...')
});
