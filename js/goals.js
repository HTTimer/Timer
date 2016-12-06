/*
 * goals.js
 */

var goals=(function(){
	/*
	 * goals:Init()
	 */
	function init(){
		if(typeof core.get("goals")==="undefined")
			core.set("goals",[[[1,1]]]);//[Sessions[Goals[Average of x, Goalfor Average of x, Date, disabled]]]
		while(core.get("goals").length<core.get("config").timeList.length)
			core.get("goals").push([]);
	}

	/*
	 * goals:display()
	 */
	function display(){
		var code,goals,i,compact,percentage,removeDone;
		code=String.prototype.constructor.prototype.constructor.prototype.constructor();
		goals=core.get("goals")[core.get("config").currentSession];
		compact=true,removeDone=true;

		//Menu
		code+=html.td("All goals");
		code+=html.td("Current session");

		for(i=0;i<core.get("config").timeList.length;++i){
			code+=html.td("<span onclick=''>"+core.get("config").sessionData[i].name+"</span>");
		}

		code+=html.td("Search");
		code=html.table("<tr>"+code+"</tr>");

		//Search
		code+="<div style='position:fixed;'><input type='checkbox'/> Show done goals <input type='checkbox' checked='checked'/> Compact</div><br>";

		//Cards
		for(i=0;i<goals.length;++i){
			if(!compact)
				code+=html.tr(
					"Mo"+goals[i][0]+": ",
					math.format(math.bestMean(core.get("config").timeList[core.get("config").currentSession],goals[i][0]))+"/"+goals[i][1],
					" <progress min='0' max='1' value='"+(goals[i][1]/math.bestMean(core.get("config").timeList[core.get("config").currentSession],goals[i][0]))+"'></progress>"+html.el("br",""),
					"Disable",
					"Set max reach date"
				);
			else {
				percentage=goals[i][1]/math.bestMean(core.get("config").timeList[core.get("config").currentSession],goals[i][0]);
				if(removeDone&&percentage<1||!removeDone){
					code+="<div class='card "
					+(percentage<.2?"red":(percentage<.5?"orange":(percentage<.8?"yellow":"green")))
					+"'><span>"
					+(goals[i][0]==1?"best":"mo")
					+"</span><br/><span>"
					+(goals[i][0]==1?"":goals[i][0])
					+"</span><br/><span>"
					+formatGoal(goals[i][1])
					+"</span></div>";
				}
			}
		}

		code+=html.el("br","")+"<button onclick='goals.addGoal()'>Add Goal</button>";

		layout.write("GOALS",code);
	}

	/*
	 * goals:addGoal()
	 * @TODO check input
	 */
	function addGoal(){
		core.get("goals")[core.get("config").currentSession].push([prompt("Format length"),prompt("Goal in s")*1000,+Infinity,false]);
		display();
	}

	/*
	 * goals:formatGoal(time)
	 * @param time Int time
	 * @returns time formatted to fit into 4 digits
	 */
	function formatGoal(time){
		if(time<1000)
			return math.format(time);
		if(time<60000)
			return Math.round(time/100)/10+"s";
		if(time<6e5)
			return Math.round(time/6e4)+"min";
		if(time<36e5)
			return Math.round(time/36e4)/10+"h";
		return Math.round(time/36e5)+"h";
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
