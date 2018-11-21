// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
//Libreria para compresion de imagen y rotacion de imagen
var ImageFactory = require('ti.imagefactory');


//*Se agregan variables para creacion y validaciones*//
var imageView,
    btnGaleria,
    btnFoto,
    btnEnvio;
var image;
var imagenBase64;
var seleccionoImagen = false;

//control que vizualiza la foto tomada o imagen seleccionada
imageView = Ti.UI.createImageView({
	borderColor: 'white',
	top: 30,
	width: '350dp',
	height: '480dp',
	borderRadius:5,
	borderWidth:2,
	layout:'vertical'
});
$.container.add(imageView);

//se agrega boton para seleccionar imagen de la galeria
btnGaleria = Ti.UI.createButton({
	bottom:10,
	right:5,
	width:'120px',
	height: '120px',
	title:'galeria',
	backgroundColor:'#6e27c5'
});
$.footer.add(btnGaleria);

//se agrega boton para tomar una foto
btnFoto = Ti.UI.createButton({
	bottom: 10,
	left:10,
	width:'120px',
	height: '120px',
	backgroundColor:'#6e27c5',
	title: 'tomar foto'
});
$.footer.add(btnFoto);

//se agrego boton para enviar la foto al servicioSAD
btnEnvio = Ti.UI.createButton({
	bottom: 10,
	backgroundColor:'#6e27c5',
	title: 'Enviar foto'
});
$.footer.add(btnEnvio);

btnGaleria.addEventListener('click', function(e) {
	abrirGaleria();
});

function abrirGaleria() {
	Ti.Media.openPhotoGallery({
		allowEditing : true,
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
		success : function(event) {
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				image = event.media;
				viewImage.image = image;
				viewImage.width = Ti.UI.SIZE;
				viewImage.height = Ti.UI.SIZE;
				seleccionoImagen = true;

			}
		},
		error : function(e) {
			alert('In error: ' + e.error);
		}
	});
}

btnFoto.addEventListener('click', function() {
	if (!Ti.Media.hasCameraPermissions()) {
		Ti.Media.requestCameraPermissions(function(e) {
			if (e.success) {
				abrirFoto();
			} else {
				alert('no se pudo optener permisos de la camara');
			}
		});
	} else {
		abrirFoto();
	}
});

function abrirFoto() {
	Ti.Media.showCamera({
		success : function(event) {
			image = event.media;
			viewImage.image = image;
			viewImage.width = Ti.UI.SIZE;
			viewImage.height = Ti.UI.SIZE;
			seleccionoImagen = true;
		},
		error : function(e) {
			alert('error al abrir la imagen' + e.error);
		}
	});
}

var progresBar = Ti.UI.Android.createProgressIndicator({
	location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
	type : Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
	min : 0,
	max : 100,
	message : 'precesando...',
	cancelable : true
});
$.index.add(progresBar);

btnEnvio.addEventListener('click', function(e) {
	//verificar conexion a internet
	if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE) {
		alert('No hay conexión a internet');
		return;
	}

	//Valida que en el viewImage contenga o se haya seleccionado una foto
	if (seleccionoImagen == false) {
		alert('Seleccione una imagen o tome una Foto!');
	} else {
		var url = 'https://7chgh1ve59.execute-api.us-east-2.amazonaws.com/sda-test';
		//'https://ko7afa9vef.execute-api.us-east-2.amazonaws.com/SDA'; //
		var httpClient = Ti.Network.createHTTPClient({
			onload : function(e) {

				//var respuesta = JSON.parse(this.responseText);
				//Ti.API.info('*********respuesta' + this.responseText);
				//alert('respuesta ' + JSON.stringify(respuesta));

				var miObjetoRespuesta = {
					response : JSON.parse(this.responseText)
				};

				///Ti.App.Properties.setString('objetosService', miObjetoRespuesta);
				var info = Alloy.createController('info', miObjetoRespuesta).getView();
				if (true) {
					info.open();
				}
			},
			onsendstream : function(e) {
				Ti.API.info('*********************Enviando informaciòn Progress ' + e.progress);
				progresBar.show();

				var value = 0;
				setInterval(function() {
					if (value > 100) {
						return;
					}
					progresBar.value = value;
					value++;
				}, 300); 


				//progresBar.setValue(e.progress);

				setTimeout(function() {
					progresBar.hide();
				}, 20000);

			},
			onerror : function(e) {
				alert('error al enviar la imagen: ' + e.error);
			},
			timeout : 20000,
		});

		var imagenComprimida = ImageFactory.compress(image, 0.25);

		var archivo = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'demo.png');
		archivo.write(imagenComprimida);

		var archivo2 = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'demo.png');
		archivo2.read();

		imagenBase64 = Ti.Utils.base64encode(archivo2).toString();
		//Ti.API.info('imagen convertida a base' + imagenBase64);

		var datosEnvio = {
			"source" : imagenBase64
		};

		httpClient.open('POST', url);
		httpClient.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		httpClient.send(JSON.stringify(datosEnvio));
	}
});
$.footer.add(btnEnvio);

var etiquetas = Ti.UI.createLabel({
	text : 'Capturar Foto',
	font : {
		fontSize : 19,
		fontWeight : "bold"
	},
	width : Ti.UI.SIZE,
	height : Ti.UI.SIZE,
	top : 5,
	color : 'black'
});
$.header.add(etiquetas);

etiquetas.addEventListener('click', function(e) {
	//alert('alerta');
	rotarImage();
});

//Función para rotar imagen utilizando el modulo de ti.imageFactory
function rotarImage() {
	grados = Number(grados) + 90;
	var rotarImage = ImageFactory.imageWithRotation(image, {
		degrees : 90,
	});
	image = rotarImage;
	viewImage.setImage(image);
}