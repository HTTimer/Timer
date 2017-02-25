style = (function() {
	var styleO = `@font-face {
	font-family: 'lcd';
	src: url('css/lcd.ttf') format('truetype');
}

body {
	font-family: arial, Arial, courier;
	font-size: 18px;
	overflow: hidden;
}


/*
 * Position of the components
 */

.component {
	position: absolute;
	margin: 0;
	padding: 0;
	border: 1px solid black;
	background-color: #COMPONENTBACKGROUND;
}

.options {
	background-color: #COMPONENTBACKGROUND !important;
}

.component-left {
	left: 0;
	bottom: 0;
	width: 250px;
	top: 50px;
}

.component-right {
	right: 0;
	top: 50px;
	bottom: 0;
	width: 250px;
}

.component-top {
	top: 50px;
	right: 250px;
	left: 251px;
}

.component-bottom {
	bottom: 0;
	left: 251px;
	right: 251px;
	height: 25px;
}

.component-middle {
	top: 30%;
	left: 26%;
	right:30%;
	border: none;
}

.component-author {
	bottom: 0;
	left: 142px;
}

.component-logo {
	top: 0;
	left: 0;
	height: 50px;
	right: 0;
}

.hidden {
	display: none;
	z-index: 2;
}


/*
 * Virtual stackmat and stopwatch
 */

.STACKMAT {
	position: absolute;
	bottom: 190px;
	left: 350px;
	right: 350px;
	height: 190px;
	border: 1px solid black;
}

#stackmat-left {
	position: absolute;
	left: 10px;
	top: 10px;
	bottom: 10px;
}

#stackmat-right {
	position: absolute;
	right: 10px;
	top: 10px;
	bottom: 10px;
}

#stackmat-displays {
	position: absolute;
	left: 200px;
	right: 200px;
	bottom: 10px;
	top: 10px;
	height: 160px;
	background-color: #3030E0;
	border: 1px solid black;
}

#stackmat-display {
	position: absolute;
	top: 40px;
	left: 70px;
	height: 80px;
	width: 200px;
	background-color: white;
	border: 2px solid black;
	font-size: 30pt;
	text-align: right;
	font-size: 28pt !important;
}

#stackmat-reset {
	position: absolute;
	bottom: 25px;
	right: 50px;
	width: 34px;
	height: 34px;
	-webkit-border-radius: 17px;
	-moz-border-radius: 17px;
	border-radius: 17px;
	background-color: yellow;
}

#stackmat-on {
	position: absolute;
	top: 25px;
	right: 50px;
	width: 34px;
	height: 34px;
	-webkit-border-radius: 17px;
	-moz-border-radius: 17px;
	border-radius: 17px;
	background-color: red;
}

#stackmat-greenled {
	position: absolute;
	top: 100px;
	left: 400px;
	width: 30px;
	height: 30px;
	-webkit-border-radius: 15px;
	-moz-border-radius: 15px;
	border-radius: 15px;
	background-color: green;
}

#stackmat-redled {
	position: absolute;
	top: 50px;
	left: 400px;
	width: 30px;
	height: 30px;
	-webkit-border-radius: 15px;
	-moz-border-radius: 15px;
	border-radius: 15px;
	background-color: red;
}


/*
 * Style of things inside the components
 */

.TIMELIST table, .TIMELIST tr, .TIMELIST th, .TIMELIST td {
	border: 1px solid black;
}

.STATS table, .STATS tr, .STATS th, .STATS td {
	border: 1px solid black;
	border-left: none;
}

.BOTTOMMENU {
	text-align: center;
}

.LOG {
	height: 300px;
	overflow: auto;
}

.bottom-menu {
	height: 25px;
	width: 14.2%;
	display: inline-block;
	float: left;
	border-left: 1px solid black;
	text-align: center;
	cursor: pointer;
	font-size: 22px;
}

.bottom-menu:nth-child(1) {
	border: none;
}

.bottom-menu:nth-child(odd) {
	background-color: #MAINCOLOR;
}

.option:hover {
	background-color: #MAINCOLOR;
	cursor: pointer;
}

.TIMELIST {
	overflow-y: auto;
	overflow-x: hidden;
}

.SCRAMBLE {
	font-size: 25px;
	text-align: center;
	max-height: 250px;
	overflow: auto;
}

.SCRAMBLE div:nth-child(1) {
}

.SCRAMBLE div:nth-child(2) {
	bottom: 0;
	margin: 0;
	background-color: #MAINCOLOR;
	vertical-align: middle;
	color: #LIGHTFONT;
}

.SCRAMBLE div:nth-child(2)>*:hover {
	color: #WHITE;
	cursor: pointer;
}

.SCRAMBLE div:nth-child(2) .item {
	height: 100%;
	margin-left: 3px;
}

.TIME {
	font-size: 15em;
	font-family: lcd, Roboto, courier;
	border: none;
	background-color: white;
}

.LOGO {
	font-size: 42px;
	color: white;
	background-color: #323232;
}

.ALGSETS {
	overflow-y: auto;
	overflow-x: none;
}

.LOGO>small {
	font-size: 26px;
}

.left {
	float: left;
}

.right {
	float: right;
}

.options-item {
	display: block;
	width: 99%;
	height: 30px;
	border: 1px solid black;
}

#desktop-graphic {
	display: none;
}

#desktop-text {
	display: none;
}

#dropdown-wca {
	position: absolute;
	left: 251px;
	top: 140px;
	display: none;
}

#dropdown-333 {
	position: absolute;
	left: 311px;
	top: 140px;
	display: none;
}

.option {
	width: 80px;
	border: 1px solid black;
	height: 25px;
}

#console {
	margin: 0;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	cursor: none;
	background-color: black;
	font-family: courier;
	font-size: 14pt;
	color: white;
}

.text-input {
	border: 1px solid black;
	background-color: black;
	font-family: courier;
	font-size: 14pt;
	color: white;
}

.options {
	display: none;
	position: absolute;
	left: 1px;
	right: 1px;
	bottom: 26px;
	top: 51px;
	background-color: white;
	border-bottom: 1px solid black;
	z-index: 3;
}

.keycodes {
	display: none;
	background-color: black;
	color: white;
	font-size: 10pt;
	margin: 1px;
	padding: 3px;
	cursor: none;
}


/*
 * Styles of tables
 */

table {
	border-collapse: collapse;
	text-align: center;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
	display: table;
	text-indent: 0;
	width: 100%;
}

.TIME table tbody tr td {
	font-size: 42px;
	padding-left: 10px;
	color: #LIGHTFONT;
}

.TIME table tbody th {
	font-weight: normal;
}

.ALGSETS table:nth-child(1) {
	border: 1px solid black;
	border-collapse: collapse;
}

.ALGSETS tbody tr:nth-child(even), .OPTIONS table.striped tbody tr td:nth-child(even), .GOALS table tbody tr td:nth-child(even) {
	background-color: #MAINCOLOR !important;
}

.OPTIONS table, .OPTIONS tr, .OPTIONS td, .GOALS td {
	border: 1px solid black;
}

.TIMELIST table tbody tr {
	cursor: pointer;
}


/*
 * Styles of input
 */

input {
	border: 1px solid #LIGHTFONT;
}


/*
 * Styles of select, option
 */

select {
	border: 1px solid #LIGHTFONT;
	background-color: inherit;
}


/*
 * Progress bar
 * Native support: Firefox 6+, Opera 11+, Chrome, Safari 5.1
 * Polyfill support: Firefox 3.5-5, Opera 10.5-10.63, IE9-10
 * Partial polyfill support: IE8
 * No support: Safari <5.1, Firefox <3.5, Opera <10.5, IE<7
 * Maybe support: Edge
 */

progress[value] {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: none;
	width: 250px;
	height: 20px;
}

progress[role] {
	display: inline-block;
	position: relative;
	width: 10em;
	height: 1em;
	vertical-align: -.2em;
	background-image: url('data:image/gif;base64,R0lGODlhIAAQAIABAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODE3QTgyOEM0MzAwRkUyMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NEY2MUMyQTlDMzgxMUUwOUFFQ0M4MEYwM0YzNUE2RCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NEY2MUMyOTlDMzgxMUUwOUFFQ0M4MEYwM0YzNUE2RCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0MDcyMDY4MTE4MTdBODI4QzQzMDBGRTIzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE4MTdBODI4QzQzMDBGRTIzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkECQoAAQAsAAAAACAAEAAAAiwMjqkQ7Q/bmijaR+ndee7bLZ8VKmNUJieUVqvTHi8cz1Jtx0yOz7pt6L10BQAh+QQJCgABACwAAAAAIAAQAAACLYwNqctwD2GbKtpH6d157ts1nxUyY1Qup5QmK9Y6LxLPdGsHsTvv8uuzBXuhAgAh+QQJCgABACwAAAAAIAAQAAACLIx/oMsNCKNxdMk7K8VXbx55DhiKDAmZJ5qoFhu4LysrcFzf9QPvet4D0igFACH5BAkKAAEALAAAAAAgABAAAAIsjI8Hy+2QYnyUyWtqxVdvnngUGIoOiZgnmqkWG7gvKy9wXN81BO963gPSGAUAIfkECQoAAQAsAAAAACAAEAAAAixEjqkB7Q/bmijaR+ndee7bLZ8VKmNUJieUVqvTHi8cz1Jtx0yOz7pt6L10BQAh+QQJCgABACwAAAAAIAAQAAACLYQdqctxD2GbKtpH6d157ts1nxUyY1Qup5QmK9Y6LxLPdGsDsTvv8uuzBXuhAgAh+QQJCgABACwAAAAAIAAQAAACLIR/ocsdCKNxdMk7K8VXbx55DhiKDAmZJ5qoFgu4LysrcFzf9QPvet4D0igFACH5BAUKAAEALAAAAAAgABAAAAIshI8Xy+2RYnyUyWtqxVdvnngUGIoOiZgnmqkWC7gvKy9wXN81BO963gPSGAUAOw==');
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

progress[role], progress[aria-valuenow]:before {
	background-color: #5af;
}

progress[role], progress[role]:after {
	background-repeat: repeat-x;
	background-position: 0 0;
-moz-background-size: auto 100%;
-o-background-size: auto 100%;
background-size: auto 100%;
}

progress[aria-valuenow] {
	background: #eee;
}

progress[aria-valuenow]:before {
	content: "";
	display: block;
	height: 100%;
}

progress[role]:after {
	content: "";
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFRTE5QjlCQTlDMkQxMUUwOUFFQ0M4MEYwM0YzNUE2RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNkRFQUIzNjlDMkUxMUUwOUFFQ0M4MEYwM0YzNUE2RCI+IDxkYzp0aXRsZT4gPHJkZjpBbHQ+IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Z3JhZGllbnQ8L3JkZjpsaT4gPC9yZGY6QWx0PiA8L2RjOnRpdGxlPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRTE5QjlCODlDMkQxMUUwOUFFQ0M4MEYwM0YzNUE2RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRTE5QjlCOTlDMkQxMUUwOUFFQ0M4MEYwM0YzNUE2RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pq477Q0AAAD2SURBVHjaxFIxDsIwDLRF/1AmRp7AM9iYWHkD76AP6h9Qi1SGfqAMqGJg6XA4jts0RUwZiKLEsZ3L+Rwmoi0lDC6Ky4rAMuGO5DY5iuWH93oDegMuK8QA7JIYCMDpvwDDMBzNHCGtONYq2enjHKYLMObCp7dtu/+FDppDgyJpTemsrm/9l7L2ku4aUy4BTEmKR1hmVXV9OjfsqlqC7irAhBKxDnmOQdPc+ynKMXdenEELAFmzrnu8RoK6jpRhHkGJmFgdXmsByNf5Wx+fJPbigEI3OKrB77Bfy2VZzppqC0IfAtlIAusC9CNtUn/iIRXgnALwEWAA/+5+ZNOapmcAAAAASUVORK5CYII=');
}


/*
 * The wondeful buttons
 */

button {
	-webkit-box-shadow: inset 0px 1px 0px 0px #WHITEWHITE;
	-moz-box-shadow: inset 0px 1px 0px 0px #WHITEWHITE;
	box-shadow: inset 0px 1px 0px 0px #WHITEWHITE;
	background: -webkit-gradient(linear, left top, left bottom, color-stop(5%, #f9f9f9), to(#e9e9e9));
	background: -webkit-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);
	background: -moz-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);
	background: -o-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);
	background: linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f9f9f9', endColorstr='#e9e9e9', GradientType=0);
	background-color: #f9f9f9;
	-webkit-border-radius: 6px;
	-moz-border-radius: 6px;
	border-radius: 6px;
	border: 1px solid #dcdcdc;
	display: inline-block;
	cursor: pointer;
	color: #666666;
	font-family: Arial;
	font-size: 15px;
	font-weight: bold;
	padding: 6px 24px;
	text-decoration: none;
	text-shadow: 0px 1px 0px #WHITEWHITE;
}

button:hover {
	background: -webkit-gradient(linear, left top, left bottom, color-stop(5%, #e9e9e9), to(#f9f9f9));
	background: -webkit-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);
	background: -moz-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);
	background: -o-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);
	background: linear-gradient(to bottom, #e9e9e9 5%, #f9f9f9 100%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e9e9e9', endColorstr='#f9f9f9', GradientType=0);
	background-color: #e9e9e9;
}

button:active {
	position: relative;
	top: 1px;
}


/*
 * Switches
 */

.switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
}

.switch input {
	display: none;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #MAINCOLOR;
	-webkit-transition: .4s;
	-o-transition: .4s;
	-moz-transition: .4s;
	transition: .4s;
}

.slider:before {
	position: absolute;
	content: "";
	height: 26px;
	width: 26px;
	left: 4px;
	bottom: 4px;
	background-color: white;
	-webkit-transition: .4s;
	-o-transition: .4s;
	-moz-transition: .4s;
	transition: .4s;
}

input:checked+.slider {
	background-color: #2196F3;
}

input:focus+.slider {
	-webkit-box-shadow: 0 0 1px #2196F3;
	-moz-box-shadow: 0 0 1px #2196F3;
	box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
	-webkit-transform: translateX(26px);
	-moz-transform: translateX(26px);
	-ms-transform: translateX(26px);
	-o-transform: translateX(26px);
	transform: translateX(26px);
}

.slider.round {
	-webkit-border-radius: 34px;
	-moz-border-radius: 34px;
	border-radius: 34px;
}

.slider.round:before {
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	border-radius: 50%;
}


/*
 * Cards for Goals
 */

.card {
	width: 5%;
	min-width: 50px;
	max-width: 100px;
	margin: 5px;
	padding: 3px;
	height: 150px;
	float: left;
	font-size: 35px;
	border: 1px solid black;
	text-align: center;
	cursor: pointer;
	overflow: hidden;
}

.card div:nth-child(3) {
	padding-top: 5px;
}


/*
 * Color classes
 */

.red {
	background-color: red;
}

.green {
	background-color: green;
}

.yellow {
	background-color: yellow;
}

.orange {
	background-color: orange;
}


/*
 * Badges
 * from Bootstrap
 */

.badge {
	display: inline-block;
	min-width: 10px;
	padding: 3px 7px;
	font-size: 12px;
	font-weight: bold;
	line-height: 1;
	color: #WHITE;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	background-color: #777;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
}

.badge:empty {
	display: none;
}

.btn .badge {
	position: relative;
	top: -1px;
}

a.badge:hover, a.badge:focus {
	color: #WHITE;
	text-decoration: none;
	cursor: pointer;
}


/*
 * Smaller screens
 * >1200: Normal mode
 * 1000-1200: Reduced width of left and right components, smaller font on middle component
 * 800-1000: Reduce width again, smaller font on top, middle and bottom components
 */

@media (max-width: 1200px) and (min-width:1000px) {
	.component-left, .component-right {
		width: 200px;
	}

	.component-top, .component-bottom {
		left: 200px;
		right: 200px;
	}

	.component-middle {
		font-size: 100px;
	}

	.bottom-menu {
		width: 14%;
	}
}

@media (max-width: 1000px) and (min-width:800px) {
	.component-left, .component-right {
		width: 190px;
	}

	.component-top, .component-bottom {
		left: 190px;
		right: 190px;
	}

	.component-middle {
		font-size: 90px;
	}

	.bottom-menu {
		width: 14%;
	}

	.component-top, .component-bottom {
		font-size: 15px !important;
	}
}

/*
 * Everything else
 */

.half-width {
	width: 49.5%;
}

.SCRAMBLESELECT > div {
	float:left;
}
.SCRAMBLESELECT > div > select > option {
	width: 15vw;
	font-size: 15pt;
}

.CUBESELECT > div {
	float:left;
}
.CUBESELECT > div > select > option {
	width: 15vw;
	font-size: 15pt;
}

#begin {
	margin-left: 10px;
	margin-right: 10px;
}`;

	/*
	 * style:convert(varMapping,defaultVarMapping)
	 * @param varMapping:Array[Array[String,String]] VarColorMapping
	 * @param defaultVarMapping:Array[Array[String,String]] DefaultVarColorMapping
	 */

	function convert(varMapping, defaultVarMapping) {
		var i, styleM = styleO;
		for (i = 0; i < varMapping.length; ++i) {
			if (varMapping[i][1].length != 3 && varMapping[i][1].length != 6)
				varMapping[i][1] = defaultVarMapping[i][1];
			styleM = styleM.replace(new RegExp(varMapping[i][0], 'g'), varMapping[i][1]);
		}
		document.querySelectorAll("style")[0].innerHTML = styleM;
	}

	return {
		convert: convert,
		styleO: styleO
	}
})();
