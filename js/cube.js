var cube = (function() {

	/*
	 * cube:init()
	 */
	function init() {

	}

	var companies = [
		"Cubing classroom", "Cyclone Boys", "DaYan", "Eastsheen", "FanXin",
		"FangShi", "Gan's puzzles", "Lanlan", "LimCube", "MoYu", "QJ", "QiYi",
		"Rubik's", "ShengShou", "TheValk", "V-Cube", "WitEden", "YJ", "YuXin",
		"Generic cube types"
	];
	var models = [
		[
			"MF2",
			"MF2S",
			"MF3",
			"MF3R",
			"MF3RS",
			"MF4S",
			"MF5S",
			"MF7S"
		],
		[
			"Pyraminx v1",
			"Pyraminx v2"
		],
		[
			"2x2 old plastic",
			"2x2 new plastic",
			"Taian",
			"GuHong V1",
			"GuHong V2",
			"LingYun",
			"LunHui",
			"ZhanChi",
			"PanShi",
			"Pyraminx V1",
			"Pyraminx V2",
			"Skewb",
			"Megaminx V1",
			"Megaminx V1 ridged",
			"Megaminx V2",
			"Megaminx V2 ridged",
			"Bagua cube"
		],
		[
			"2x2",
			"3x3"
		],
		[
			"Pyraminx",
			"Skewb"
		],
		[
			"ShuanRen V1",
			"ShuanRen V2",
			"JieYun",
			"50mm 2x2",
			"55mm 2x2"
		],
		[
			"Gans 356",
			"Gans 357",
			"GANAir",
			"GanAir UM"
		],
		[
			"2x2"
		],
		[
			"Dreidel"
		],
		[
			"LingPo",
			"TangPo",
			"WeiPo",
			"AoLong V1",
			"AoLong V2",
			"WeiLong V1",
			"WeiLong V2",
			"DianMa",
			"AoSu",
			"WeiSu",
			"AoChuang",
			"WeiChuang",
			"BoChuang",
			"AoShi",
			"WeiShi",
			"AoFu",
			"Cubic AoFu",
			"WeiLong Square-1",
			"Pyraminx",
			"Magnetic Pyraminx",
			"Skewb",
			"Magnetic Skewb"
		],
		[
			"4x4"
		],
		[
			"Ivy Cube",
			"Magnetic Pyraminx"
		],
		[
			"3x3"
		],
		[
			"10x10x10"
		],
		[
			"Valk 3"
		],
		[
			"2a",
			"2b",
			"3a",
			"3b",
			"4a",
			"4b",
			"5",
			"6a",
			"6b",
			"7",
			"8"
		],
		[
			"WitTwo V1",
			"WitTwo V2",
			"WitFour"
		],
		[
			"YuLong",
			"SuLong",
			"GuanPo",
			"GuanLong"
		],
		[
			"2x2",
			"3x3",
			"4x4",
			"5x5"
		],
		[
			"2x2",
			"3x3",
			"4x4",
			"5x5",
			"6x6",
			"7x7",
			"Pyraminx",
			"Megaminx",
			"Square-1",
			"Skewb",
			"Clock",
			"Magic",
			"other"
		]
	];
	var colors = ["Black", "White", "Stickerless", "Stickerless pink",
		"yellow", "red", "orange", "blue", "brown", "teal", "purple",
		"transparent red", "transparent green", "transparent blue", "transparent",
		"transparent stickerless", "mixed", "other"
	]

	/*
	 * cube:display()
	 * displays an select field for cube types
	 */
	function display() {
		var html = "<select size='" + companies.length + "'>",
			i;
		for (i = 0; i < companies.length; ++i) {
			html += "<option onclick='cube.display2(" + i + ")'>" + companies[i] + "</option>"
		}
		html += "</select>";

		document.getElementsByClassName('CUBESELECT')[0].style.display = "block";
		layout.write("CUBESELECT1", html);
	}

	function display2(i) {
		var html = "<select size='" + companies.length + "'>",
			j;
		for (j = 0; j < models[i].length; ++j) {
			html += "<option onclick='cube.set(" + i + "," + j + ")'>" + models[i][j] + "</option>";
		}
		html += "</select>"
		layout.write("CUBESELECT2", html);
		for (j = 0, html = "<select size='" + companies.length + "'>"; j < colors.length; ++j) {
			html += "<option onclick='cube.set(" + j + ");cube.close();'>" + colors[j] + "</option>";
		}
		html += "</select>"
		layout.write("CUBESELECT3", html);
	}

	/*
	 * cube:getSelected()
	 * returns the value of the cube selected by calling display and filling in
	 * the form
	 */
	function getSelected() {
		return [currentData, companies[currentData[0]] +
			" " + models[currentData[0]][currentData[1]] +
			" " + colors[currentData[2]]
		];
	}

	var currentData = [];

	function set() {
		if (arguments.length == 2)
			return currentData = [arguments[0], arguments[1]];
		currentData.push(arguments[0]);
	}

	function close() {
		document.getElementsByClassName('CUBESELECT')[0].style.display = "none";
		cube_collection.push(getSelected());
		display_collection();
	}

	/*
	 * cube:display_collection()
	 */

	var cube_collection = [];

	function display_collection() {
		var html = "<h2>Cube collection</h2>",
			i;
		for (i = 0; i < cube_collection.length; ++i) {
			html += cube_collection[i][1] + "<br/>";
		}
		html += "<br/><button onclick='cube.display()'>Add cube</button>";
		layout.write("COLLECTION", html);
	}

	return {
		init: init,
		display: display,
		display2: display2,
		getSelected: getSelected,
		set: set,
		close: close,

		display_collection: display_collection
	}
})();
