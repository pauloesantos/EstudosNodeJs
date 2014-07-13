module.exports = function(app) {
	var contatos = app.controllers.contatos;
	app.get('/contatos', contatos.index);
	app.get('/contatos/:id', contatos.show);
	app.post('/contatos', contatos.create);
	app.get('/contatos/:id/editar', contatos.edit);
	app.put('/contatos/:id', contatos.update);
	app.del('/contatos/:id', contatos.destroy);
};