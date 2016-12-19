/*
 * stats.js
 * requires html.js
 */

String.prototype.insert = function (index, string) {
  var ind = index < 0 ? this.length + index  :  index;
  return  this.substring(0, ind) + string + this.substring(ind, this.length);
};

var stats=(function(){
	/*
	 * stats:Init()
	 */
	function init(){
		update();
	}

  /*
   * stats:sessionSwitchInit()
   */
  function sessionSwitchInit(){
    currentBig=-1;
  }

	/*
	 * stats:update();
	 */
	function update(){
		var times,i,code,sizes;

		times=core.get("config").timeList[core.get("config").currentSession];
		code="";

		code+=html.tr("Id",transl("Time"),"Mo3","Ao5");

		for(i=0;i<times.length;++i){
			//We build a table row containing id, time, current mo3 and current ao5
			code+=html.tr(
				(i+1),
				math.formatPenalty(times[i]),
				i>1?math.format(math.mean([times[i],times[i-1],times[i-2]])):"-",
				i>3?math.format(math.average([times[i],times[i-1],times[i-2],times[i-3],times[i-4]])):"-"
			).insert(3," onclick='stats.showBig("+i+")'");	//For detailed solve information later on
		}
		code=html.table(code);
		layout.write("TIMELIST",code);

    code="";
    //Add Session select
    //Statistics
    if(sessions.current().solveType!="FMC"&&sessions.current().solveType!="BLD"&&sessions.current().solveType!="OH BLD")
      sizes=[1,5,12,50,100,1000,10000];
    else
      sizes=[1,3,25,100];
    if(sessions.current().solveType=="FT")
      sizes.pop();

    code+=html.tr(transl("Statistics"),transl("Best"),transl("Current"));
    for(i=0;i<sizes.length;++i){
      code+=html.tr("Mo"+sizes[i],math.format(math.bestMean(core.get("config").timeList[core.get("config").currentSession],sizes[i])),"DNF");
    }
    code=html.table(code);

    layout.write("STATS",code);
	}

  /*
   * stats:showBig(i)
   * @param i Int SolveID
   */
  var currentBig=-1;

  function showBig(i){
    if(i!=currentBig){
      document.querySelector(".TIMELIST table tbody tr:nth-child("+(i+2)+")").style.background="#CCC";
      document.querySelector(".TIMELIST table tbody tr:nth-child("+(currentBig+2)+")").style.background="white";
    }
    currentBig=i;
    var code="",solve=core.get("config").timeList[core.get("config").currentSession][i];
    code="<table cellspacing='0' cellpadding='0'><tr><td onclick='stats.showDetails("+i+")'>Details<br><!--UWR--><br>"
    +(solve.flags.fake?"Fake":"\&nbsp;")
    +"</td><th>"+math.formatPenalty(solve)+"</th><td>#"+(i+1)+"<br/><span onclick='stats.togglePenalty("+i+",2)'>"
    if(solve.penalty==2000)
      code+="<u>+2</u>";
    else
      code+="+2";
    code+="</span><br/><span onclick='stats.togglePenalty("+i+",-1)'>"
    if(solve.penalty==-1)
      code+="<u>DNF</u>";
    else
      code+="DNF";
    code+="</span></td></tr></table>";
    layout.write("TIME",code);
  }

  /*
   * stats:showDetails(i)
   * @param i Int SolveID
   */
  function showDetails(i){
    var solve,flags,i,code;
    solve=core.get("config").timeList[core.get("config").currentSession][i],

    //Compute flags
    flags=["Fail","Mess up","Pop","OLL Skip","PLL Skip","Explosion",
    "COLL Skip","CMLL Skip","CxLL Skip","EOLine Skip","EOLL Skip","EPLL Skip",
    "CPLL Skip","LL Skip","6 move Last layer","VLS to PLL Skip","fake","UWR",];

    if(solve.scrambletype=="Pyra")
      flags.push("0 Tips","1 Tip","2 Tips","3 Tips","4 Tips");

    if(solve.scrambletype=="444"
       ||solve.scrambletype=="666"
       ||solve.scrambletype=="Square1")
        flags.push("Parity","Parity mess up");

    if(solve.scrambletype!="Pyra"
       &&solve.scrambletype!="Square1")
        flags.push("Corner twist");

    if(solve.penalty<0
       &&solve.scrambletype!="Pyra"
       &&solve.scrambletype!="Square1"
       &&solve.scrambletype!="Skewb"
       &&solve.scrambletype!="222")
        flags.push("M-Slice DNF");

    if(solve.scrambletype=="222"
       ||solve.scrambletype=="444"
       ||solve.scrambletype=="666")
        flags.push("internal misalignment")

    //Display some general data
    code="Scramble: "+solve.scramble+"<br/>";
    code+="Inspction time: "+math.format(solve.currentInspection)+"<br/>";
    code+="Start date: "+math.formatDate(solve.startTime)+"<br/>";
    code+="End date: "+math.formatDate(solve.endTime)+"<br/>";
    code+="<br/>";

    //Display Flags
    for(i=0;i<flags.length;++i)
      code+="<input type='checkbox'"+(solve.flags[i]?" checked":"")+"/>"+flags[i]+"\&nbsp;";

    layout.write("FLAGS",code);
  }

  /*
   * stats:togglePenalty(i,p)
   * @param i Int SolveID
   * @param p Int Penalty (2 for +2, -1 for DNF)
   */
  function togglePenalty(i,p){
    var solve=core.get("config").timeList[core.get("config").currentSession][i];
    if(solve.penalty/1000==p)
      solve.penalty=0;
    else if(solve.penalty==0&&p>0)
      solve.penalty=p*1000;
    if(solve.penalty==-1&&p==-1)
      solve.penalty=0;
    else if(p==-1)
      solve.penalty=-1;
    stats.update();
    showBig(currentBig);
  }

  function display(){
    var solves,i,pbList,cur,outhtml;

  	//Get array of PBs
    solves=core.get("config").timeList[core.get("config").currentSession];
    cur=+Infinity;
    pbList=[];
    for(i=0;i<solves.length;++i){
      if(solves[i].zeit<cur){
        cur=solves[i].zeit+1;
        pbList.push(i);
      }
    }

    //Generate table
    outhtml="PB improvements<br/>";
    outhtml+=html.tr("ID","Time","Improvement","Solves as PB","Time as PB","Date")
    for(i=0;i<pbList.length;++i){
      outhtml+=html.tr(
        i,
        math.format(solves[pbList[i]].zeit),
        i>0?(math.format(solves[pbList[i-1]].zeit-solves[pbList[i]].zeit)):"-",
        i==pbList.length-1?"-":pbList[i+1]-pbList[i],
        i==pbList.length-1||i<1?"-":solves[pbList[i+1]].endTime-solves[pbList[i]].endTime+"ms",
        math.formatDate(solves[pbList[i]].endTime)
      );
    }
    outhtml=html.table(outhtml);

    layout.write("STATISTICS",outhtml);
  }

	return {
		init:init,
    sessionSwitchInit:sessionSwitchInit,
		update:update,
    showBig:showBig,
    showDetails:showDetails,
    togglePenalty:togglePenalty,
    display:display
	}
})();
