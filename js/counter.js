/*
 * counter.js
 * Makes the time count when pressing space
 */

var counter = (function() {
	var running, currentTime, currentStage, phases, inspection, currentInspection, startTime, endTime;

	/*
	 * counter:Init()
	 */
	function init() {
		running = core.get("running");
		currentTime = 0;
		currentInspection = 0;
		currentStage = 0; // CurrentStage shows what stage the time is in.
		// 0: Ready, 1: Inspection started, 2: Running phase n, +Infinity: stopped
		phases = sessions.current().phases;
		inspection = sessions.current().inspection;
		startTime = 0;
		endTime = 0;
	}

	/*
	 * counter:sessionSwitchInit()
	 */
	function sessionSwitchInit() {
		// Reinitialize everything when switching sessions
		init();
	}

	/*
	 * counter:startStop()
	 * gets called every time space is pressed
	 */
	function startStop() {
		var fake;

		switch (++currentStage) {
			case +Infinity:
			case 0:
				endTime = +new Date();
				core.set("running", false);

				// Determine whether the solve was fake or not
				// If adding here, sort by number
				switch (scramble.get_type()) {
					case "222":
						fake = (endTime - startTime) < 2e2;
					case "Pyra":
					case "Skewb":
						fake = (endTime - startTime) < 4e2;
						break;
					case "555":
					case "444":
					case "Mega":
					case "Square1":
						fake = (endTime - startTime) < 4e3;
						break;
					case "666":
					case "777":
						fake = (endTime - startTime) < 1e4;
						break;
					default:
						fake = (endTime - startTime) < 3e2;
				}

				// Add solve to algSet practise mode or to current Session
				if (core.get("timingMode") == "alg") {
					algSets.addTime(core.get("algCountingData"), (endTime - startTime));
					algSets.practiseUpdateLeft();
				} else {
					core.get("config").timeList[core.get("config").currentSession].push({
						// We won't land here before a solve was done, as currentStage is initialized
						// as 0 and we increment it by 1 before executing this case
						startTime: startTime + 1,
						endTime: endTime,
						currentInspection: (startTime - currentInspection),
						zeit: (endTime - startTime),
						penalty: ((startTime - currentInspection) > 14999 ? 2000 : 0),
						flags: {
							fake: fake,
							uwr: false,
							overinspect: (startTime - currentInspection) > 14999
						},
						scramble: scramble.getScramble(),
						scrambletype: scramble.get_type(),
						cube: sessions.current().cube,
						solveType: sessions.current().solveType,
						method: sessions.current().method
					});

					// Timer has been stopped, update stuff
					scramble.neu();
					scramble.draw();
					stats.update();
					layout.write("TIME", math.format(endTime - startTime));
					stats.showBig(core.get("config").timeList[core.get("config").currentSession].length - 1);
				}

				// Reset internal timer
				startTime = 0;
				endTime = 0;
				currentInspection = 0;
				currentStage = 0;
				break;
			case 1:
				// Start inspection
				currentInspection = +new Date();
				layout.write("FLAGS", "");
				updateInspect();
				break;
			default:
				// Running
				core.set("running", true);
				// Timer started? Store start time
				if (startTime === 0) startTime = +new Date() - 1;
				// -1 because there needs to be at least
				// one millisecond before update gets called
				// We add that one millisecond again, when we save
				// the startTime in the time object.

				// Timer stopped? Store end time
				if (currentStage > phases) {
					currentStage = +Infinity;
				}
				updateTime();
				break;
		}
	}

	/*
	 * counter:updateTime
	 * Updates the time display
	 */
	function updateTime() {
		if (core.get("running")) {
			if (core.get("timingMode") == "up" || core.get("timingMode") == "alg")
				layout.write("TIME", math.format(+new Date() - startTime));
			else if (core.get("timingMode") == "down")
				layout.write("TIME", math.format(36e5 - (+new Date() - startTime)));
			else
				layout.write("TIME", "not timing");
			setTimeout(updateTime, 30);
		}
	}

	/*
	 * counter:updateInspect
	 * Updates the time display with the inspection time
	 */
	function updateInspect() {
		var a;
		if (!core.get("running")) {
			a = ~~((15 - +new Date() + currentInspection) / -1000);
			layout.write("TIME", "Inspect<br/>" + inspectColor(a) + a + "</span>" + (a > 14 ? (a > 16 ? " DNF" : " +2") : ""));
			setTimeout(updateInspect, 142);
		}
	}

	function inspectColor(a) {
		return core.get("optInspectColor") ? ("<span style='color:" + (a < 8 ? "black" : (a < 12 ? "#ff0" : (a < 15 ? "#f80" : "#f00"))) + "'>") : "<span>";
	}

	return {
		init: init,
		sessionSwitchInit: sessionSwitchInit,
		startStop: startStop
	}
})();
