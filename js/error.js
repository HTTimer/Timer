/*
 * error.js
 */

var error=(function(){
	/*
	 * error:Init()
	 */
	function init(){

	}

	/*
	 * error:error(msg)
	 * @param msg String Error description
	 */
	var errors=[];
	function error(msg){
		errors.push(msg);
		console.warn(msg);
	}

	return {
		init:init,
		error:error,
		errors:errors
	}
})();
