var User = require('../app/models/user');
var Partida = require('../app/models/partida');
var Jugador = require('../app/models/jugador');
var Tablero = require('../app/models/tablero');
var Auth = require('./middlewares/authorization.js');
var fs = require('fs');

var jug1 = new Jugador();
jug1.nombre="";

var jug2 = new Jugador();
jug2.nombre="";

var tablero=new Tablero();
var partida = new Partida();
partida.jug1=jug1;
partida.jug2=jug2;
partida.tablero=tablero;
partida.nombre="una";

console.log("nombre partida="+partida.nombre);
console.log("jug1="+partida.jug1.nombre);
console.log("jug2="+partida.jug2.nombre);

module.exports = function(app, passport){
	app.get("/", function(req, res){ 
		if(req.isAuthenticated()){
		  res.render("home", { user : req.user}); 
		}else{
			res.render("home", { user : null});
		}
	});

	app.get("/login", function(req, res){ 
		res.render("login");
	});

	app.post("/login" 
		,passport.authenticate('local',{
			successRedirect : "/ini",
			failureRedirect : "/login",
		})
	);

	app.get("/signup", function (req, res) {
		res.render("signup");
	});

	app.post("/signup", Auth.userExist, function (req, res, next) {
		User.signup(req.body.email, req.body.password, function(err, user){
			if(err) throw err;
			req.login(user, function(err){
				if(err) return next(err);
				return res.redirect("profile");
			});
		});
	});

	app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));

	app.get("/auth/facebook/callback", 
		passport.authenticate("facebook",{ failureRedirect: '/login'}),
		function(req,res){
			res.redirect("/ini");
			//res.render("profile", {user : req.user});
		}
	);

	app.get("/auth/twitter", passport.authenticate("twitter",{ scope : "email"}));

	app.get("/auth/twitter/callback", 
		passport.authenticate("twitter",{ failureRedirect: '/login'}),
		function(req,res){
			//res.render("tablero",{user : req.user});
			//res.render("profile", {user : req.user});
			res.redirect("/ini");
		}
	);

	app.get("/ini",Auth.isAuthenticated,function(request,response){
		console.log(request.user);
		var res=asignarPartida(request.user);
		if (res)
			console.log("Asignación correcta:"+jug1.nombre);
		var contenido=fs.readFileSync("./index-juego.html");
		response.setHeader("Content-type","text/html");
		response.send(contenido);
	});

	//función auxiliar: asignar usuarios a juegos
	function asignarPartida(user){
		if (jug1.nombre=="")
		{
			jug1.nombre=user.nombre;
			user.partida=partida;
			return true;
		}
		else
			if (jug2.nombre=="")
			{
				jug2.nombre=user.nombre;
				user.partida=partida;				
				return true;
			}
			else
				return false;
	}

	//obtener datos del juego
	app.get('/datosJuego', Auth.isAuthenticated, function( request, response ) {
		var jsonData={
			"partida":partida
		};
		return response.send(jsonData);
		/*
	    return User.find( function( err, users ) {
	        if( !err ) {
	            //console.log(empleados);
	            return response.send( users );
	        } else {
	            return console.log( err );
	        }
	    });
	    */
	});

	//obtener lista de empleados
	app.get( '/empleados', Auth.isAuthenticated, function( request, response ) {
	    return User.find( function( err, users ) {
	        if( !err ) {
	            //console.log(empleados);
	            return response.send( users );
	        } else {
	            return console.log( err );
	        }
	    });
	});

	//Insert a new empleado
	app.post("/empleados", Auth.userExist, function (req, res, next) {
	    
	    User.signup(req.body.email, req.body.clave, function(err, user){
			if(err) throw err;
			//request.login(user, function(err){
			//	if(err) return next(err);
			return res.send(user);
			//});
		});
		
	});


	//Obtener un usuario por id
	app.get( '/empleados/:id', function( request, response ) {
	    return User.findById( request.params.id, function( err, user ) {
	        if( !err ) {
	            return response.send( user );
	        } else {
	            return console.log( err );
	        }
	    });
	});

	//Actualizar un usuario
	app.put( '/empleados/:id', function( request, response ) {
	    console.log( 'Actualizar usuario ' + request.body.nombre );
	    return User.findById( request.params.id, function( err, user ) {
	        user.nombre = request.body.nombre;
	        user.apellidos = request.body.apellidos;
	        user.email = request.body.email;
	        user.titulo = request.body.titulo;
	        user.img = request.body.img;
	        user.reportCount = request.body.reportCount;

	        return user.save( function( err ) {
	            if( !err ) {
	                console.log( 'usuario actualizado' );
	            } else {
	                console.log( err );
	            }
	            return response.send( user );
	        });
	    });
	});

	app.get('/partida', Auth.isAuthenticated, function( request, response ) {

		response.render("tablero",{partida:partida});

	});



	app.get("/admin", Auth.isAuthenticated,function(request,response){
	    var contenido=fs.readFileSync("./index-backbone.html");
	    response.setHeader("Content-type","text/html");
	    response.send(contenido);
	});

	app.get("/profile", Auth.isAuthenticated , function(req, res){ 
		res.render("profile", { user : req.user});
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	});
}
