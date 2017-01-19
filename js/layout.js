/*
 * layout.js
 */

var layout = (function() {
	/*
	 * layout:Init()
	 */
	function init() {

	}

	/*
	 * layout:dispay()
	 */
	function display() {
		layout.write("LAYOUT", `
			<div class='component component-left'>Left: Timelist</div>
			<div class='component component-right'>Right: Statistics|Sessionselect</div>
			<div class='component component-top'>Top: Scramble|Scrambletools</div>
			<div class='component component-bottom'>Bottom: Select</div>
			<div class='component component-logo'>Logo: Logo</div>
			<div class='component component-middle'>Middle: Time</div>`);
	}

	/*
	 * layout:setFullLayout
	 * @TODO
	 */
	function setFullLayout(top, right, bottom, left, middle) {

	}

	/*
	 * layout:setColor(color1,color2,color3,color4)
	 * Changes the color of several parts of the timer
	 * Also has predefined themes in orange,green,blue,grey.
	 */

	var themes = [
		["#FF6F00", "#FF8F00", "#000000", "#e65100"],
		["#33691e", "#FF8B2F", "#000000", "#2B5E20"],
		["#1565c0", "#0d47a1", "#000000", "#1A237E"],
		["#212121", "#424242", "#FFFFFF", "#000000"]
	];

	function setColor(color1, color2, color3, color4) {
		//Write color1 as background-color to top,left,right
		document.getElementsByClassName("component-right")[0].style.backgroundColor = color1;
		document.getElementsByClassName("component-top")[0].style.backgroundColor = color1;
		document.getElementsByClassName("component-left")[0].style.backgroundColor = color1;
		//Write color2 as background-color of select,option and button
		document.querySelectorAll("style")[0].innerHTML = "select,button,option{background-color:" + color2 + " !important;}";
		//Write color3 as font color
		document.querySelectorAll("style")[0].innerHTML += "body{color:" + color3 + " !important;}";
		//Write color4 as font color for the middle component
		document.querySelectorAll("style")[0].innerHTML = ".component-middle{color:" + color4 + " !important;}";
	}

	function setTheme(id) {
		setColor(themes[id][0], themes[id][1], themes[id][2], themes[id][3]);
	}

	/*
	 * layout:write
	 *
	 * Source: https://stackoverflow.com/questions/11489716/how-to-use-innerhtml-with-class#answer-11489731
	 * Is modified to accept where and what and reformatted
	 */
	function write(where, what) {
		var items = document.getElementsByClassName(where),
			i, len;

		// loop through all elements having class name where
		for (i = 0, len = items.length; i < len; i++) {
			items[i].innerHTML = what;
		}
	}

	return {
		init: init,
		display: display,
		setFullLayout: setFullLayout,
		write: write,
		setColor: setColor,
		setTheme: setTheme
	}
})();
