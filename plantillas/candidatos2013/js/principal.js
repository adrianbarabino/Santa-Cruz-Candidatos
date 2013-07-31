console.log("Aplicación Iniciada");
var noticias_json = [];
$(document).on("ready", iniciar);

// Declaramos variables para Backbone
var pagina_actual = "inicio";
var carga_inicial = true;
window.SCCandidatos = {};
SCCandidatos.Views = {};
SCCandidatos.Collections = {};
SCCandidatos.Models = {};
SCCandidatos.Routers = {};
SCCandidatos.util = {};

window.app = {};
window.routers = {};
window.plugs = {};
window.views = {};
window.collections = {};

// Fin de vars de backbone

function navegar_opiniones (elemento) {
  if(carga_inicial){
  	carga_inicial = false;
  	offsetvalor = -100;
  }else{
  	offsetvalor = -50;
  }
		var offsetOpinion = $('#opiniones article#'+elemento).offset().top-topMenuHeight+offsetvalor;
		$('html, body').stop().animate({ 
		     scrollTop: offsetOpinion
		}, 300);
		id_opinion = elemento;
		if($('#opiniones article#'+elemento).hasClass("abierto")){
		$("#"+id_opinion+" > div").slideUp('200');
		$('#opiniones article#'+elemento).removeClass("abierto");
		$('#opiniones article#'+elemento).addClass("cerrado");
		}else{
		$("#"+id_opinion+" > div").slideDown('200');
		$('#opiniones article#'+elemento).addClass("abierto");
		$('#opiniones article#'+elemento).removeClass("cerrado");
	}
}
function navegar (elemento) {
  var href = $("nav ul li a:contains('"+elemento+"')").attr("href");

  if(carga_inicial){
  	carga_inicial = false;
  	offsetvalor = -35;
  }else{
  	offsetvalor = 5;
  }
  var offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+offsetvalor;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);

  pagina_actual = $("nav ul li a:contains('"+elemento+"')").attr("href").split("#")[1];


}
// Cache selectors
var lastId,
    topMenu = $("nav ul"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       if(id){
       pagina_actual = id;

       }else{
       	pagina_actual = "inicio";
       }

       menuItems
         .parent().removeClass("activo")
         .end().filter("[href=#"+id+"]").parent().addClass("activo");
   }                   
});


