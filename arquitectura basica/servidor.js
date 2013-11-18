//instalar express en este ejemplo si no lo teníamos
var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");

//incluimos la parte de MongoDB
var mongo=require("mongodb");
var dbHost="127.0.0.1";
var dbPort=mongo.Connection.DEFAULT_PORT;

var app=exp(); 

app.use(app.router);
app.use(exp.static(__dirname + "/public"));

app.get("/",function(request,response){
        var contenido=fs.readFileSync("./cliente.html");
        response.setHeader("Content-type","text/html");
        response.send(contenido);
});

app.get("/partidas",function(request,response){
	response.send("Aun no hombre.... ");
});
app.get("/autentificar",function(request,response){
	 var contenido=fs.readFileSync("./autentificar.html");
	 response.setHeader("Content-type","text/html");
	response.send(contenido);
});
//funcion para tirar el dado
app.get('/partida',function(request,response){
	var contenido=fs.readFileSync("./Partida.html");
	 response.setHeader("Content-type","text/html");
	response.send(contenido);
});

/*app.get('/partida/tuturno',function(request,response){
	//cargar pagina con dado
});
app.get('/partida/suturno',function(request,response){
	//cargar pagina sin dado
});*/
app.get('/tirar',function(request,response){
	/*tirar el dado*/
});
app.get('/casilla/:id', function(request,response){
	/*moverte a una casilla*/
});

app.listen(port,host);
