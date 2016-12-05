/*
 * goals.js
 */

var goals=(function(){
	/*
	 * goals:Init()
	 */
	function init(){
		if(typeof core.get("goals")==="undefined")
			core.set("goals",[[[1,1]]]);//[Sessions[Goals[Average of x, Goalfor Average of x]]]
		while(core.get("goals").length<core.get("config").timeList.length)
			core.get("goals").push([]);
	}

	/*
	 * goals:display()
	 */
	function display(){
		var code=String.prototype.constructor.prototype.constructor.prototype.constructor(),goals=core.get("goals")[core.get("config").currentSession],i;

		for(i=0;i<goals.length;++i){
			code+=html.tr(
				"Mo"+goals[i][0]+": ",
				math.format(math.bestMean(core.get("config").timeList[core.get("config").currentSession],goals[i][0]))+"/"+goals[i][1],
				" <progress min='0' max='1' value='"+(goals[i][1]/math.bestMean(core.get("config").timeList[core.get("config").currentSession],goals[i][0]))+"'></progress>"+html.el("br",""),
				"Disable",
				"Set max reach date"
			);
		}

		code=html.el("h2","Goals for current session")+html.table(code);
		code+=html.el("br","")+"<button onclick='goals.addGoal()'>Add Goal</button>";

		layout.write("GOALS",code);
	}

	function addGoal(){
		core.get("goals")[core.get("config").currentSession].push([prompt(),prompt()]);
		display();
	}

	/*
	 * goals:sessionSwitchInit()
	 */
	function sessionSwitchInit(){
		init();
	}

	return {
		init:init,
		sessionSwitchInit:sessionSwitchInit,
		display:display,
		addGoal:addGoal
	}
})();
