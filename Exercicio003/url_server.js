var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});

	var result = url.parse(request.url);

	response.write("<h2> href: "+result.href+"</h2>");
	response.write("<h1>Dados da querystring</h1>");
		for(var key in result.query) {
		response.write("<h2>"+key+" : "+result.query[key]+"</h2>");
	}
	response.write("<h2> hash: "+result.hash+"</h2>");
	response.end();
});

server.listen(3000, function(){
	console.log('Servidor http.');
});