/*
 * timer.js - main timer file for HTTimer
 * Requires algSets.js, core.js, counter.js, error.js, goals.js, layout.js, scramble.js
 */

timer=(function(){
	/*
	 * Timer:Init()
	 *
	 * - Check if all modules have been loaded
	 * - Check Browser
	 * - Try to load data from previous sessions of HT
	 *   - Version check data
	 * - Set global variables
	 * - Write Layout
	 * - Initialize components
	 */
	var moduleList=["algSets","core","counter","error","goals","layout","scramble"];
	var version="4.3.0A";

	function init(){
		var i,config,check;

		//Check if all modules have been loaded
		for(i=0;i<moduleList.length;++i){
			if(!window[moduleList[i]])
				error.error("LoadError");
		}

		//Check browser
		var isIE=/*@cc_on=!@*/false;
		if(isIE){
			//Do something. I suggest downloading Firefox.  ^_^
		}

		//Try to load data from previous sessions
		check=false;
		do{
			if(!localStorage.HTExport||check){
				if(localStorage.HTAutoSave){
					config=JSON.parse(localStorage.HTAutoSave);
				}else{
					config={
						timeList:[[]],
						currentScrambler:"333",
						customScramblerList:[],
						algSets:[],
						goals:[],
						sessionData:[{phases:1,inspection:15,name:"New Session",solveType:"normal"}],
						currentSession:0
					};
				}
			}else{
				config=JSON.parse(localStorage.HTExport);
			}


			if(!config.version&&!check) //There must be a config.version to have an importable data structure,
																	//as only HT 4.3.0A and up are supported. Other versions are usable
																	//using the import function, which is only available in a fully loaded
																	//timer. Older timers did not have timerExport.version or have it false
				check=true;
			else
				check=false;
		}while(check);

		//Set some variables
		//Set variables using core.set (and core.get to get them) are NOT const and will be exported.
		core.set("running",false);
		core.set("importVersion",config.version||version);
		core.set("version",version);
		core.set("language","EN");
		core.set("config",config);
		core.set("timingMode","up"); //May be "up", "down". Everything else means "not timing"

		//Write layout
		if(config.layout){
			layout.setFullLayout(config.layout);
		}else{
			layout.setFullLayout("SCRAMBLE","","SCRAMBLEIMAGE","TIMELIST","TIME|CurrentAo5,CurrentAo12");
		}

		//Initialize components
		counter .init();
		algSets .init();
		goals   .init();
		scramble.init();
		keyboard.init();
		stats   .init();
		cmd     .init();
		options .init();

		//Generate scramble and display it
		scramble.neu();
		scramble.draw();

		sessions.display();
	}

	return {
		init:init
	}
})();
