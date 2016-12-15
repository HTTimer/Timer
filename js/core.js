/*
 * core.js
 */

var core=(function(){
	var list={};

	/*
	 * core:Init()
	 */
	function init(){

	}

	/*
	 * core:Set(key,value)
	 * @param key   String
	 * @param value String
	 *
	 * Registers value with the identifier key, and marks it to be included in every export
	 */
	function set(key,value){
		core.list[key]=value;
	}

	/*
	 * core:get(key)
	 * @param key String
	 * @return String The variable that has been found using key. Returns "" on error.
	 */
	function get(key){
		return core.list[key];
	}

	/*
	 * core:getAll()
	 * returns the whole list, useful for exporting
	 */
	function getAll(){
		return core.list;
	}

	return {
		init:init,
		get:get,
		set:set,
		getAll:getAll,
		list:list
	}
})();
