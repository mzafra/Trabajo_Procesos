var User = require('../app/models/user');
var Partida = require('../app/models/partida');
var Auth = require('./middlewares/authorization.js');
var fs = require('fs');
var partida = new Partida;
var jug1,jug2;

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
			successRedirect : "/",
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
		var contenido=fs.readFileSync("./index.html");
		response.setHeader("Content-type","text/html");
		response.send(contenido);
	});

	//Get a list of all books
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
