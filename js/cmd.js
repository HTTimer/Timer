/*
 * cmd.js
 */

var cmd = (function() {
	/*
	 * cmd:Init()
	 */
	function init() {
		document.getElementById("btn_cmd").addEventListener("keyup", function(event) {
			event.preventDefault();
			if (event.keyCode == 13) {
				cmd.smt();
			}
		});
	}

	/*
	 * cmd:smt():
	 * Gets called, when the user submits a query in text-based mode
	 */
	var active = true; //We can submit

	function smt() {
		//Spamschutz
		if (!cmd.active) return false;
		var val = document.getElementById("btn_cmd").value;
		document.getElementById("btn_cmd").value = "";
		cmd.active = false;
		setTimeout("cmd.active=true", 500);

		//Auswertung
		var output = "Command " + val + " not found.";
		if (val == "help")
			output = `Command list:<br>
				about       - about the timer<br>
				clear       - clear temporary data to make the timer faster<br>
				fastbrowser - tell the system that you have a fast browser<br>
				graphic     - switch back to graphic mode<br>
				help        - show this help<br>
				login       - Login to use advanced features<br>
				resetlayout - use when the graphic layout looks messed up<br>
				savedata    - your last hope when everything crashes<br>
				selftest    - perform automated tests<br>
				selffix     - try to fix and optimize internal data<br>
				slowbrowser - tell the system that you have a slow browser<br>
				updateuwr   - try to get the current UWRs from speedsolving wiki`;
		if (val == "graphic") {
			output = "Switching back to graphic mode ...";
			document.getElementById("desktop-text").style.display = "none";
			document.getElementById("desktop-graphic").style.display = "block";
		}
		if (val == "about")
			output = "HTTimer 4.3.0 Alpha Developer";
		if (val == "fastbrowser")
			output = "Not supported.";
		if (val == "slowbrowser")
			output = "Not supported.";
		if (val == "updateuwr")
			output = "Login to use this feature.";
		if (val == "savedata")
			output = "Not supported.";
		if (val == "resetlayout")
			output = "Not supported.";
		if (val == "selftest")
			output = "Login to use this feature.";
		if (val == "selffix")
			output = "Login to use this feature.";
		if (val == "login")
			output = "Wrong username or password.";
		if (val == "clear") {
			output = "Starting to clear";
			if (core.get("timingMode") == "alg")
				algSets.leavePractiseMode();
			core.set("algTmpScrambleType", "");
			output += "<br>Ending clear. Took 1ms.";
		}
		core.set("log", core.get("log") + val);

		document.getElementById("console-output").innerHTML += val + "<br>" + output + "<br><span style='color:#22DD22'>HT4.3.0A&gt;</span> ";
	}

	/*
	 * cmd:switchToText()
	 */
	function switchToText() {
		document.getElementById("desktop-text").style.display = "block";
		document.getElementById("desktop-graphic").style.display = "none";
	}

	return {
		init: init,
		smt: smt,
		active: active,
		switchToText: switchToText
	}
})();
