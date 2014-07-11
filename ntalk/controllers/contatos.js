module.exports = function(app) {
  var Usuario = app.models.usuario;
	var ContatoController = {
		index: function(req, res) {
			var usuario = req.session.usuario
				, params = {usuario: usuario};
			res.render('contatos/index', params);
		}
	}
	return ContatoController;
};