function iniciar (info) {
	
	$(".opinion").on("click", function (info) {
		var id_opinion = $(this).attr("id");
		if($(this).hasClass("abierto")){
		$("#"+id_opinion+" > div").slideUp('200');
		$(this).removeClass("abierto");
		$(this).addClass("cerrado");
			url = "opiniones"
			Backbone.history.navigate(url, {trigger:false})
		}else{
			url = "opiniones/"+id_opinion;
			Backbone.history.navigate(url, {trigger:true})
		}

	});
    $("#las-noticias > span a").on("click", function (info) {
    	$(".medio_actual").removeClass("medio_actual");
    	$(this).addClass("medio_actual");
    	var id_medio = $(this).attr("id");
    	console.log(id_medio);
    	$(".noticias").slideUp('200');
    	$("#noticias_"+id_medio).slideDown('200');

    })
	$("#candidatos article figure").each(function (i, val) {
		id = $(this).parent().attr("id");
		fondo = $("#candidatos article#"+id+" img").attr("src");
		console.log(fondo+id)
		fondo = "url('"+fondo+"')";
		$("#candidatos article#"+id+" figure").css("background-image", fondo);
		$("#candidatos article#"+id+" img").remove();
		$("#candidatos article#"+id+" i").mouseover(function(){
		    $(this).addClass('icon-4x');
		  });
		$("#candidatos article#"+id+" i").mouseout(function(){
		    $(this).removeClass('icon-4x');
		  });
	})



	// Inicio de Backbone


    SCCandidatos.Routers.BaseRouter = Backbone.Router.extend({
		routes: {
			"" :  "inicio",
			"inicio" :  "inicio",
			"inicio/" :  "inicio",
			"elecciones-paso" :  "elecciones_paso",
			"elecciones-paso/" :  "elecciones_paso",
			"que-se-vota" :  "que_se_vota",
			"que-se-vota/" :  "que_se_vota",
			"donde-votar" :  "donde_votar",
			"donde-votar/" :  "donde_votar",
			"candidatos" :  "candidatos",
			"candidatos/" :  "candidatos",
			"opiniones" :  "opiniones",
			"opiniones/" :  "opiniones",
			"opiniones/:opinion" :  "opiniones_id",
			"opiniones/:opinion/" :  "opiniones_id",
			"noticias" :  "noticias",
			"noticias/" :  "noticias"
		},
		initialize : function(){
			var self = this;

		},
		inicio: function(){

		},
		elecciones_paso: function(){
			navegar("Elecciones PASO");
		},
		que_se_vota: function(){
			navegar("Que se vota");
		},
		donde_votar: function(){
			navegar("Donde votar");
		},
		candidatos: function(){
			navegar("Candidatos");

		},
		opiniones: function(){
			navegar("Opiniones");

		},
		opiniones_id: function(opinion){
			console.log("Estoy en opiniones con ID");
			console.log(opinion);
			navegar_opiniones(opinion);

		},
		noticias: function(){
			navegar("Noticias");

		}
	});
    window.routers.base = new SCCandidatos.Routers.BaseRouter();


	// De la siguiente forma, lee el atributo Rel del link
	// y ahÃ­ saca la URL a donde "navegarÃ­a" la aplicaciÃ³n.
	$("nav li a").on("click", function(e){
		var url = $(this).attr("data-url");
		console.log("Auch");
		console.log("La pagina actual es: '"+pagina_actual+"' y vamos hacia '"+$(this).attr("href").split("#")[1]+"'");
		if($(this).attr("href").split("#")[1] == pagina_actual){

			Backbone.history.loadUrl(Backbone.history.fragment);
		}else{

		Backbone.history.navigate(url, {trigger:true})
		}
		e.preventDefault();
	})
	window.AppView = Backbone.View.extend({
	  el: $("body"),
	  events: {
	  },
	  cargarPagina: function () {

	  }
	});
	var appview = new AppView;

	// Fin de Backbone

	// Lector de Feeds


	var url_nuevodia = "http://www.santacruzcandidatos.com.ar/noticias.php?medio=nuevodia";
	cargar_pagina(url_nuevodia, "#noticias_nuevodia");
	var url_vocesyapuntes = "http://www.santacruzcandidatos.com.ar/noticias.php?medio=vocesyapuntes";
	cargar_pagina(url_vocesyapuntes, "#noticias_vocesyapuntes");
	var url_tiemposur = "http://www.santacruzcandidatos.com.ar/noticias.php?medio=tiemposur";
	cargar_pagina(url_tiemposur, "#noticias_tiemposur");
	var url_elperiodico = "http://www.santacruzcandidatos.com.ar/noticias.php?medio=elperiodico";
	cargar_pagina(url_elperiodico, "#noticias_elperiodico");
		// ScrollSpy 


		function carga_final () {
			Backbone.history.start({
					pushState : true,
					root: "/"
			});
		}
	function cargar_pagina(url,id_contenedor){
		if(id_contenedor == "#noticias_nuevodia"){
			valor = false;
		}else{
			valor = true;
		}
	   var xml = $.ajax({
	      url: url,
	      async: valor,
	      success: function(xml){
	         $(id_contenedor).html("");
	         console.log(xml.getElementsByTagName('title'));
	         if(xml.getElementsByTagName('title')[0].firstChild.data == 'ERROR: Tried to load source page, but remote server reported "403 Forbidden".'){
	         	console.log("Ultra error");
	         }else{

	         cargar_rss(xml, id_contenedor);
	         }
	      }
	   });
	}
	function cargar_rss(xml, id_contenedor){
	   var limit = xml.getElementsByTagName('item').length;
	   for (var l=1; l<=limit; l++){
	      var title = xml.getElementsByTagName('title').item(l).firstChild.data;
	      var url = xml.getElementsByTagName('link').item(l).firstChild.data;
	      var guid = xml.getElementsByTagName('guid').item(l-1).firstChild.data;
	      console.log("Cargamos el GUID "+guid)
	      var description = xml.getElementsByTagName('description').item(l).firstChild.data;
	      if(id_contenedor == "#noticias_vocesyapuntes"){
	      	console.log("Aplicamos el REGEX");
	      	description = description.replace(/([\s\S]*)<\s*img src="(.*)([?:J|j][?:P|p][?:G|g]*)" ([\s\S]*)>(.*)<\/\s*p[^>]*>/g, "<figure class='foto-noticia'><img src='$2$3'></figure><p>$5</p>");
	      	console.log(description);
	      }
	      if(id_contenedor == "#noticias_nuevodia"){
	      description = description.split("<i>");
	      description = description[0];

	      }
	      if(id_contenedor == "#noticias_tiemposur"){
	      description = description.split("<i>");
	      description = description[0];

	      }
	      if(id_contenedor == "#noticias_elperiodico"){
	      description = description.split("<i>");
	      description = description[0];

	      }
	      noticia_medio = id_contenedor.split("_");
	      noticia_medio = noticia_medio[1];
	      var id = guid;
	      var noticia = new Object();
	      noticia.id = id;
	      noticia.titulo = title;
	      noticia.descripcion = description;
	      noticia.link = url;
	      noticia.medio = noticia_medio;
	      noticias_json.push(noticia);

	   }
	  	console.log("Listo!");
	  	  var compilado = _.template($('#lista').html());
   		  $(id_contenedor).html( compilado(noticias_json) ); 
   		  noticias_json = [];
   		  if(id_contenedor == "#noticias_tiemposur"){
   		  	carga_final();
   		  	    $('nav ul').smint({
			    	'scrollSpeed' : 1000
			    });
   		  }
	}
}