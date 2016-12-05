/*
 * layout.js
 */

var layout=(function(){
	/*
	 * layout:Init()
	 */
	function init(){

	}

	/*
	 * layout:dispay()
	 */
	function display(){
		layout.write("LAYOUT",`
			<div class='component component-left'>Left: Timelist</div>
			<div class='component component-right'>Right: Statistics|Sessionselect</div>
			<div class='component component-top'>Top: Scramble|Scrambletools</div>
			<div class='component component-bottom'>Bottom: Select</div>
			<div class='component component-logo'>Logo: Logo</div>
			<div class='component component-middle'>Middle: Time</div>`);
	}

	/*
	 * layout:setFullLayout
	 */
	function setFullLayout(top,right,bottom,left,middle){

	}

	/*
	 * layout:write
	 *
	 * Source: https://stackoverflow.com/questions/11489716/how-to-use-innerhtml-with-class#answer-11489731
	 * Is modified to accept where and what
	 */
	function write(where,what){
		var items = document.getElementsByClassName(where),
			i, len;

		// loop through all elements having class name where
		for (i = 0, len = items.length; i < len; i++) {
			items[i].innerHTML = what;
		}
	}

	return {
		init:init,
		display:display,
		setFullLayout:setFullLayout,
		write:write
	}
})();
