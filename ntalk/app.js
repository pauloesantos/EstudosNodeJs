var express = require('express')
    , routes = require('./routes');

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use('/', routes.index);
app.use('/usuarios', routes.users.index);

app.listen(3000, function(){
    console.log("Ntalk no ar!");
});
