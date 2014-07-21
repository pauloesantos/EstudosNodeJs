var app = require('../app'),
    should = require('should'),
    request = require('supertest')(app);

describe('No controller home', function() {
    it('deve retornar status 200 ao fazer GET /', function(done) {
        request.get('/')
            .end(function(err, res) {
                res.status.should.eql(200);
                done();
            });
    });
});