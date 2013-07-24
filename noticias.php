<?php
   $filename = "http://www.feed43.com/5114407650154810.xml";
   header("Content-type:text/xml");
   header('Access-Control-Allow-Origin: *');  
   readfile ($filename);
?>