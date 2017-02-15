/*
 * algSets.js
 */

var algSets = (function() {
	var sets = [];
	var setprops = [];
	var currentSet = 0;
	var predefined = {
		//"AlgSetName":"AlgDBSetName,hasAlgDb Algnames CompressedAlgs"
		//Compression ensures a proper formatted alg after uncompression, and saves spaces and direction characters
		//These are just for normal AlgSets, you can always load sets from algdb (at least you will be able to later on)
		"PLL": "PLL,1 Aa,Ab,E,F,Ga,Gb,Gc,Gd,H,Ja,Jb,Na,Nb,Ra,Rb,T,Ua,Ub,V,Y,Z YBIBSAJBSCZ,YCSAIBSAJAZ,ZAJBQAIBRAIBRAJBQY,BJFAIBJBECJBJAIBIA,BJAIRCIBIAJAJCQ,LOL,CQcBIBJARGeBIA,AIBJQCJAJBIBICR,CKAKCKCKAKC,VJUEVJUIUFWIU,IAIBFAIBJBECJBJ,AIBIAIBFAIBJBECJBKAJB,BIVKAJUBIVKAJU,UKVKUFVJUIUEW,BKAKBEAIBJBFCJ,AIBJBECJBJAIBF,CIAIBJBJBIB,AJAIAIAJBJC,AKBQAJAJAICQBJAS,EAJBJAIBFAIBJBEAF,BJCIAIBJAIAJAJB",
		"OLL": "OLL,1 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57 AINAMCJBEAF,EAIBJFkfAIBJkf',cEIAJBFIEAIBJF,cEIAJBFJEAIBJF,VJWFVGJF,eAICEAGIE,VKUKUFVE,AKBKBEAF,cAIBJBECIBJF,AIBIBEAFAKB,kMAIBIAKBIkM,EAIBJFIEAIBJF,EIAKBJAIBF,BEAIBFAEJF,eBFAVJUIBEA,eBEAIBJFAJBKA,AIBIBEAFKBEAF,eEAIBIdBKBEAF,BKEAIBJGKEA,EIAJBFKBJBEAFIA,cAKBJAIBJAJB,AKCJCJCKA,CQBKARBKB,UEBFVEAF,BEANBFAM,eVJUJVKU,AIBIAKB,EAIBJGVJUIE,eBEAFAKBJFJE,CIBNAJCIAMB,BJEIAJBFA,AINJBIAMB,AIBJBEAF,eAIBJNBEAFM,AKDEAFAKB,BJAJBIAIklJBIY,EAJBJAIBF,AIBIAJBJBEAF,cUFVJUIEJV,cBEAIBJFIA,AJBKAIcAJBJF,BJAJBKAEAIBJF,FJVIUE,EIAJBF,EAIBJF,BJBEAFIA,FVJUIVJUIE,EAIBJAIBJF,ANCECMCFA,BECNCFCMB,eEIAJBIAJBF,BJAJBIFIEA,EAIBJAJBIAIBF,FVJUIVIUJVJUE,AKCJAJBKEAF,EAIBJAFUEBFV,AIBJVZBIAJUY",
		"COLL": "2x2_OLL,1 H,Pi,U,T,L,Antisune,Sune AKBJAIBJAJB,AKCJCJCKA,CQBKARBKB,UEBFVEAF,BEANBFAM,VJUJVKU,AIBIAKB",
		"CPLL": "2x2_PLL,1 J,L,Y AIBFAIBJBECJBJ,YBJAIBJAZIAJDEAJ,EAJBJAIBFAIBJBEAF"
	};

	/*
	 * algSets:Init()
	 */
	function init() {
		algSets.loadPredefinedAlgSet("PLL");
		algSets.loadPredefinedAlgSet("OLL");
		algSets.loadPredefinedAlgSet("COLL");
		algSets.loadPredefinedAlgSet("CPLL");
	}

	/*
	 * algSets:display()
	 */
	function display() {
		var i, outhtml = html.td("<span onclick='algSets.favorite()'>Favorites</span>"),
			outhtml2 = "";

		//Menu
		for (i = 0; i < sets.length; ++i) {
			if (!setprops[i].hidden) {
				outhtml += html.td("<span onclick='algSets.switchCurrentSet(" + i + ");'>" + setprops[i].name + "</span>");
			}
		}
		outhtml += html.td("<span onclick='algSets.addSet();'>+</span>");
		outhtml = html.table("<tr>" + outhtml + "</tr>");

		//Headline
		outhtml += html.el("h2", "<span onclick='algSets.changeSetName()'><u>" + setprops[currentSet].name + "</u></span> <span onclick='algSets.removeSet()'>x</span> <span onclick='algSets.addAlg()'>+</span>");

		//Algs
		for (i = 0; i < sets[currentSet].length; ++i) {
			outhtml2 += html.tr(
				"<span onclick='algSets.changeName(" + i + ")'>" + sets[currentSet][i].name + "</span>",
				"<span onclick='algSets.changeAlg (" + i + ")'>" + sets[currentSet][i].alg + "</span>",
				"Flags",
				"x",
				"<span onclick='algSets.toggleStar(" + i + ");'>" + (sets[currentSet][i].flags.star ? "Unfavorite" : "Favorite") + "</span>",
				"<span onclick='algSets.invert(" + i + ")'>invert</span>",
				//"learn",
				sets[currentSet][i].practiseTimes.length > 0 ? math.format(math.average(sets[currentSet][i].practiseTimes)) + "s" : "DNF",
				"<span onclick='algSets.enterPractiseMode(" + currentSet + "," + i + ")'>practise</span>",
				"<span onclick='algSets.algCubingNet(" + i + ")'>view</span>",
				"help"
			);
		}
		outhtml += html.table(outhtml2);
		outhtml += "<br/><button onclick='algSets.addSet()'>" + transl("Add set") + "</button>";
		outhtml += "     <button onclick='algSets.importSet()'>" + transl("Add set") + " (Import code)</button>"
		outhtml += "<br/><button onclick='algSets.removeSet()'>" + transl("Remove current set") + "</button>";

		layout.write("ALGSETS", outhtml);

		core.set("algSets", sets);
		core.set("algProps", setprops);

		return outhtml;
	}

	/*
	 * algSets:addSet()
	 */
	function addSet() {
		sets.push([]);
		setprops.push({
			name: "New set #" + sets.length,
			hidden: false
		});
		display();
	}

	/*
	 * algSets:removeSet(i)
	 * @param i Int
	 * @TODO remove set of i (lol)
	 */
	function removeSet(i) {
		display();
	}

	/*
	 * algSets:importSet()
	 */
	function importSet() {
		predefined["c"] = prompt();
		loadPredefinedAlgSet("c");
	}

	/*
	 * algSets:loadPredefinedAlgSet(id)
	 * @param id Int ID
	 */
	function loadPredefinedAlgSet(id) {
		var content, name, algNames, algS, i, currentSet;
		content = predefined[id].split(" ");
		name = content[0];
		algNames = content[1].split(",");
		algS = content[2].split(",");
		i, currentSet;

		sets.push([]);
		setprops.push({
			name: name.split(",")[0],
			hidden: false
		});

		currentSet = sets.length - 1;
		for (i = 0; i < algS.length; ++i) {
			sets[currentSet].push({
				name: algNames[i],
				alg: math.decompressAlgorithm(algS[i]),
				flags: {
					star: false
				},
				practiseTimes: []
			});
		}

		display();
	}

	/*
	 * algSets:addAlg()
	 */
	function addAlg() {
		sets[currentSet].push({
			name: prompt("Name"),
			alg: prompt("Alg"),
			flags: {
				star: false
			},
			practiseTimes: []
		});
		display();
	}


	/*
	 * algSets:changeSetName()
	 */
	function changeSetName() {
		setprops[currentSet].name = prompt();
		display();
	}

	/*
	 * algSets:changeName(i)
	 * @param i Int
	 */
	function changeName(i) {
		sets[currentSet][i].name = prompt("", sets[currentSet][i].name);
		display();
	}

	/*
	 * algSets:changeAlg(i)
	 * @param i int
	 */
	function changeAlg(i) {
		sets[currentSet][i].alg = prompt("", sets[currentSet][i].alg);
		display();
	}

	/*
	 * algSets:switchCurrentSet(i)
	 * @param i int
	 */
	function switchCurrentSet(i) {
		currentSet = i;
		display();
	}

	/*
	 * algSets:toggleStar(i)
	 * @param i int
	 */
	function toggleStar(i) {
		sets[currentSet][i].flags.star = !sets[currentSet][i].flags.star;
		display();
	}

	/*
	 * algSets:invert(i)
	 * @param i int
	 */
	function invert(i) {
		sets[currentSet][i].alg = math.invertAlg(sets[currentSet][i].alg);
		display();
	}

	/*
	 * algSets:algCubingNet(i)
	 * @param i int
	 */
	function algCubingNet(i) {
		var alg = sets[currentSet][i].alg;
		layout.write("ALGSETS", '<iframe src="https://alg.cubing.net/?alg=' + alg + '&setup=' + math.invertAlg(alg) + '&view=fullscreen" width="800" height="550"></iframe>'); //77.247.30.42
	}

	/*
	 * algSets:favorite()
	 */
	function favorite() {
		var html = "<span onclick='algSets.display();'>back</span><br/>",
			i, j, favalgs = [];
		for (i = 0; i < sets.length; ++i) {
			for (j = 0; j < sets[i].length; ++j) {
				if (sets[i][j].flags.star)
					favalgs.push(sets[i][j]);
			}
		}

		//The algs are stored in favalgs
		for (i = 0; i < favalgs.length; ++i) {
			html += favalgs[i].name + ": " + favalgs[i].alg + "<br/>";
		}
		layout.write("ALGSETS", html);
	}

	/*
	 * algSets:addTime(where,time)
	 * @param where
	 * @param time Int time in ms
	 */
	function addTime(where, time) {
		sets[where[0]][where[1]].practiseTimes.push({
			zeit: time,
			penalty: 0
		});
	}

	/*
	 * algSets:enterPractiseMode(i,j)
	 * @param i Int
	 * @param j Int
	 */
	function enterPractiseMode(i, j) {
		core.set("timingMode", "alg");
		core.set("algCountingData", [i, j]);
		core.set("algTmpScrambleType", sessions.current().scrambleType);
		scramble.switchScrambler("ALG ");
		Mousetrap.trigger("a c");
		document.getElementById("timingModeRevert").innerHTML = `<span onclick='algSets.leavePractiseMode();'>&nbsp;back</span>`;
	}

	/*
	 * algSets:leavePractiseMode()
	 */
	function leavePractiseMode() {
		core.set("timingMode", "up");
		Mousetrap.trigger("a a");
		document.getElementById("timingModeRevert").innerHTML = "";
		sessions.current().scrambleType = core.get("algTmpScrambleType");
		sessions.switchS(core.get("config").currentSession + 1);
		sessions.switchS(core.get("config").currentSession);
	}

	/*
	 * algSets:practiseUpdateLeft()
	 */
	function practiseUpdateLeft() {
		var times = algSets.sets[core.get("algCountingData")[0]][core.get("algCountingData")[1]].practiseTimes,
			code = html.tr("Id", transl("Time"), "Mo3", "Ao5"),
			i;

		for (i = 0; i < times.length; ++i) {
			//We build a table row containing id, time, current mo3 and current ao5
			code += html.tr(
				(i + 1),
				math.formatPenalty(times[i]),
				i > 1 ? math.format(math.mean([times[i], times[i - 1], times[i - 2]])) : "-",
				i > 3 ? math.format(math.average([times[i], times[i - 1], times[i - 2], times[i - 3], times[i - 4]])) : "-"
			); //.insert(3, " onclick='stats.showBig(" + i + ")'"); //For detailed solve information later on
		}
		code = html.table(code);
		layout.write("TIMELIST", code);
	}

	return {
		init: init,
		display: display,
		addSet: addSet,
		importSet: importSet,
		loadPredefinedAlgSet: loadPredefinedAlgSet,
		addAlg: addAlg,
		removeSet: removeSet,
		changeSetName: changeSetName,
		changeAlg: changeAlg,
		changeName: changeName,
		switchCurrentSet: switchCurrentSet,
		toggleStar: toggleStar,
		invert: invert,
		algCubingNet: algCubingNet,
		favorite: favorite,
		addTime: addTime,
		enterPractiseMode: enterPractiseMode,
		leavePractiseMode: leavePractiseMode,
		sets: sets,
		practiseUpdateLeft: practiseUpdateLeft
	}
})();
