/*
 * counter.js
 * Makes the time count when pressing space
 */

var counter=(function(){
	var running,currentTime,currentStage,phases,inspection,currentInspection,startTime,endTime;

	/*
	 * counter:Init()
	 */
	function init(){
		running=core.get("running");
		currentTime=0;
		currentInspection=0;
		currentStage=0; //CurrentStage shows what stage the time is in.
										//0: Ready, 1: Inspection started, 2: Running phase n, +Infinity: stopped
		phases=sessions.current().phases;
		inspection=sessions.current().inspection;
		startTime=0;
		endTime=0;
	}

	function sessionSwitchInit(){
		init();
	}

	/*
	 * counter:startStop()
	 * gets called every time space is pressed
	 */
	function startStop(){
		var fake;

		switch(++currentStage){
			case +Infinity:
			case 0:
				endTime=+new Date();
				core.set("running",false);

				//Determine whether the solve was fake or not
				switch(scramble.get_type()){
					case "555":case "444":case "Mega":case "Square1":
						fake=(endTime-startTime)<5e3; //(endTime-startTime) is in milliseconds
						break;
					case "666":case "777":
						fake=(endTime-startTime)<10e3;
						break;
					case "Pyra":case "Skewb":
						fake=(endTime-startTime)<4e2;
						break;
					default:
						fake=(endTime-startTime)<3e2;
				}

				//Add solve to current Session
				core.get("config").timeList[core.get("config").currentSession].push({ //We won't land here before a solve was done, as currentStage is initialized
																																							//as 0 and we increment it by 1 before executing this case
					startTime:startTime+1,
					endTime:endTime,
					currentInspection:(startTime-currentInspection),
					zeit:(endTime-startTime),
					penalty:((startTime-currentInspection)>14999?2000:0),
					flags:{fake:fake,uwr:false,overinspect:(startTime-currentInspection)>14999},
					scramble:scramble.getScramble(),
					scrambletype:scramble.get_type()
				});

				//Timer has been stopped, update stuff
				scramble.neu();
				scramble.draw();
				stats.update();
				layout.write("TIME",math.format(endTime-startTime));
				stats.showBig(core.get("config").timeList[core.get("config").currentSession].length-1);

				//Reset internal timer
				startTime=0;
				endTime=0;
				currentInspection=0;
				currentStage=0;
				break;
			case 1:
				//Start inspection
				currentInspection=+new Date();
				layout.write("TIME","Inspect");
				layout.write("FLAGS","");
				break;
			default:
				//Running
				core.set("running",true);
				//Timer started? Store start time
				if(startTime===0)startTime=+new Date()-1;//-1 because there needs to be at least
														 										 //one millisecond before update gets called
				//Timer stopped? Store end time
				if(currentStage>phases){
					currentStage=+Infinity;
				}
				updateTime();
				break;
		}
	}

	/*
	 * counter:updateTime
	 * Updates the time display
	 */
	function updateTime(){
		if(core.get("running")){
			if(core.get("timingMode")=="up")
				layout.write("TIME",math.format(+new Date()-startTime));
			else if(core.get("timingMode")=="down")
				layout.write("TIME",math.format(36e5-(+new Date()-startTime)));
			else
				layout.write("TIME","not timing");
			setTimeout(updateTime,30);
		}
	}

	return {
		init:init,
		sessionSwitchInit:sessionSwitchInit,
		startStop:startStop
	}
})();
