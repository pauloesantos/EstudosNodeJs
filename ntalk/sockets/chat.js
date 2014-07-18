module.exports = function(io) {
    var sockets = io.sockets;
    sockets.on('connection', function(client) {
        var session = client.handshake.session,
            usuario = session.usuario;
        client.on('send-server', function(msg) {
            var msg = "<b>" + usuario.nome + ":</b>" + msg + "<br>";
            client.emit('send-client', msg);
            client.broadcast.emit('send-client', msg);
        });
    });
}