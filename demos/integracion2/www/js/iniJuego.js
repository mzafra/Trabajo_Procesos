var serviceURL = "http://127.0.0.1:3000/";

var datosJuego;

$('#datosJuego').bind('pageinit', function(event) {
	getDatosJuego();
});

function getDatosJuego() {
	$.getJSON(serviceURL + 'datosJuego', function(data) {
		$('#datos li').remove();
		datosJuego = data;
		console.log(data);
		/*
		$.each(employees, function(index, employee) {
			$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee._id + '">' +
					'<img src="pics/' + employee.img + '"/>' +
					'<h4>' + employee.nombre + ' ' + employee.apellidos + '</h4>' +
					'<p>' + employee.clave + '</p>' + '<p>' + employee.email + '</p>' +
					'<span class="ui-li-count">' + employee.reportCount + '</span></a></li>');
		});
		$('#employeeList').listview('refresh');
		*/
	});
}