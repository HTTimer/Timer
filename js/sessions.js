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
		var code="<select style='width:100%;'>",i,sessionTypes,method;

		//Session select menu
		for(i=0;i<core.get("config").timeList.length;++i){
			code+="<option"+(i==core.get("config").currentSession?" selected ":" ")+"onclick='sessions.switchS("+i+")'>"+(i+1)+".: "+core.get("config").sessionData[i].name;
		}
		code+="<option onclick='sessions.create();'>New</select><br/><select style='width:50%;'>";

		//Session Event type menu
		sessionTypes=["2H","OH","OH BLD","BLD","FMC","FT"];
		for(i=0;i<sessionTypes.length;++i){
			code+="<option"+(sessions.current().solveType==sessionTypes[i]?" selected ":" ")+"onclick='sessions.current().solveType=\""+sessionTypes[i]+"\";stats.update();'>"+sessionTypes[i];
		}
		code+="</select>";

		//Method menu
		code+="<select style='width:50%;'>";

		switch(scramble.get_type()){
			case "222":
				method=["LbL","Verasano","CLL","EG","TCLL","Guimond","OFOTA","VOP","SS"];
				break;
			case "333":
				method=["CFOP","LbL","Roux","Petrus","ZZ","Heise","Synder","SSC","Briggs2","Waterman","Tripod","L2L","CFCE","FreeFop","8355","Keyhole","XG","Samsara","Sandwich","TICT","Belt","Salvia","Triangular Franscisco","Hahn","Human Thistlethwaite"];
				break;
			case "444":
				method=["LbL","Yau","Redux","HoYa","Cage","K4","Z4","Sandwich","Js4","Meyer","Stadler"];
				break;
			case "555":case "666":case "777":
				method=["Redux","LbL","Yau5","HoYa","Cage","Meyer"];
				break;
			case "Mega":
				method=["Balint","Beginner","Westlund"];
				break;
			case "Pyra":
				method=["Petrus","Keyhole","WO","Oka","Nutella","LbL","IWO","OFF","Matthew Flay","Half-backbone","Backbone","MN","FP","L4E","V-First"];
				break;
			case "Square1":
				method=["SSS1M","Vandenbergh","Roux","Skwuction","Yoleberry","COEOCPEP"];
				break;
			case "Skewb":
				method=["Sarah","Ranzha","1 Algorithm","Kirjava-Meep","ITC","Skrouxb","Acubist's"];
				break;
			default:
				method="not available for current scrambler";
		}
		if(typeof method=="string")
			code+=method;
		else{
			method.push("other");
			code+="<option>"+transl("Method");
			for(i=0;i<method.length;++i)
				code+="<option"+(sessions.current().method==method[i]?" selected ":" ")+"onclick='sessions.current().method=\""+method[i]+"\";'>"+method[i];
		}
		code+="</select><br/><br/>";
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
		if(arguments.length==0){
			core.get("config").sessionData.push(
				{
					phases:1,
					inspection:15,
					name:transl("New Session"),
					solveType:"normal",
					method:"",
					scrambleType:core.get("optDefaultScrambleTypeForNewSession")
				}
			); //See timer.js, try to load data, do if if else, config
		}else{
			core.get("config").sessionData.push(
				{
					phases:arguments[0],
					inspection:arguments[1],
					name:arguments[2],
					solveType:arguments[3],
					method:arguments[4],
					scrambleType:arguments[5]
				}
			);
		}
		switchS(core.get("config").timeList.length-1);
		display();
	}

	/*
	 * session:switchS(to)
	 * @param to the session to switch to
	 * switch to Session to
	 */
	function switchS(to){
		//Prevent switching to the same session and regenerating the scramble
		if(core.get("config").currentSession==to)return false;

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
