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
	}
   header("Content-type:text/xml");
   header('Access-Control-Allow-Origin: *');  
   readfile ($filename);
?>