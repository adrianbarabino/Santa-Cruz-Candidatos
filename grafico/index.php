<?php

$filename = "http://elecciones2013.santacruz.gov.ar/datos.php";

$archivo2 = file_get_contents($filename);
$archivo = preg_replace('/([\s\S]*)Lista 2([\s\S]*)<div class="porcentaje">(.*)%<\/([\s\S]*)Lista 38([\s\S]*)<div class="porcentaje">([\s\S]*)<span>(.*)<\/span>([\s\S]*)Lista 154([\s\S]*)<div class="porcentaje">([\s\S]*)<span>(.*)<\/span>([\s\S]*)Lista 501([\s\S]*)<div class="porcentaje">([\s\S]*)<span>(.*)<\/span>([\s\S]*)Lista 502([\s\S]*)<div class="porcentaje">(.*)%<\/([\s\S]*)([\s\S]*)/', '{ "pj" : "\3%", "fut": "\7", "po": "\11", "fpv": "\15", "union": "\18%"}', $archivo2);
$mesas = preg_replace('/([\s\S]*)MESAS([\s\S]*)Totales([\s\S]*)<td class="cuadro1-p">(.*)<\/td>([\s\S]*)Escrutadas([\s\S]*)<td class="cuadro1-p">(.*)<\/td>([\s\S]*)<table class="totales">([\s\S]*)/', '{ "totales" : "\4", "escrutadas": "\7"}', $archivo2);
$archivo = str_replace("%", "", $archivo);

$datospj = preg_replace('/([\s\S]*)"Fuerza Santa Cruz"([\s\S]*)<div class="porcentaje2">(.*)%<\/div>([\s\S]*)"Eva Per&oacute;n"([\s\S]*)<div class="porcentaje2">(.*)%<\/div>([\s\S]*)"Lealtad y Militancia"([\s\S]*)<div class="porcentaje2">(.*)%<\/div>([\s\S]*)/', '{"beroiza": "\3", "victoria": "\6", "turchetti": "\9"}', $archivo2);
$datospj = json_decode($datospj);

$datosunion = preg_replace('/([\s\S]*)"Juntos por el Cambio"([\s\S]*)<div class="porcentaje2">(.*)%<\/div>([\s\S]*)"Proyecto Alternativo"([\s\S]*)<div class="porcentaje2">(.*)%<\/div>([\s\S]*)/', '{"costa": "\3", "prades": "\6"}', $archivo2);
$datosunion = json_decode($datosunion);

