var mongoose = require('mongoose');
var hash = require('../util/hash');


PartidaSchema = mongoose.Schema({
	jug1:  String,
	jug2:  String,
});


var Partida = mongoose.model("Partida", PartidaSchema);
module.exports = Partida;
