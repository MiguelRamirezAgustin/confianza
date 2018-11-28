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
var grados;

//control que vizualiza la foto tomada o imagen seleccionada
viewImage = Ti.UI.createImageView({
	borderColor : 'white',
	top : 20,
	width : '350dp',
	height : '450dp', //480
	borderRadius : 5,
	borderWidth : 2,
	layout : 'vertical'
});
$.header.add(viewImage);

//se agrega boton para tomar una foto
btnFoto = Ti.UI.createButton({
	top : 10,
	left : "20dp",
	width : '11%',
	height : '70%',
	backgroundImage : '/images/camera.png'
});
$.footer.add(btnFoto);


//se agrego boton para enviar la foto al servicioSAD
btnEnvio = Ti.UI.createButton({
	top : 20,
	backgroundColor : '#6e27c5',
	title : 'Enviar foto',
	title : 'Enviar Imágen',
	width : '43%',
	height:"50%",
	left:"33dp",
	borderRadius:3
});
$.footer.add(btnEnvio);

//se agrega boton para seleccionar imagen de la galeria
btnGaleria = Ti.UI.createButton({
	top: 15,
	left:"25dp",
	width : '12%',
	height : '55%',
	backgroundImage : '/images/picture.png'
});
$.footer.add(btnGaleria);

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
			alert('In error ');
		}
	});
}

btnFoto.addEventListener('click', function() {
	if (!Ti.Media.hasCameraPermissions()) {
		Ti.Media.requestCameraPermissions(function(e) {
			if (e.success) {
				abrirFoto();
			} else {
				alert('No se pudo optener permisos de la camara');
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
			alert('Error al abrir la imagen');
		}
	});
}

	//Notificacion
	function notificacion(){
		var notifi=Ti.UI.createNotification({
		 message:"Enviando Imagen",
		 duration:Ti.UI.NOTIFICATION_DURATION_LONG,
		 gravity:Titanium.UI.Android.GRAVITY_CLIP_VERTICAL
		});
		notifi.show();
	}

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
        // boton 
		btnEnvio.title = "Procesando...";
		btnEnvio.color = '#1fc0d4';		
		btnEnvio.enabled = false;
		// llamada de notificacion
		notificacion();

		
		var url = 'https://8oepupymf6.execute-api.us-east-2.amazonaws.com/sprint2-test';
		
		//'https://7chgh1ve59.execute-api.us-east-2.amazonaws.com/sda-test';
		//'https://ko7afa9vef.execute-api.us-east-2.amazonaws.com/SDA'; //
		
		var httpClient = Ti.Network.createHTTPClient({
			onload : function(e) {

				//var respuesta = JSON.parse(this.responseText);
				//Ti.API.info('*********respuesta' + this.responseText);
				//alert('respuesta ' + JSON.stringify(respuesta));

				var miObjetoRespuesta = {
					response : JSON.parse(this.responseText)
				};
				//habilitar boton al responder el servicio
				btnEnvio.title = "Enviar Imágen";
				btnEnvio.color = 'white';
				btnEnvio.enabled = true;

				///Ti.App.Properties.setString('objetosService', miObjetoRespuesta);
				var info = Alloy.createController('info', miObjetoRespuesta).getView();
				if (true) {
					info.open();
				}
			},
			onsendstream : function(e) {
				Ti.API.info('*********************Enviando informaciòn Progress ' + e.progress);

			},
			onerror : function(e) {
				alert('Error al enviar la imagen volver a intentar!');
				//habilita el boton al responder el servicio con error
				btnEnvio.title = "Enviar Imágen";
				btnEnvio.color = 'white';
				btnEnvio.enabled = true;

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
	color : 'white',
	top:"15dp"
});
$.container.add(etiquetas);

etiquetas.addEventListener('click', function(e) {
	//alert('alerta');
	rotarImage();
});

//Función para rotar imagen utilizando el modulo de ti.imageFactory
function rotarImage() {
	grados = Number(grados) + 90;
	var rotarImage = ImageFactory.imageWithRotation(image, {
		degrees : -90,
	});
	image = rotarImage;
	viewImage.setImage(image);
}