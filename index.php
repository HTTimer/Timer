<!doctype html>
<html>
	<head>
		<title>HTTimer - the best cubing timer in the world</title>
		<script src="js/error.js"></script>
		<script src="js/core.js"></script>
		<script src="js/math.js"></script>
		<script src="js/html.js"></script>
		<script src="js/layout.js"></script>
		<script src="js/translate.js"></script>
		<script src="js/sessions.js"></script>
		<script src="js/scramble.js"></script>
		<script src="js/counter.js"></script>
		<script src="js/stats.js"></script>
		<script src="js/algSets.js"></script>
		<script src="js/goals.js"></script>
		<script src="js/keyboard.js"></script>
		<script src="js/options.js"></script>
		<script src="js/timer.js"></script>
		<script src="js/cnd.js"></script>
		<script src="js/progress.js"></script>
		<meta/>
		<link rel="stylesheet" type="text/css" href="css/timer.css"/>
	</head>
	<body onload="timer.init();">
		<!--
		Graphic mode for Desktop PCs and tablets
		-->
		<div id="desktop-graphic">
			<!--
			Initialize containers for components.
			These will be filled later using javascript.
			-->
			<!--<div class="component component-author">YTCuber</div>-->
			<div class="component component-left TIMELIST"></div>
			<div class="component component-top SCRAMBLE"></div>
			<div class="component component-right">
				<div class="SESSIONSELECT"></div>
				<div class="STATS"></div>
			</div>
			<div class="component component-middle">
				<div class="TIME"></div>
				<div class="FLAGS"></div>
			</div>
			<div class="component component-logo LOGO"></div>
			<div class="component component-bottom BOTTOMMENU"></div>
			<div class="options ALGSETS"></div>
			<div class="options GOALS"></div>
			<div class="options PORT"></div>
			<div class="options MUSIC"></div>
			<div class="options PRACTISE"></div>
			<div class="options OPTIONS"></div>
			<div class="options LAYOUT"></div>

			<div id="dropdown-wca" onmouseout="html.toggle('dropdown-wca');"></div>
			<div id="dropdown-333" onmouseout="html.toggle('dropdown-333');"></div>
		</div>

		<!--
		Text-based mode
		-->
		<div id="desktop-text">
			<div id="console">
			<span id="console-output">
				You are viewing the text-based mode of HTTimer. Type help and press enter to get Help. Press tab to focus command input.<br>
				<span style='color:#22DD22'>HT4.3.0A&gt;</span> </span><input class="text-input" id="btn_cmd" type="text"/>
			</div>
		</div>
		<noscript>
			<script>
				alert("Please check your browser!");
			</script>
			Please enable Javascript.
			https://davidwalsh.name/supporting-internet-explorer
		</noscript>
	</body>
</html>
