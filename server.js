// npm install express express-session sequelize mysql2 bcrypt dotenv express-handlebars //
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./routes');

// npm install connect-session-sequelize //
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3000;

const sess = { // setting the session with Sequelize //
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

app.use(session(sess));


app.engine('handlebars', exphbs({ defaultLayout: 'main' })); // setting up handlebars as the template engine //
app.set('view engine', 'handlebars');

app.use(express.json()); // setting up express to use json //
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // setting up express to use the public folder //

app.use(routes); // setting up express to use the routes folder //

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
  });

  