<html>
	<head>
		<title></title>
	<link rel="stylesheet" type="text/css" media="screen" href="test.css">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
	<script src="jquery.easing.1.3.js" type="text/javascript"></script>
	        <script type="text/javascript">
            $(function() {
                $('ul.nav a').bind('click',function(event){
                    var $anchor = $(this);
                    
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1500,'easeInOutExpo');
                    /*
                    if you don't want to use the easing effects:
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1000);
                    */
                    event.preventDefault();
                });
            });
        </script>
	</head>
	<body>
	<div class="section" id="home">
		<?php include('nav.php'); ?>
	<h2>Awesome</h2>
	</div>
	<div class="section" id="about">
		<?php include('nav.php'); ?>
	<h2>Super Sweet</h2>

	</div>

	</body>
</html>
