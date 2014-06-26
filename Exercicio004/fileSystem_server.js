var fs = require('fs');

fs.readFile('/index.html', function(erro, arquivo){
	if (erro) throw erro;
	console.log(arquivo);
});
var arquivo = fs.readFileSync('/index.html');
console.log(arquivo);