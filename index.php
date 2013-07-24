<?php
require("configuracion.php");


// Cargamos el nombre de la plantilla, y requerimos el archivo principal de esa plantilla.
$plantilla = $config['plantilla'];

// Tomamos la parte final de la URL, le quitamos los slashes
// Y de ahí, obtenemos cual es la sección actual de la página para uso desde PHP
// Ya que normalmente esta info la obtendríamos desde Javascript

$pagina_actual = explode("/", $_SERVER['REQUEST_URI']);

if($pagina_actual[1]){

	$pagina = $pagina_actual[1];

}else{

	$pagina = "inicio";
}

require("plantillas/".$plantilla."/estructura.php");

?>