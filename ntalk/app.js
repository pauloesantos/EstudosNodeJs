var express = require('express')
  , app = express()
  , load = require('express-load')
  , error = require('./middleware/error')
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);



// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.cookieParser('ntalk'));
app.use(express.session());
app.use(express.bodyParser());

app.use(app.router);


app.use(express.static(__dirname + '/public'));

app.use(error.notFound);
app.use(error.serverError);

//app.use('/', routes.index);
//app.use('/usuarios', routes.users.index);

// ... stack de configurações do servidor..

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

io.socket.on('connection', function(client){
	client.on('send-server', function(data){
		var msg = "<b>"+data.nome+":</b>"+data.msg+"<b>";
		client.emit('send-client', msg);
		client.broadcast.emit('send-client', msg);
	});
});

server.listen(3000, function() {
    console.log("Ntalk no ar!");
});
