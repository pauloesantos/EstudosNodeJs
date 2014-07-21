var express = require('express'),
    app = express(),
    load = require('express-load'),
    server = require('http').createServer(app),
    error = require('./middleware/error'),
    io = require('socket.io').listen(server),
    mongoose = require('mongoose');

global.db = mongoose.connect('mongodb://localhost/ntalk');



// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.cookieParser('ntalk'));
app.use(express.session());
app.use(express.bodyParser());

app.use(app.router);

const KEY = 'ntalk.sid',
SECRET = 'ntalk';
var cookie = express.cookieParser(SECRET),
    store = new express.session.MemoryStore(),
    sessOpts = {
        secret: SECRET,
        key: KEY,
        store: store
    },
    session = express.session(sessOpts);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(session);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(__dirname + '/public'));

app.use(error.notFound);
app.use(error.serverError);

// ... stack de configurações do servidor..

io.set('authorization', function(data, accept) {
    cookie(data, {}, function(err) {
        var sessionID = data.signedCookie[KEY];
        store.get(sessionID, function(err, session) {
            if (err || !session) {
                accept(null, false);
            } else {
                data.session = session;
                accept(null, true);
            }
        });
    });
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

load('sockets')
    .into(io);

server.listen(3000, function() {
    console.log("Ntalk no ar!");
});