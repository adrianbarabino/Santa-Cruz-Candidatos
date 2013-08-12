<?php
	if($_GET['medio']){
		$medio = $_GET['medio'];

		if($medio == "nuevodia"){
  			$filename = "http://www.feed43.com/5114407650154810.xml";
		}
		if($medio == "vocesyapuntes"){
			$filename = "http://www.vocesyapuntes.com/nuevo/index.php?option=com_content&view=category&layout=blog&id=3&Itemid=5&format=feed&type=rss";
		}
		if($medio == "tiemposur"){
			$filename = "http://feed43.com/7602578423011476.xml";
		}
		if($medio == "elperiodico"){
			$filename = "http://feed43.com/8633484411154562.xml";
		}
		if($medio == "grafico"){
			$filename = "http://elecciones2013.santacruz.gov.ar/datos.php";
		}
	}

	if($medio != "grafico"){

   header("Content-type:text/xml");
	}
   header('Access-Control-Allow-Origin: *');  

	if($medio != "grafico"){

   readfile ($filename);
}
	if($medio == "grafico"){

   $archivo = file_get_contents($filename);
	$archivo = preg_replace('/([\s\S]*)Lista 2([\s\S]*)<div class="porcentaje">(.*)%<\/([\s\S]*)Lista 38([\s\S]*)<div class="porcentaje">([\s\S]*)<span>(.*)<\/span>([\s\S]*)Lista 154([\s\S]*)<div class="porcentaje">([\s\S]*)<span>(.*)<\/span>([\s\S]*)Lista 501([\s\S]*)<div class="porcentaje">([\s\S]*)<span>(.*)<\/span>([\s\S]*)Lista 502([\s\S]*)<div class="porcentaje">(.*)%<\/([\s\S]*)([\s\S]*)/', '{ "pj" : "\3%", "fut": "\7", "po": "\11", "fpv": "\15", "union": "\18%"}', $archivo);
	$archivo = str_replace("%", "", $archivo);
	echo $archivo;

}
?>