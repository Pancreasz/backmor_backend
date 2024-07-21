const express = require('express')
const next = require('next')
const session = require('express-session');
const passport = require('passport')
const bodyParser = require('body-parser');
const router = require('./routes/routes.js')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
  
    // Set up session middleware
    server.use(session({
      secret: 'cpre888',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false } // Set secure to true in production
    }));
  
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(express.json());
    server.use(bodyParser.urlencoded({ extended: true}));

    server.use('/', router);

    server.get('*', (req, res) => {
        return handle(req, res);
      });

    server.post('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  });