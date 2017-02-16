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
		layout.write("LAYOUT", `Theme settings `);
	}

	/*
	 * layout:setFullLayout
	 * @TODO
	 */
	function setFullLayout(top, right, bottom, left, middle) {

	}

	/*
	 * layout:setTheme(id)
	 * @param id Int
	 * Changes the color of several parts of the timer
	 * var themes contains colors for predefined themes in white, yellow, orange, green, blue
	 */

	var themes = [
		[
			["WHITE", "FFF"],
			["COMPONENTBACKGROUND", "F5F5F5"],
			["MAINCOLOR", "CCC"],
			["LIGHTFONT", "444444"]
		],
		[
			["WHITE", "FFF"],
			["COMPONENTBACKGROUND", "FFFF00"],
			["MAINCOLOR", "DDDD00"],
			["LIGHTFONT", "555555"]
		],
		[
			["WHITE", "FFF"],
			["COMPONENTBACKGROUND", "FFA500"],
			["MAINCOLOR", "EEBB11"],
			["LIGHTFONT", "444443"]
		],
		[
			["WHITE", "FFF"],
			["COMPONENTBACKGROUND", "AAEE00"],
			["MAINCOLOR", "44DD33"],
			["LIGHTFONT", "232323"]
		],
		[
			["WHITE", "EEE"],
			["COMPONENTBACKGROUND", "3333BB"],
			["MAINCOLOR", "1111EE"],
			["LIGHTFONT", "444443"]
		],
		//CUSTOM
		[
			["WHITE", "FFF"],
			["COMPONENTBACKGROUND", "F5F5F5"],
			["MAINCOLOR", "CCC"],
			["LIGHTFONT", "444444"]
		]
	];

	function setTheme(id) {
		style.convert(themes[id], themes[0]);
	}

	/*
	 * layout:write
	 * @param where String document class name
	 * @param what String what to write into those elements
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
		setTheme: setTheme,
		themes: themes
	}
})();
