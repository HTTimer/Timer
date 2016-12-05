/*
 * sessions.js
 * requires core.js
 */

var sessions=(function(){
	/*
	 * sessions:Init()
	 */
	function init(){

	}

	/*
	 * sessions:display()
	 */
	function display(){
		var code="<select>",i,sessionTypes;

		//Session select menu
		for(i=0;i<core.get("config").timeList.length;++i){
			code+="<option"+(i==core.get("config").currentSession?" selected ":" ")+"onclick='sessions.switchS("+i+")'>"+(i+1)+".: "+core.get("config").sessionData[i].name;
		}
		code+="<option onclick='sessions.create();'>New</select><select>";

		//Session Event type menu
		sessionTypes=["normal","OH","BLD","FMC","OH BLD","FT"];
		for(i=0;i<sessionTypes.length;++i){
			code+="<option"+(sessions.current().solveType==sessionTypes[i]?" selected ":" ")+"onclick='sessions.current().solveType=\""+sessionTypes[i]+"\";stats.update();'>"+sessionTypes[i];
		}
		code+="</select>";
		layout.write("SESSIONSELECT",code);
	}

	/*
	 * sessions:current()
	 * Gets current session data
	 */
	function current(){
		var data;
		if(data=core.get("config").sessionData.length>0)
			return core.get("config").sessionData[core.get("config").currentSession];
		return {};
	}

	/*
	 * session:create()
	 * creates a new session and switches to it
	 */
	function create(){
		core.get("config").timeList.push([]);
		core.get("config").sessionData.push({phases:1,inspection:15,name:"New Session",solveType:"normal"});//See timer.js, try to load data, do if if else, config
		switchS(core.get("config").timeList.length-1);
		display();
	}

	/*
	 * session:switchS(to)
	 * @param to the session to switch to
	 * switch to Session to
	 */
	function switchS(to){
		core.get("config").currentSession=to;
		//Some things need to do some init actions
		scramble.sessionSwitchInit();
		counter .sessionSwitchInit();
		goals   .sessionSwitchInit();
		stats   .sessionSwitchInit();
		stats   .update();
		sessions.display();
		layout.write("TIME","0.000");
	}

	return {
		init:init,
		display:display,
		current:current,
		switchS:switchS,
		create:create
	}
})();
