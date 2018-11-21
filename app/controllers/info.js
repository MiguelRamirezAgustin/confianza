// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var datosService = args.response;
Ti.API.info('aqui esta con argumentos_______________________:' + JSON.stringify(datosService));

var nuevoObjeto = datosService;

console.log('contenido---------: ' + nuevoObjeto.documentType);
var documento = Ti.UI.createLabel({
	text : 'Documento: ' + nuevoObjeto.documentType,
	width : Ti.UI.FILL,
	left : 10,
	color : 'white',
	font : {
		fontSize : 19,
		fontWeight : 'bold'
	}
});
$.scroll.add(documento);

for (var i = 0; i < nuevoObjeto.data.length; i++) {

	Ti.API.info('NUEVO OBJETO ' + nuevoObjeto.data[i]);

	var viewInformacion = Ti.UI.createView({
		layout : 'vertical',
		width : Ti.UI.FILL,
		height : '100dp',
			borderColor : 'white',
		top : 1,
	});
	$.scroll.add(viewInformacion);

	var label = Ti.UI.createLabel({
		color : 'white',
		height : Ti.UI.SIZE,
		top : 25,
		text : nuevoObjeto.data[i].label + ':',
		left : 10,
		textAlign : 'left',
		font : {
			fontSize : 19,
			fontWeight : 'bold'
		}
	});
	viewInformacion.add(label);

	var labelNombre = Ti.UI.createLabel({
		color : 'white',
		height : Ti.UI.SIZE,
		top : 10,
		text : nuevoObjeto.data[i].value,
		left : 10,
		textAlign : 'left'
	});
	viewInformacion.add(labelNombre);
}
