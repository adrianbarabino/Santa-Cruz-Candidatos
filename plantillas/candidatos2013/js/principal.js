console.log("Aplicación Iniciada");
var noticias_json = [];
$(document).on("ready", iniciar);
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
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

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
       menuItems
         .parent().removeClass("activo")
         .end().filter("[href=#"+id+"]").parent().addClass("activo");
   }                   
});


function iniciar (info) {
	
	
    $("#las-noticias > span a").on("click", function (info) {
    	$(".medio_actual").removeClass("medio_actual");
    	$(this).addClass("medio_actual");
    	var id_medio = $(this).attr("id");
    	console.log(id_medio);
    	$(".noticias").slideUp('200');
    	$("#noticias_"+id_medio).slideDown('200');
    	cargar_scrollspy();
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


		function cargar_scrollspy () {

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
	         cargar_rss(xml, id_contenedor);
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
   		  	cargar_scrollspy();
   		  	    $('nav ul').smint({
			    	'scrollSpeed' : 1000
			    });
   		  }
	}
}