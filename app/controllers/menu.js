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
