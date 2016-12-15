/*
 * server.js
 */

var server=(function(){
	/*
	 * server:Init()
	 */
	function init(){

	}

	const SERVER_PATH="../HTTimer-4.3.0-Alpha-Server/";
	const  TIMER_PATH="../HTTimer-4.3.0-Alpha/";

	/*
	 * server:json(url)
	 * @param url String Url
	 * @param callback Function
	 * Example use: server.json("js/goals.js",function(t){console.log(t.response);})
	 */
	 function json(url,callback){
		 var jsonFile=new XMLHttpRequest();
     jsonFile.open("GET",SERVER_PATH+url,true);
     jsonFile.send();
     jsonFile.onreadystatechange=function(){callback(jsonFile)};
	 }

	return {
		init:init,
		json:json
	}
})();
