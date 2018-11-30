// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.imgDigitalizacion.addEventListener('click', function(){
  var siguiente=Alloy.createController('camara').getView();
  siguiente.open();
});

$.off.addEventListener('click', function(){
	var login = Alloy.createController('index').getView();
	login.open();
});

$.imgRayos.addEventListener('click',function(){
  var demo=Alloy.createController('datosGenerales').getView();
 demo.open();
});

/*
function open(){
  var view = Alloy.createController("datosGenerales").getView();
    $.nav.openWindow(view);
}*/

/*
$.imgRayos.addEventListener('click',function(){
  var major = parseInt(Ti.Platform.version.split(".")[0], 10);
if (OS_IOS || (OS_ANDROID && major >= 3)) {
    Alloy.Globals.top = OS_IOS && major >= 7 ? 20 : 0;
    Alloy.createController('datosGenerales').getView().open();
} */
 


