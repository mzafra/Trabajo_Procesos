var Tablero = function (){
	var posCasillaQuesito=[1,8,15,22,29,36,43];
	var posRojos=[11,21,29,37,47];
	var posAmarillos=[5,18,28,36,44];
	var posAzules=[4,14,22,30,40];
	var posVerdes=[2,12,25,35,43];
	var posNaranjas=[7,15,23,33,46];
	var posGrises=[3,6,13,17,20,24,27,31,38,41,45,48];
	var posNegros=[10,34];
	var posRosas=[8,16,26,39,49];
	var posMarrones=[1,9,19,32,42];
	this.tablero = new Array(49);

	this.iniTablero = function (){
		var col = new Array(49);

		for(var i=0;i<50;i++)
			col[i]= (new casilla(i,"P"));
		for(var i in posCasillaQuesito)
			col[posCasillaQuesito[i]].tipo="Q";
		for(var i in posRojos)
			col[posRojos[i]].color="rojo";
		for(var i in posAmarillos)
			col[posAmarillos[i]].color="amarillo";
		for(var i in posAzules)
			col[posAzules[i]].color="azul";
		for(var i in posVerdes)
			col[posVerdes[i]].color="verde";
		for(var i in posNaranjas)
			col[posNaranjas[i]].color="naranja";
		for(var i in posGrises)
		{
			col[posGrises[i]].color="gris";
			col[posGrises[i]].tipo="T";
		}			
		for(var i in posNegros)
		{
			col[posNegros[i]].color="negro";
			col[posNegros[i]].tipo="D";
		}
			
		for(var i in posRosas)
			col[posRosas[i]].color="rosa";
		for(var i in posMarrones)
			col[posMarrones[i]].color="marron";
	
		return col;
	};
	this.tablero=this.iniTablero();
}


function casilla(numero,tipo){
	this.numero=numero;
	this.tipo=tipo; //Q,T,P,D
	this.color=undefined; //rojo,verde,naranja
}

module.exports = Tablero;