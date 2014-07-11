var express = require('express')
  , app = express()
  , load = require('express-load')



// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.cookieParser('ntalk'));
app.use(express.session());
app.use(express.bodyParser());


app.use(express.static(__dirname + '/public'));

//app.use('/', routes.index);
//app.use('/usuarios', routes.users.index);

// ... stack de configurações do servidor..

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

app.listen(3000, function(){
    console.log("Ntalk no ar!");
});
