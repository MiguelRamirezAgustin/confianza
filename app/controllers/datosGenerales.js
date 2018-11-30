// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var datosService = args.response;

console.log('Objeto-------' +datosService);

Ti.API.info('Datos...............'+ JSON.stringify(datosService));



    var itemCollection=[];
    for(var i=0; i<datosService.data.length; i++){
        var tmp={
            template:'template',
            username:{text:datosService.data[i].value},
            
        };
        itemCollection.push(tmp);
    }
    
    $.section.setItems(itemCollection);

/* setTimeout(function(){
    alert('demo'+JSON.stringify(datosService));
},3000)*/


   // $.section.sections[0].items = itemCollection;

/*
var posts=[];
  for(var i=0; i<nuevoObjeto.data.length; i++){
      var post={
           template="template",  
           nombre:{text:nuevoObjeto.data[i].value},
          // nombre: { text : data[i].get("nombre")}
      };
      posts.push(post);
  }
  $.section.setItems(posts);
*/




/*
function crearContacto(){
    var items=[];
    /*for(var i=0; i<nuevoObjeto.data.length; i++){
       items.push({
        nombre:{text:nuevoObjeto.data[i].value},
       });
       $.listView.sections[0].setItem(items);
    }
    var items=[];
    _.each(function (nuevoObjeto){
        items.push({
          nombre:{text:nuevoObjeto.data[i].value},
        });
    });
    $.listView.sections[0].setItem(items);
}
crearContacto(); */


/*
var view=Ti.UI.createView({
   width:"100%",
   height:"100%",
   layout:"vertical",
   backgroundColor:"#20B4D8"
});
$.windowsGeneral.add(view);

var label=Ti.UI.createLabel({
    title:"Documentos",
    text:"Documento",
    color:"white",
    textAling:Ti.UI.TEXT_ALING_CENTER
});
view.add(label);

var btn=Ti.UI.createButton({
   width:"100%",
   height:"4%",
   title:"Curp",
   backgroundColor:"white",
   top:5,
   color:"black",
   font:{
       fontSize:12,
       left:10
   },
});
view.add(btn);

var visible=false;

btn.addEventListener('click', function(e) {
    if(visible)  {
        redView.show(true);
    } else {
        redView.hide(false);
    }
    visible = !visible;
 });


 var btn2 =Ti.UI.createButton({
     width:"100%",
     height:"45",
     top:0,
     title:"Acta de Nacimiento",
     backgroundColor:"white",
     color:"black",
     font:{
         fontSize:12,
         left:0
     }
 });

 view.add(btn2);

 var visible=false;

 btn2.addEventListener('click', function(){
     if(visible){
         view2.show(true);
     }else{
         view2.hide(false);
     }
     visible=!visible;
 }); 

 var redView=Ti.UI.createView({
    title:'hide/show red view',
    top:0,
    height:"15%",
    width:"100%",
    backgroundColor:"white"
 });
 view.add(redView);

 var view2=Ti.UI.createView({
    height:"15%",
    width:"100%",
    backgroundColor:"white"
  });
 view.add(view2);*/