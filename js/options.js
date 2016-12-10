/*
 * options.js
 */

var options=(function(){
	/*
	 * options:Init()
	 */
	function init(){
		addCategory("Display");
		addCategory("Timer");
		addCategory("Tool");
		addCategory("Scramble");
		addCategory("Statistics");

		addOption(0,"Hide scramble when timing",1,["core.set('optHideScrambleWhenTiming',true)","core.set('optHideScrambleWhenTiming',false)",false]);
		addOption(0,"Show milliseconds",1,["core.set('optUseMilliseconds',true)","core.set('optUseMilliseconds',false)",true]);

		addOption(1,"Use Inspection",1,[",",",",true]);

		addOption(3,"Default scramble type for new Session",0,"");

		core.set("optUseMilliseconds",true);
		core.set("optHideScrambleWhenTiming",false);

		core.set("optUseInspection",true);

		core.set("optDefaultScrambleTypeForNewSession","333");
	}

	var currentCategory=0;

	/*
	 * options:display(c)
	 * @param c CategoryID, optional, defaults to 0
	 */
	function display(c){
		var code,i;
		if(!c)c=currentCategory||0;
		code="<table class='striped'><tr>";
		for(i=0;i<categories.length;++i){
			code+="<td onclick='options.display("+i+");'>"+categories[i]+"</td>";
		}
		code+="</tr></table><br/><table>";
		code+=options[c]+"</table>";
		layout.write("OPTIONS",code);
	}

	/*
	 * options:addOption()
	 * @param cid Int CategoryID
	 * @param name String Description of Option
	 * @param type Int 0:Button, 1:Switch, 2:Select
	 * @param affect String|Array[affect] Javascript-code to do, may not contain ", ` and '
	 * Switch: affect is [1,2,3], 3 is default value (true=checked), 1 is action when switch is on, 2 when off
	 */
	var options=[];

	function addOption(cid,name,type,affect){
		var code="<tr><td>"+name+"</td><td>";
		if(type==0)
			code+="<button onclick='"+affect+"'>"+name+"</button>";
		if(type==1)
			code+='<label class="switch"><input type="checkbox"'+(affect[2]==true?" checked ":" ")+'onclick="if(this.checked){'+affect[0]+'}else{'+affect[1]+'}"><div class="slider round"></div></label>';
		code+="</td></tr>";
		options[cid]+=code;
	}

	/*
	 * options:addCategory()
	 */
	var categories=[];
	function addCategory(name){
		categories.push(name);
		options.push("");
	}

	return {
		init:init,
		display:display,
		currentCategory:currentCategory,
		options:options
	}
})();
