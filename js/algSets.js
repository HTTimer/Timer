/*
 * algSets.js
 */

var algSets=(function(){
	var sets=[];
	var setprops=[];
	var currentSet=0;
	var predefined={
		//"AlgSetName":"AlgDBSetName,hasAlgDb Algnames CompressedAlgs"
		//We compress algs to save around 60%, which would be around 200 bytes just for PLL! Compress/Decompress functions are 1Kb total, so worth it for 5+ predefined AlgSets!
		"PLL":"PLL,1 Aa,Ab,E,F,Ga,Gb,Gc,Gd,H,Ja,Jb,Na,Nb,Ra,Rb,T,Ua,Ub,V,Y,Z YBIBSAJBSC,YCSAIBSAJAZ,ZAJBQAIBRAIBRAJBQY,BJFAIBJBECJBJAIBIA,BJAIRCIBIAJAJCQ,CQcBIBJARGeBIA,AIBJQCJAJBIBICR,CKAKCKCKAKC,VJUEVJUIUFWIU,IAIBFAIBJBECJBJ,AIBIAIBFAIBJBECJBKAJB,BIVKAJUBIVKAJU,UKVKUFVJUIUEW,BKAKBEAIBJBFCJ,AIBJBECJBJAIBF,CIAIBJBJBIB,AJAIAIAJBJC,AKBQAJAJAICQBJAS,EAJBJAIBFAIBJBEAF,BJCIAIBJAIAJAJB"
	};

	/*
	 * algSets:Init()
	 */
	function init(){
		addSet();
	}

	/*
	 * algSets:display()
	 */
	function display(){
		var i,outhtml=html.td("Favorites"),outhtml2="";

		//Menu
		for(i=0;i<sets.length;++i){
			if(!setprops[i].hidden){
				outhtml+=html.td("<span onclick='algSets.switchCurrentSet("+i+");'>"+setprops[i].name+"</span>");
			}
		}
		outhtml+=html.td("<span onclick='algSets.addSet();'>+</span>");
		outhtml=html.table("<tr>"+outhtml+"</tr>");

		//Headline
		outhtml+=html.el("h2","<span onclick='algSets.changeSetName()'><u>"+setprops[currentSet].name+"</u></span> <span onclick='algSets.removeSet()'>x</span> <span onclick='algSets.addAlg()'>+</span>");

		//Algs
		for(i=0;i<sets[currentSet].length;++i){
			outhtml2+=html.tr(
				"<span onclick='algSets.changeName("+i+")'>"+sets[currentSet][i].name+"</span>",
				"<span onclick='algSets.changeAlg ("+i+")'>"+sets[currentSet][i].alg +"</span>",
				"Flags",
				"x",
				"<span onclick='algSets.toggleStar("+i+");'>"+(sets[currentSet][i].flags.star?"star":"no star")+"</span>",
				"modify",
				"learn",
				"practise",
				"view",
				"help"
			);
		}
		outhtml+=html.table(outhtml2);
		outhtml+="<br/><button onclick='algSets.addSet()'>Add set</button>";
		outhtml+="     <button onclick='algSets.addSet()'>Add set from Algdb.net</button>"
		outhtml+="<br/><button onclick='algSets.removeSet()'>Remove current set</button>";

		layout.write("ALGSETS",outhtml);

		core.set("algSets",sets);
		core.set("algProps",setprops);

		return outhtml;
	}

	/*
	 * algSets:addSet()
	 */
	function addSet(){
		sets.push([]);
		setprops.push({name:"New set #"+sets.length,hidden:false});
		display();
	}

	/*
	 * algSets:removeSet(i)
	 * @param i Int
	 * @TODO remove set of i
	 */
	function removeSet(i){
			display();
	}

	/*
	 * algSets:addAlg()
	 */
	function addAlg(){
		sets[currentSet].push({name:"Aa",alg:"x R' U R' D2 R U' R' D2 R2 x'",flags:{star:false}});
		display();
	}


	/*
	 * algSets:changeSetName()
	 */
	function changeSetName(){
		setprops[currentSet].name=prompt();
		display();
	}

	/*
	 * algSets:changeName(i)
	 * @param i Int
	 */
	function changeName(i){
		sets[currentSet][i].name=prompt("",sets[currentSet][i].name);
		display();
	}

	/*
	 * algSets:changeAlg(i)
	 * @param i int
	 */
	function changeAlg(i){
		sets[currentSet][i].alg=prompt("",sets[currentSet][i].alg);
		display();
	}

	/*
	 * algSets:switchCurrentSet(i)
	 * @param i int
	 */
	function switchCurrentSet(i){
		currentSet=i;
		display();
	}

	/*
	 * algSets:toggleStar(i)
	 * @param i int
	 */
	function toggleStar(i){
		sets[currentSet][i].flags.star=!sets[currentSet][i].flags.star;
		display();
	}

	return {
		init:init,
		display:display,
		addSet:addSet,
		addAlg:addAlg,
		removeSet:removeSet,
		changeSetName:changeSetName,
		changeAlg:changeAlg,
		changeName:changeName,
		switchCurrentSet:switchCurrentSet,
		toggleStar:toggleStar
	}
})();
