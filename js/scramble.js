/*
 * scramble.js
 */

var scramble=(function(){
	var type,cur_scramble="",scramblerNames=["111","222","333","444","555","666","777","Pyra","Mega","Square1","Skewb"];

	/*
	 * scramble:Init()
	 */
	function init(){
		type="333";
	}

	/*
	 * scramble:sessionSwitchInit()
	 */
	function sessionSwitchInit(){
		//change type
		type=sessions.current().scrambleType;
		neu();
		draw();
	}

	/*
	 * scramble:ret(v)
	 * @param v the value to return
	 * @return v
	 */
	function ret(v){
		return v;
	}

	/*
	 * scramble:draw()
	 * draws the current scramble
	 */
	function draw(){
		layout.write("SCRAMBLE",`<div><span><div style="display:table-cell;vertical-align:middle;height:43px;"> ${cur_scramble} </div></span></div>
			<div>
				<span style='text-align:middle;'>
					<div style="display:table-cell;vertical-align:middle;height:43px;">
						${transl("Length")}<!-- <input type="number" maxlength="3" length="5" value="-1" min="-1" max="4200" step="1"/>-->
					</div>
				</span>
				<span style='float:left;'>
					<table cellspacing="0" cellpadding="0">
						<tr>
							<td class='SCRAMBLERSELECT'><span class='item' onclick="scramble.draw_step_1();">${transl("Select scrambler")}</span></td>
						</tr>
					</table>
				</span>
				<span style='float:right;'>
					<div style="display:table-cell;vertical-align:middle;height:43px;">
						${html.keycode("t l")} &lt; ${transl("Last scramble")}\&nbsp;\&nbsp;${html.keycode("t n")} ${transl("Next scramble")} &gt;
					</div>
				</span>
			</div>`);
			var code,i;
			code="";
			for(i=0;i<scramblerNames.length;++i)
				code+="<div class='option' onclick='scramble.switchScrambler(\""+scramblerNames[i]+"\");'>"+scramblerNames[i]+"</div>";
			document.getElementById("dropdown-wca").innerHTML=code;
	}

	var tmp=[];
	var types=["Pyramid","Cube"    ,"Pentahedron","Octahedron","Dodecahedron","Other"];
	var axis= [[4,6]    ,[3,4,6,12],[5]          ,[8]         ,[12,20]       ,[0]];
	var layers=[
		[ //Pyramid
			[2,3,4],[2,3,4,5]
		],
		[ //Cube
			["Square-1","Square-2"],["Skewb"],[2,3,4,5,6,7],["Helicopter","Curvy copter"]
		],
		[ //Pentahedron
			[0]
		],
		[ //Octahedron
			[3]
		],
		[ //Dodecahedron
			[2,3,4,5,7,9,11],[0]
		],
		[ //Other
			[0]
		]
	];
	var scrambler=[ //Innerste arrays haben erst Titel, dann scramblerliste, nur wenn length==1, dann ist erster eintrag Name und scrambler gleichzeitig
		[ //Pyramid
			[ //4 axis
				["Pyraminx","WCA","Random State"],
				["Master Pyraminx"],
				["Professor Pyraminx"]
			],
			[ //6 axis
				["Pyramorphix","WCA 2x2","Random moves"],
				["Mastermorphix","Random moves with center orientation","Random moves without center orientation"],
				["Megamorphix"],
				["Ultramorphix"]
			]
		],
		[ //Cube
			[ //3 axis
				["Square-1","Random moves","No Shapeshift","EP only"],
				["Square-2"]
			],
			[ //4 axis
				["Skewb","WCA","Random moves","Sledge scrambler","CO only"]
			],
			[ //6 axis
				["2x2","WCA","Random moves","&lt;R,U&gt;","&lt;R2 U&gt;","Short","BLD","BLD Random orientation moves","Transparent"],
				["3x3","WCA","Random moves","&lt;R,U&gt;","&lt;R,U,F&gt;","&lt;R,U,L&gt;","Short","BLD","BLD Random orientation moves","Transparent","Center orientation","Half center orientation"],
				["4x4","WCA","Random moves","&lt;R,r,U,u&gt;","Edges only","Short","BLD","BLD Random orientation moves","Transparent","Supercube"],
				["5x5","WCA","Random moves","&lt;R,r,U,u&gt;","Edges only","Short","BLD","BLD Random orientation moves","Center orientation"],
				["6x6","WCA","Random moves","Edges only","Short","BLD","BLD Random orientation moves","Supercube"],
				["7x7","WCA","Random moves","Edges only","Short","BLD","BLD Random orientation moves","Center orientation"]
			],
			[ //12 axis
				["Helicopter","Jumbled","no jumbling"],
				["Curvy copter","Jumbled","no jumbling"]
			]
		],
		[[["DNF"]]], //Pentahedron
		[[["Octahedron","FTO","CTO"]]], //Octahedron
		[ //Dodecahedron
			[ //12 axis
				["Kilominx"],
				["Megaminx"],
				["Master Kilominx"],
				["Gigaminx"],
				["Teraminx"],
				["Petaminx"],
				["Examinx"]
			],
			[ //20 axis
				["DNF"]
			]
		],
		[[["DNF"]]] //Other
	];
	//Convert index of array to scrambler type id
	var scramblerTypes=[
		[ //Pyramid
			[ //4 axis
				["Pyraminx","Pyra","Pyra"],
				["Master Pyraminx"],
				["Professor Pyraminx"]
			],
			[ //6 axis
				["Pyramorphix","222","222"],
				["Mastermorphix","333","333"],
				["Megamorphix"],
				["Ultramorphix"]
			]
		],
		[ //Cube
			[ //3 axis
				["Square-1","Square1","No Shapeshift","EP only"],
				["Square-2"]
			],
			[ //4 axis
				["Skewb","Skewb","Skewb","SkewbSledge","SkewbCO"]
			],
			[ //6 axis
				["2x2","222","222","222RU","222R2U","222sh","BLD","BLD Random orientation moves","Transparent"],
				["3x3","333","333","333RU","333RUF","333RUL","333sh","BLD","BLD Random orientation moves","Transparent","Center orientation","Half center orientation"],
				["4x4","444","444","&lt;R,r,U,u&gt;","Edges only","444sh","BLD","BLD Random orientation moves","Transparent","Supercube"],
				["5x5","555","555","&lt;R,r,U,u&gt;","Edges only","555sh","BLD","BLD Random orientation moves","Center orientation"],
				["6x6","666","666","Edges only","666sh","BLD","BLD Random orientation moves","Supercube"],
				["7x7","777","777","Edges only","777sh","BLD","BLD Random orientation moves","Center orientation"]
			],
			[ //12 axis
				["Helicopter","Jumbled","no jumbling"],
				["Curvy copter","Jumbled","no jumbling"]
			]
		],
		[[["DNF"]]], //Pentahedron
		[[["Octahedron","FTO","CTO"]]], //Octahedron
		[ //Dodecahedron
			[ //12 axis
				["Kilominx"],
				["Mega"],
				["Master Kilominx"],
				["Giga"],
				["Tera"],
				["Peta"],
				["Exa"]
			],
			[ //20 axis
				["DNF"]
			]
		],
		[[["DNF"]]] //Other
	];

	function draw_step_1(){
		var code="Shape:<select>",i;
		for(i=0;i<types.length;++i)
			code+="<option onclick='scramble.draw_step_2("+i+")'>"+types[i];
		code+="</select>";
		layout.write("SCRAMBLERSELECT",code);
	}

	function draw_step_2(j){
		var types=axis[j];

		var code="Axis:<select>",i;
		for(i=0;i<types.length;++i)
			code+="<option onclick='scramble.draw_step_3("+j+","+i+")'>"+types[i];
		code+="</select>";
		layout.write("SCRAMBLERSELECT",code);
	}

	function draw_step_3(i,j){
		var types=layers[i][j],subelementLength=0;

		var code=[],k;
		for(k=0;k<types.length;++k){
			code.push("<option onclick='scramble.draw_step_4("+i+","+j+","+k+")'>"+types[k]);
			subelementLength+=scrambler[i][j][k].length;
		}

		//Display all at once if less that 20 entries would be displayed, to save one click
		if(subelementLength<20){
			code=[];
			for(k=0;k<types.length;++k){
				code.push("<optgroup label='"+scrambler[i][j][k][0]+"'/>");
				for(l=0;l<scrambler[i][j][k].length;++l)
					code.push("<option onclick='scramble.draw_step_5("+i+","+j+","+k+","+l+")'>"+scrambler[i][j][k][l]);
			}
		}
		code="Layers:<select>"+code.join("")+"</select>";
		layout.write("SCRAMBLERSELECT",code);
	}

	function draw_step_4(i,j,k){
		var types=scrambler[i][j][k];

		var code=[],k;
		code.push("<optgroup label='"+types[0]+"'>");
		for(l=(types.length==1?0:1);l<types.length;++l)
			code.push("<option onclick='scramble.draw_step_5("+i+","+j+","+k+","+l+")'>"+types[l]);
		code="Scrambler:<select>"+code.join("")+"</optgroup></select>";

		if(scrambler.length==1)
			code=scrambler[0];
		layout.write("SCRAMBLERSELECT",code);
	}

	function draw_step_5(i,j,k,l){
		layout.write("SCRAMBLERSELECT",scrambler[i][j][k][l]+"<span onclick='scramble.draw_step_1()'>Select scrambler</span>");
		type=scramblerTypes[i][j][k][l];
		neu();
		draw();
	}

	/*
	 * scramble:new()
	 * returns a new scramble of type type
	 */
	function neu(){
		//Generating new scrambles has changed from V4.2.0: Previously, all scrambles were
		//generated, the fitting one was chosen and all others were thrown away. Now, only
		//the necceccary ones are generated, which is much faster and efficient => faster.

		var cubicSuffix=["","'","2"],
			pyraSuffix=["","'"],
			noSuffix=[""];		//Currently unused. Do not delete.

		var moves={
			//Moves are prefixed with C for cubic, P for Pyramid, O for Octahedron, D for Dodecatedron and X for other
			"C1":["x","y","z"],
			"C2":["R","U","F"],
			"C3":["R","U","F","D","B","L"],
			"C4":["R","U","F","D","B","L","r","u","f"],
			"C5":["R","U","F","D","B","L","r","u","f","d","b","l"],
			"C6":["R","U","F","D","B","L","r","u","f","d","b","l","3r","3u","3f"],
			"C7":["R","U","F","D","B","L","r","u","f","d","b","l","3r","3u","3f","3d","3b","3l"],
			"D0":["y","y'","y2","y2'"],
			"D3":["R","D"],
			"D5":["R","D","r","d"],
			"D7":["R","D","r","d","3r","3d"],
			"D9:":["R","D","r","d","3r","3d","4r","4d"],
			"D11":["R","D","r","d","3r","3d","4r","4d","5r","5d"],
			"P2":["R","U","L","B"],

			//Functional groups of moves
			"RU":["R","U"],
			"RUF":["R","U","F"],
			"RUL":["R","U","L"],

			//Special groups of moves
			"SP_SKEWB_CO":["x","x'","z","z2","z'","x2","R' F R F' R' F R F'"],
			"SP_SKEWB_SLEDGE":["x","x'","z","z'","z2","x2","y","y'","y2","Sledge"]
		};

		var typeToDefinitionsMapping={
			//WCA Puzzles + 1x1x1
			"111":[scramble,[moves.C1,cubicSuffix,5]],
			"222":[scramble,[moves.C2,cubicSuffix,11]],
			"333":[scramble,[moves.C3,cubicSuffix,22]],
			"444":[scramble,[moves.C4,cubicSuffix,50]],
			"555":[scramble,[moves.C5,cubicSuffix,80]],
			"666":[scramble,[moves.C6,cubicSuffix,110]],
			"777":[scramble,[moves.C7,cubicSuffix,140]],
			"Pyra":[scramble,[moves.P2,pyraSuffix,11]],
			"Skewb":[scramble,[moves.P2,pyraSuffix,11]],//Skewb is cubic but turns like a pyra
			"Square1":[ret,["Not available"]],
			"Mega":[scrambleMega,[moves.D3,["U","U'"],10,5]],

			//Short scramblers
			"111sh":[scramble,[moves.C1,cubicSuffix,3]],
			"222sh":[scramble,[moves.C2,cubicSuffix,7]],
			"333sh":[scramble,[moves.C3,cubicSuffix,15]],
			"444sh":[scramble,[moves.C4,cubicSuffix,30]],
			"555sh":[scramble,[moves.C5,cubicSuffix,50]],
			"666sh":[scramble,[moves.C6,cubicSuffix,80]],
			"777sh":[scramble,[moves.C7,cubicSuffix,110]],

			//Minxes
			"Giga":[scrambleMega,[moves.D5,moves.D0,20,5]],
			"Tera":[scrambleMega,[moves.D7,moves.D0,20,10]],
			"Peta":[scrambleMega,[moves.D9,moves.D0,20,15]],
			"Exa":[scrambleMega,[moves.D11,moves.D0,20,20]],

			//Subsets
			"222RU":[scramble,[moves.RU,cubicSuffix,10]],
			"333RU":[scramble,[moves.RU,cubicSuffix,21]],
			"333RUF":[scramble,[moves.RUF,cubicSuffix,21]],
			"333RUL":[scramble,[moves.RUL,cubicSuffix,21]],

			//Special
			"SkewbSledge":[scramble,[moves.SP_SKEWB_SLEDGE,noSuffix,11]],
			"SkewbCO":[scramble,[moves.SP_SKEWB_CO,noSuffix,11]]
		};

		var definition=typeToDefinitionsMapping[type]||"333";

		//Relays: Have type in form of "Relay Scrambler1,Scrambler2,...,ScramblerN"
		if(type.split(" ")[0]=="Relay"){
			var relayScramble=[],i,type2=type;
			for(i=0;i<type2.split(" ")[1].split(",").length;++i){
				type=type2.split(" ")[1].split(",")[i];
				//We can only compute one scramble at once with neu() , so call it
				//There can't be infinite recursion as long as no scrambler starts
				//with  "Relay " ,  as we only call ourselves if that is the  case
				relayScramble.push(neu());
			}
			type=type2;
			definition=[ret,[relayScramble.join("<br/>")]];
		}

		cur_scramble=definition[0].apply(null,definition[1]);

		//Update session scrambler select
		sessions.display();
		sessions.current().scramblerType=type;

		return cur_scramble;

		//return edgescramble("r b2",["b2 r'","b2 U2 r U2 r U2 r U2 r"],["u"],30);
	}

	/*
 	 * scramble:rndEl(x)
	 * @param x Array[Int]
	 * @return Random element of x
 	*/

	function rndEl(x) {
		return x[~~(Math.random()*x.length)];
	}

	/*
	 * scramble:rn(n)
	 * @return random number
	 */

	function rn(n) {
		return ~~(Math.random()*n);
	}

	/*
	 * scramble:scramble(turns,suffixes,length)
	 * @param turns
	 * @param suffixes
	 * @param length
	 * @return scramble
	 */
	function scramble(turns,suffixes,length){
		var i,j,moves=[],scrambleMoves=[];

		//Check
		if(turns.length<2)return;
		if(suffixes.length<1)return;

		//Generate list of all permutations of turns and suffixes
		for(i=0;i<turns.length;++i)
			for(j=0;j<suffixes.length;++j)
				moves.push(""+turns[i]+suffixes[j]);


		while(scrambleMoves.length<length){
			scrambleMoves.push(rndEl(moves));
			//Don't turn the same face twice
			//This means, that it theoretically can have infinite running time :(
			//@TODO know opposite faces to avoid R L R', base it on suffixes
			if(scrambleMoves.length>1&&scrambleMoves[scrambleMoves.length-1][0]==scrambleMoves[scrambleMoves.length-2][0])
				scrambleMoves.pop();
		}
		return scrambleMoves.join(" ");
	}

	/*
	 * scramble:scrambleMega(turns,rotations,movesPerRow,rows)
	 * @param turns Array[String]
	 * @param rotations Array[String]
	 * @param movesPerRow Int
	 * @param rows Int
	 * @param Scramble for Megaminx with given Moves and size
	 */
	function scrambleMega(turns,rotations,movesPerRow,rows){
		var i,j,alg="",turnsIndex=0;
		for(i=0;i<rows;++i){
			for(j=0;j<movesPerRow;++j){
				alg+=turns[turnsIndex++]+rndEl(["++","--"])+" ";
				if(turnsIndex>turns.length-1)
					turnsIndex=0;
			}
			alg+=rndEl(rotations)+"<br>";
			turnsIndex=rn(turns.length);
		}
		return alg;
	}

	/*
	 * scramble:edgescramble(start,end,moves,len
	 * @param start String
	 * @param end Array[String]
	 * @param moves Array[String]
	 * @param length Int
	 */
	function edgescramble(start,end,moves,len){
		var u,d,ud,movemis,triggers,trigger,i,done,v,x,j,layer,turn,cubesuff;

		cubesuff=["","2","'"];
		u=0,d=0,movemis=[];
		triggers=[["R","R'"],["R'","R"],["L","L'"],["L'","L"],["F'","F"],["F","F'"],["B","B'"],["B'","B"]];
		ud=["U","D"];
		scramble=start;
		for(i=0;i<moves.length;i++)
			movemis[i]=0;

		for(i=0;i<len;i++){
			done=false;
			while(!done){
				v="";
				for(j=0;j<moves.length;j++){
					x=rn(4);
					movemis[j]+=x;
					if(x!=0){
						done=true;
						v+=" "+moves[j]+cubesuff[x-1];
					}
				}
			}
			trigger=rn(8);
			layer=rn(2);
			turn=rn(3);
			scramble+=v+" "+triggers[trigger][0]+" "+ud[layer]+cubesuff[turn]+" "+triggers[trigger][1];
			if(layer==0)
				u+=turn+1;
			if(layer==1)
				d+=turn+1;
		}

		for(i=0;i<moves.length;i++){
			x=4-(movemis[i]%4);
			if(x<4)
				scramble+=" "+moves[i]+cubesuff[x-1];
		}
		u=4-(u%4);d=4-(d%4);
		if(u<4)
			scramble+=" U"+cubesuff[u-1];
		if(d<4)
			scramble+=" D"+cubesuff[d-1];
		scramble+=" "+rndEl(end);
		return scramble;
	}

	/*
	 * scramble:get_scramble()
	 * @return the current scramble
	 */
	function get_scramble(){
		return cur_scramble;
	}

	/*
	 * scramble:get_type()
	 * @return the current scrambler type
	 */
	function get_type(){
		return type;
	}

	/*
	 * scramble:switchScrambler(to)
	 * @param to String scramblertype
	 */
	function switchScrambler(to){
		type=to;
		sessions.current().scrambleType=type;
		neu();
		draw();
	}

	return {
		init:init,
		sessionSwitchInit:sessionSwitchInit,
		scramble:scramble,
		switchScrambler:switchScrambler,
		neu:neu,
		draw:draw,
		draw_step_1:draw_step_1,
		draw_step_2:draw_step_2,
		draw_step_3:draw_step_3,
		draw_step_4:draw_step_4,
		draw_step_5:draw_step_5,
		getScramble:get_scramble,
		get_type:get_type
	}
})();
