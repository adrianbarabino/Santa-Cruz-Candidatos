console.log("Aplicación Iniciada");
var noticias_json = [];
$(document).on("ready", iniciar);

function iniciar (info) {
	
    $('nav ul').smint({
    	'scrollSpeed' : 1000
    });

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


	var url = "http://www.santacruzcandidatos.com.ar/noticias.php";
	cargar_pagina(url, "#noticias");

	function cargar_pagina(url,id_contenedor){
	   var xml = $.ajax({
	      url: url,
	      success: function(xml){
	         $(id_contenedor).html("");
	         cargar_rss(xml, id_contenedor);
	      }
	   });
	}
	function cargar_rss(xml, id_contenedor){
	   var limit = xml.getElementsByTagName('item').length;
	   for (var l=1; l<=limit; l++){
	   	  	console.log("Leeremos el id "+l);
	   	  	console.log("El titulo es: "+xml.getElementsByTagName('title').item(l).firstChild.data)
	      var title = xml.getElementsByTagName('title').item(l).firstChild.data;
	      var url = xml.getElementsByTagName('link').item(l).firstChild.data;
	      var guid = xml.getElementsByTagName('guid').item(l-1).firstChild.data;
	      console.log("Cargamso el GUID "+guid)
	      var description = xml.getElementsByTagName('description').item(l).firstChild.data;
	      description = description.split("<i>");
	      description = description[0];
	      var id = guid;
	      var noticia = new Object();
	      noticia.id = id;
	      noticia.titulo = title;
	      noticia.descripcion = description;
	      noticia.link = url;
	      noticias_json.push(noticia);

	   }
	  	console.log("Listo!");
	  	  var compilado = _.template($('#lista').html());
   		  $('#noticias').html( compilado(noticias_json) ); 
	}
}