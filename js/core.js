/*
 * core.js
 */

// Extend the function prototype to allow logging the full call trace
Function.prototype.trace = function() {
	var trace = [];
	var current = this;
	while (current) {
		trace.push(current.signature());
		current = current.caller;
	}
	return trace;
}
Function.prototype.signature = function() {
	var signature = {
		name: this.getName(),
		params: [],
		toString: function() {
			var params = this.params.length > 0 ?
				"'" + this.params.join("', '") + "'" : "";
			return this.name + "(" + params + ")"
		}
	};
	if (this.arguments) {
		for (var x = 0; x < this.arguments.length; x++)
			signature.params.push(this.arguments[x]);
	}
	return signature;
}
Function.prototype.getName = function() {
	if (this.name)
		return this.name;
	var definition = this.toString().split("\n")[0];
	var exp = /^function ([^\s(]+).+/;
	if (exp.test(definition))
		return definition.split("\n")[0].replace(exp, "$1") || "anonymous";
	return "anonymous";
}

var core = (function() {
	var list = {};

	/*
	 * core:Init()
	 */
	function init() {

	}

	/*
	 * core:Set(key,value)
	 * @param key   String
	 * @param value String
	 *
	 * Registers value with the identifier key, and marks it to be included in every export
	 */
	function set(key, value) {
		log.unshift((new Date().getSeconds()) + "." + (new Date().getMilliseconds()) + ": SET " + key + " TO " + value + " BY " + arguments.callee.caller.trace());
		core.list[key] = value;
	}

	/*
	 * core:get(key)
	 * @param key String
	 * @return String The variable that has been found using key. Returns "" on error.
	 */
	var log = [];

	function get(key) {
		log.unshift((new Date().getSeconds()) + "." + (new Date().getMilliseconds()) + ": GET " + key + " BY " + arguments.callee.caller.trace());
		return core.list[key];
	}

	/*
	 * core:getAll()
	 * returns the whole list, useful for exporting
	 */
	function getAll() {
		return core.list;
	}

	function displayLog() {
		layout.write("LOG", html.el("pre", log.join("\n")).substr(0, 10000));
	}

	return {
		init: init,
		get: get,
		set: set,
		getAll: getAll,
		displayLog: displayLog,
		list: list,
		log: log
	}
})();
