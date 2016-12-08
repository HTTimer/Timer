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
						Length<!-- <input type="number" maxlength="3" length="5" value="-1" min="-1" max="4200" step="1"/>-->
					</div>
				</span>
				<span style='float:left;'>
					<table cellspacing="0" cellpadding="0">
						<tr>
							<td><span class='item' onclick="html.toggle('dropdown-wca')">Select scrambler</span></td>
							<!--<td><span class='item' onclick="html.toggle('dropdown-333')">3x3</span></td>-->
						</tr>
					</table>
				</span>
				<span style='float:right;'>
					<div style="display:table-cell;vertical-align:middle;height:43px;">
						${html.keycode("t l")} &lt; Last scramble\&nbsp;\&nbsp;${html.keycode("t n")} Next scramble &gt;
					</div>
				</span>
			</div>`);
			var code,i;
			code="";
			for(i=0;i<scramblerNames.length;++i)
				code+="<div class='option' onclick='scramble.switchScrambler(\""+scramblerNames[i]+"\");'>"+scramblerNames[i]+"</div>";
			document.getElementById("dropdown-wca").innerHTML=code;
	}

	/*
	 * scramble:new()
	 * returns a new scramble of type type
	 */
	function neu(){
		//Generating new scrambles has changed from V4.2.0: Previously, all scrambles were
		//generated, the fitting one was chosen and all others were thrown away. Now, only
		//the necceccary ones are generated.

		var cubicSuffix=["","'","2"],
			pyraSuffix=["","'"],
			minxSuffix=["++","--"];		//Currently unused.

		var typeToDefinitionsMapping={
			"111":[scramble,[["x","y","z"],cubicSuffix,5]],
			"222":[scramble,[["R","U","F"],cubicSuffix,11]],
			"333":[scramble,[["R","U","F","D","B","L"],cubicSuffix,22]],
			"444":[scramble,[["R","U","F","D","B","L","r","u","f"],cubicSuffix,50]],
			"555":[scramble,[["R","U","F","D","B","L","r","u","f","d","b","l"],cubicSuffix,80]],
			"666":[scramble,[["R","U","F","D","B","L","r","u","f","d","b","l","3r","3u","3f"],cubicSuffix,110]],
			"777":[scramble,[["R","U","F","D","B","L","r","u","f","d","b","l","3r","3u","3f","3d","3b","3l"],cubicSuffix,140]],
			"Pyra":[scramble,[["R","U","L","B"],pyraSuffix,11]],
			"Skewb":[scramble,[["R","U","L","B"],pyraSuffix,11]],//Skewb is cubic but turns like a pyra
			"Square1":[ret,["Not available"]],
			"Mega":[ret,["Not available"]]
		};

		var definition=typeToDefinitionsMapping[type]||"333";

		//Relays: Have type in form of "Relay Scrambler1,Scrambler2,Scrambler3,...,ScramblerN"
		if(type.split(" ")[0]=="Relay"){
			var relayScramble=[],i,type2=type;
			for(i=0;i<type2.split(" ")[1].split(",").length;++i){
				type=type2.split(" ")[1].split(",")[i];
				//We can only compute one scramble at once with neu, so call it
				//There can't be infinite recursion as long as no scrambler starts
				//with "Relay ", as we only call ourselves, if that is the case
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
	 * @returns Random element of x
 	*/

	function rndEl(x) {
		return x[~~(Math.random()*x.length)];
	}

	/*
	 * scramble:rn(n)
	 * @returns random number
	 */

	function rn(n) {
		return ~~(Math.random()*n);
	}

	/*
	 * scramble:scramble(turns,suffixes,length)
	 * @param turns
	 * @param suffixes
	 * @param length
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
			//@TODO know opposite faces to avoid R L R'
			if(scrambleMoves.length>1&&scrambleMoves[scrambleMoves.length-1][0]==scrambleMoves[scrambleMoves.length-2][0])
				scrambleMoves.pop();
		}
		return scrambleMoves.join(" ");
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
		getScramble:get_scramble,
		get_type:get_type
	}
})();