$datos = json_decode($archivo);
$mesas = json_decode($mesas);
$mesas_escrutadas = $mesas->escrutadas." de ".$mesas->totales;
?><!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
		<meta property="og:title" content="Resultados de Elecciones PASO 2013" />
		<meta property="og:image" content="https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-frc1/581456_364205107041039_258059046_n.png" />
		<meta property="og:url" content="http://www.santacruzcandidatos.com/" />

		<meta property="og:description" content="Informate como van los resultados de las elecciones PASO 2013 en Santa Cruz." />
		<meta property="og:type" content="website" />
		<meta property="og:site_name" content="Santa Cruz Candidatos" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
        <title>Cómputos extra-oficiales de las PASO 2013</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <link rel="stylesheet" type="text/css" href="/grafico/css/index-grafico.css" />
        <link rel="stylesheet" type="text/css" href="/grafico/css/grafico.php" />
        <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
		<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700,300,300italic' rel='stylesheet' type='text/css'>
		<!--[if lt IE 9]>
			<script type="text/javascript" src="./js/modernizr.custom.04022.js"></script> 
			<style>.ie-note-1{display:block;} .grafico{display:none;}</style>
		<![endif]-->
		<!--[if IE 9]><style>.ie-note-2{display:block;}</style><![endif]-->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <script>
        var grafico_actual;

        grafico_actual = "partidos";
        var informacion;
        $(document).on("ready", iniciar);

        function iniciar () {
            $(document).tooltip();
            $("#f-pj").on("click", function () {
            	
                $("#li1 span").text("Beroiza");
                $("#li1 .bar-inner").text("<?php echo $datospj->beroiza;?>")
                $("#li1 .bar-wrapper").attr("title", "<?php echo $datospj->beroiza;?>%")
                $("#li1 .bar-inner").css({"height":"<?php echo $datospj->beroiza;?>%"})
            	
                $("#li2 span").text("Victoria");
                $("#li2 .bar-inner").text("<?php echo $datospj->victoria;?>")
                $("#li2 .bar-wrapper").attr("title", "<?php echo $datospj->victoria;?>%")
                $("#li2 .bar-inner").css({"height":"<?php echo $datospj->victoria;?>%"})

                $("#li3 span").text("Turchetti");
                $("#li3 .bar-inner").text("<?php echo $datospj->turchetti;?>")
                $("#li3 .bar-wrapper").attr("title", "<?php echo $datospj->turchetti;?>%")
                $("#li3 .bar-inner").css({"height":"<?php echo $datospj->turchetti;?>%"})

                $("#li3").slideDown();
                $("#li4").slideUp();
                $("#li5").slideUp();

            })
            $("#f-union").on("click", function () {
            	
                $("#li1 span").text("Costa");
                $("#li1 .bar-inner").text("<?php echo $datosunion->costa;?>")
                $("#li1 .bar-wrapper").attr("title", "<?php echo $datosunion->costa;?>%")
                $("#li1 .bar-inner").css({"height":"<?php echo $datosunion->costa;?>%"})
            	
                $("#li2 span").text("Prades");
                $("#li2 .bar-inner").text("<?php echo $datosunion->prades;?>")
                $("#li2 .bar-wrapper").attr("title", "<?php echo $datosunion->prades;?>%")
                $("#li2 .bar-inner").css({"height":"<?php echo $datosunion->prades;?>%"})


                $("#li3").slideUp();
                $("#li4").slideUp();
                $("#li5").slideUp();

            })

            $("#f-partidos").on("click", function () {
            	
                $("#li3").slideDown();
                $("#li4").slideDown();
                $("#li5").slideDown();
                $("#li1 span").text("FPV");
                $("#li1 .bar-inner").text("<?php echo $datos->fpv;?>")
                $("#li1 .bar-wrapper").attr("title", "<?php echo $datos->fpv;?>%")
                $("#li1 .bar-inner").css({"height":"<?php echo $datos->fpv;?>%"})
            	
                $("#li2 span").text("PJ");
                $("#li2 .bar-inner").text("<?php echo $datos->pj;?>")
                $("#li2 .bar-wrapper").attr("title", "<?php echo $datos->pj;?>%")
                $("#li2 .bar-inner").css({"height":"<?php echo $datos->pj;?>%"})

                $("#li3 span").text("UCR-ARI-EC");
                $("#li3 .bar-inner").text("<?php echo $datos->union;?>")
                $("#li3 .bar-wrapper").attr("title", "<?php echo $datos->union;?>%")
                $("#li3 .bar-inner").css({"height":"<?php echo $datos->union;?>%"})


            })

            $.ajax({
            	url: "/noticias.php?medio=grafico"
            }).done(function (data) {
            	informacion = data;
		      	informacion = JSON.parse(informacion);
		      	informacion.pj = informacion.pj.substring(0, informacion.pj.length-1);
		      	informacion.fut = informacion.fut.substring(0, informacion.fut.length-1);
		      	informacion.po = informacion.po.substring(0, informacion.po.length-1);
		      	informacion.fpv = informacion.fpv.substring(0, informacion.fpv.length-1);
		      	informacion.union = informacion.union.substring(0, informacion.union.length-1);


            })
        }

        </script>
    </head>
    <body>
        <div class="contenedor-grafico">
            <header>
                <h1>Cómputos oficiales <span> de las PASO 2013 en Santa Cruz</span></h1><br>
                <b style="margin:0;padding:0">Mesas escrutadas: <?php echo $mesas_escrutadas; ?></b><br>
				<h2 class="ie-note ie-note-1">Please view this in a modern browser.</h2>
				<h2 class="ie-note ie-note-2">CSS3 Transitions don't work in Internet Explorer &lt; 10</h2>
            </header>
			<section id="social" style="display:block; margin:0 auto;">
				<center>
					<span class='st_facebook_large' displayText='Facebook'></span>
					<span class='st_twitter_large' displayText='Tweet'></span>
					<span class='st_googleplus_large' displayText='Google +'></span>
					<span class='st_email_large' displayText='Email'></span>
					<span class='st_sharethis_large' displayText='ShareThis'></span>
				</center>
				
				<script type="text/javascript">var switchTo5x=false;</script>
				<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
				<script type="text/javascript">stLight.options({publisher: "ur-4f4dac64-dfb4-42f7-8d6-2527e73ed37b", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
			</section>
            <section class="grafico">
				

                    
                <input type="radio" name="resize-graph" id="graph-normal" style="display:none!important;"checked="checked" /><label for="graph-normal">Normal</label>



                <span class="button-label">Mostrar:</span>
                <input type="radio" name="fill-graph" id="f-pj" /><label for="f-pj">PJ</label>
                <input type="radio" name="fill-graph" id="f-partidos" checked="checked" /><label for="f-partidos">PARTIDOS</label>
                <input type="radio" name="fill-graph" id="f-union" /><label for="f-union">UNION</label>
                <br>
                <ul class="graph-container">
                    <li id="li1">
                        <span>FPV</span>
                        <div class="bar-wrapper" title="<?php echo $datos->fpv;?>%">
                            <div class="bar-container">
                                <div class="bar-background"></div>
                                <div class="bar-inner" ><?php echo $datos->fpv;?></div>
                                <div class="bar-foreground"></div>
                            </div>
                        </div>
                    </li>
                    <li id="li2">
                        <span>PJ</span>
                        <div class="bar-wrapper" title="<?php echo $datos->pj;?>%">
                            <div class="bar-container">
                                <div class="bar-background"></div>
                                <div class="bar-inner" ><?php echo $datos->pj;?></div>
                                <div class="bar-foreground"></div>
                            </div>
                        </div>
                    </li>
                    <li id="li3">
                        <span>UCR-ARI-EC</span>
                        <div class="bar-wrapper" title="<?php echo $datos->union;?>">
                            <div class="bar-container">
                                <div class="bar-background"></div>
                                <div class="bar-inner"><?php echo $datos->union;?></div>
                                <div class="bar-foreground"></div>
                            </div>
                        </div>
                    </li>
                    <li id="li4">
                        <span>PO</span>
                        <div class="bar-wrapper" title="<?php echo $datos->po;?>%">
                            <div class="bar-container">
                                <div class="bar-background"></div>
                                <div class="bar-inner" ><?php echo $datos->po;?></div>
                                <div class="bar-foreground"></div>
                            </div>
                        </div>
                    </li>
                    <li id="li5">
                        <span>MST</span>
                        <div class="bar-wrapper" title="<?php echo $datos->fut;?>%">
                            <div class="bar-container">
                                <div class="bar-background"></div>
                                <div class="bar-inner" ><?php echo $datos->fut;?></div>
                                <div class="bar-foreground"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <ul class="graph-marker-container">
                            <li style="bottom:1.5%;"><span>1.5%</span></li>
                            <li style="bottom:25%;"><span>25%</span></li>
                            <li style="bottom:50%;"><span>50%</span></li>
                            <li style="bottom:75%;"><span>75%</span></li>
                            <li style="bottom:100%;"><span>100%</span></li>
                        </ul>
                    </li>
                </ul>

            </section>
           	<footer>
           		<span>
           			Plataforma desarrollada por <a href="http://www.adrianbarabino.com/">Adrian Barabino</a>
           			Información extraída desde <a href="http://elecciones2013.santacruz.gov.ar/"> la página del gobierno de Santa Cruz </a>
           		</span>
           	</footer>

        </div>

    </body>
</html>
