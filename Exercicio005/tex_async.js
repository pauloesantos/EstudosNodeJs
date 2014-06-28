var fs = require('fs');

for (var i = 1; i <= 5; i++) {
	var file = "sync-txt" + i + ".txt";
	fs.writeFile(file, "Hello Node.js!", function(err, out) {
		console.log(out);
	});
}