var cube = (function() {

	/*
	 * cube:init()
	 */
	function init() {

	}

	var companies = [
			"Cubing classroom", "Cyclone Boys", "DaYan", "Eastsheen", "FanXin",
			"FangShi", "Gan's puzzles", "Lanlan", "LimCube", "MoYu", "QJ", "QiYi",
			"Rubik's", "ShengShou", "TheValk", "V-Cube", "VeryPuzzle", "WitEden",
			"XMan", "YJ", "YuXin", "Generic types"
		],
		models = [
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
				"FeiChang",
				"FeiWu 3x3x3",
				"FeiXuan",
				"YuanFeng",
				"ZhiYun",
				"FeiTeng",
				"G4",
				"ZhiWu 6x6x6",
				"FeiLong G6",
				"Pyraminx v1",
				"Pyraminx v2"
			],
			[
				"2x2x2 old plastic",
				"2x2x2 new plastic",
				"Taian",
				"GuHong V1",
				"GuHong V2",
				"LingYun V1",
				"LingYun V2",
				"LunHui",
				"ZhanChi",
				"PanShi",
				"Pyraminx V1",
				"Pyraminx V2",
				"Skewb",
				"Master Skewb",
				"Megaminx V1",
				"Megaminx V1 ridged",
				"Megaminx V2",
				"Megaminx V2 ridged",
				"Bagua cube",
				"Tangram",
				"Gem 1-8",
				"Wheels of Whisdom",
				"CTO"
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
				"YingXu",
				"ShiShuan 55mm",
				"ShuanRen V1",
				"ShuanRen V2",
				"JieYun",
				"JieYun 54.6mm",
				"GuanYing",
			],
			[
				"Gans 356",
				"Gans 357",
				"GANAir",
				"GanAir UM"
			],
			[
				"2x2x2",
				"Skewb",
				"Master Skewb",
				"Rex Skewb",
				"Void cube",
				"Edges-only void cube",
				"2x3x3",
				"Rhombic Dodecahedron"
			],
			[
				"Megaminx",
				"Dreidel",
				"Simplified Dreidel"
			],
			[
				"LingPo",
				"TangPo",
				"WeiPo",
				"AoLong V1",
				"AoLong V1 54.5mm",
				"AoLong V2",
				"AoLong V2 Plus",
				"AoLong GT",
				"WeiLong V1",
				"WeiLong V2",
				"WeiLong V2 54.5mm",
				"WeiLong V2 Plus",
				"WeiLong GTS",
				"DianMa",
				"HuaLong",
				"HuanYing",
				"LiYing",
				"AoSu",
				"mini AoSu",
				"WeiSu",
				"MeiYu",
				"AoChuang",
				"WeiChuang GTS",
				"BoChuang",
				"HuaChuang",
				"AoShi",
				"WeiShi",
				"AoFu",
				"Cubic AoFu",
				"WeiLong Square-1",
				"Pyraminx",
				"Magnetic Pyraminx",
				"Skewb",
				"Magnetic Skewb",
				"YAN3",
				"Wheel of time"
			],
			[
				"3x3x3",
				"4x4x4",
				"5x5x5",
				"Skewb",
				"Megaminx",
				"Pyraminx",
				"Pyraminx Crystal",
				"Mastermorphix",
			],
			[
				"Cavs",
				"Warrior",
				"WarriorW",
				"Thunderclap",
				"Thunderbolt",
				"Tornado",
				"Bullfight",
				"Sail",
				"Sail 68mm",
				"Sailing 3x3x3",
				"WuQue",
				"WindCloud",
				"Sailing 4x4x4",
				"SnowLeopard",
				"AoTiger",
				"WuHua",
				"WuJi",
				"QiMing",
				"Skewb v1",
				"QiCheng",
				"Pyraminx v1",
				"Magnetic Pyraminx",
				"Square-1",
				"Ivy Cube"
			],
			[
				"old 2x2x2",
				"new 2x2x2",
				"old 3x3x3",
				"new 3x3x3",
				"4x4x4",
				"5x5x5"
			],
			[
				"2x2 v1",
				"Aurora 2x2x2",
				"Aurora 3x3x3",
				"FangYuan",
				"Legend",
				"Rainbow",
				"Wind",
				"GuiDao",
				"LingLong 3x3x3 46mm",
				"Legend 70mm",
				"4x4x4 v1",
				"4x4x4 v2",
				"4x4x4 v3",
				"4x4x4 v4",
				"4x4x4 v5",
				"Wind 4x4x4",
				"5x5x5 v1",
				"LingLong 5x5x5 57mm",
				"Aurora 5x5x5",
				"Wind 5x5x5",
				"6x6x6",
				"7x7x7",
				"LingLong 7x7x7 69mm",
				"8x8x8",
				"9x9x9",
				"10x10x10",
				"11x11x11",
				"Aurora Pyraminx",
				"old Skewb",
				"Aurora Skewb",
				"Aurora Megaminx",
				"Square-1",
				"Mirror Blocks",
				"Pyramorphix",
				"Master Pyraminx",
				"Kilominx",
				"Megaminx",
				"Master Kilominx",
				"Gigaminx",
				"Teraminx"
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
				"Clover cube",
				"Clover cube plus",
				"Clover Dodecahedron"
			],
			[
				"WitTwo V1",
				"WitTwo V2",
				"WitFour",
				"2x2x6",
				"2x2x5",
				"3x3x7",
				"3x3x6"
			],
			[
				"Galaxy Megaminx flat",
				"Galaxy Megaminx pillowed",
				"Galaxy Megaminx inverse pillowed"
			],
			[
				"GuanPo",
				"YuLong",
				"SuLong",
				"GuanLong",
				"ChiLong",
				"YuSu",
				"YuSu R",
				"GuanSu",
				"YuChuang",
				"GuanFu",
				"GuanLong Square-1",
				"GuanLong Skewb",
				"GuanHu",
				"YuHu",
				"YuFu",
				"YuPo",
				"Void Cube"
			],
			[
				"Golden 2x2x2",
				"Generic YuXin 3x3x3",
				"Blue 4x4x4",
				"Purple 5x5x5",
				"Red 6x6x6",
				"HuangLong 7x7x7",
				"HuangLong 8x8x8",
				"HuangLong 9x9x9",
				"HuangLong 10x10x10",
				"HuangLong 11x11x11",
				"Pillowed 11x11x11",
				"Mirror blocks"
			],
			[
				"2x2x2",
				"3x3x3",
				"4x4x4",
				"5x5x5",
				"6x6x6",
				"7x7x7",
				"Pyraminx",
				"Megaminx",
				"Square-1",
				"Skewb",
				"Clock",
				"Magic",
				"other"
			]
		],
		colors = ["Black", "White", "Stickerless", "Stickerless pink",
			"yellow", "red", "orange", "blue", "brown", "teal", "purple",
			"transparent red", "transparent green", "transparent blue", "transparent",
			"transparent stickerless", "pink", "mixed", "other"
		];

	/*
	 * cube:display()
	 * cube:display2()
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

	/*
	 * cube:set()
	 */
	function set() {
		if (arguments.length == 2)
			return currentData = [arguments[0], arguments[1]];
		currentData.push(arguments[0]);
	}

	/*
	 * cube:close()
	 * closes the window opened to select the puzzle
	 */
	function close() {
		document.getElementsByClassName('CUBESELECT')[0].style.display = "none";
		cube_collection.push(getSelected());
		display_collection();
		sessions.display();
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

		display_collection: display_collection,
		cube_collection: cube_collection
	}
})();
