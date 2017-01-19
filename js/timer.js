/*
 * timer.js - main timer file for HTTimer
 * Requires algSets.js, core.js, counter.js, error.js, goals.js, layout.js, scramble.js
 */

timer = (function() {
    /*
     * Timer:Init()
     *
     * - Check if all modules have been loaded
     * - Check Browser
     * - Try to load data from previous sessions of HT
     *   - Version check data
     * - Set global variables
     * - Write Layout
     * - Initialize components
     */
    var moduleList = ["algSets", "cmd", "core", "counter", "error", "goals", "html", "layout", "scramble", "stats", "keyboard", "translate"];
    var version = "4.3.0A";

    function init() {
        var i, config, check, html;

        //Let the server check, whether the user is logged in. Assume, the user is not, in case it fails.
        core.set("login", false);
        server.json("isloggedin.php", function(t) {
            core.set("login", !!t.response);
        });

        //Check if all modules have been loaded
        for (i = 0; i < moduleList.length; ++i) {
            if (!window[moduleList[i]])
                error.error("LoadError");
        }

        //Check browser
        var isIE = /*@cc_on=!@*/ false;
        if (isIE) {
            //Do something. I suggest downloading Firefox.  ^_^
        }

        //Try to load data from previous sessions
        //Old versions saves will not get lost, as they save in HTexport, while we
        //save in HTExport and HTAutoSave
        /*check=false;
        do{
        	if(!localStorage.HTExport||check){
        		if(localStorage.HTAutoSave.length>100){
        			core.list=JSON.parse(localStorage.HTAutoSave);
        		}else{
        			config={
        				timeList:[[]],
        				currentScrambler:"333",
        				customScramblerList:[],
        				algSets:[],
        				goals:[],
        				sessionData:[
        					{
        						phases:1,
        						inspection:15,
        						name:transl("New Session"),
        						solveType:"normal",
        						method:"",
        						scrambleType:"333"
        					}
        				],
        				currentSession:0
        			};
        		}
        	}else{
        		core.list=JSON.parse(localStorage.HTExport);
        	}


        	if(config&&!config.version&&!check) //There must be a config.version to have an importable data structure,
        										//as only HT 4.3.0A and up are supported. Other versions are usable
        										//using the import function, which is only available in a fully loaded
        										//timer. Older timers did not have timerExport.version or have it false
        		check=true;
        	else
        		check=false;
        }while(check);*/

        //TEST MODE ONLY: Always start new Session
        config = {
            timeList: [
                []
            ],
            currentScrambler: "333",
            customScramblerList: [],
            algSets: [],
            goals: [],
            sessionData: [{
                phases: 1,
                inspection: 15,
                name: transl("New Session"),
                solveType: "normal",
                method: "",
                scrambleType: "333"
            }],
            currentSession: 0
        };

        //Set some variables
        //Set variables using core.set (and core.get to get them) are NOT const and will be exported.
        core.set("running", false);
        if (typeof core.list.length === "undefined") {
            core.set("importVersion", config && config.version || version);
            core.set("version", version);
            core.set("language", "EN");
            core.set("config", config || core.get("config"));
            core.set("timingMode", "up"); //May be "up", "down". Everything else means "not timing"

            //Write layout
            if (config && config.layout) {
                layout.setFullLayout(config.layout);
            } else {
                layout.setFullLayout("SCRAMBLE", "", "SCRAMBLEIMAGE", "TIMELIST", "TIME|CurrentAo5,CurrentAo12");
            }
        }

        layout.write("BOTTOMMENU", `<div class="bottom-menu" onclick="Mousetrap.trigger('o');"><span class="keycodes">o o (open)/o c (close)</span> Options</div>
			<div class="bottom-menu" onclick="Mousetrap.trigger('g g');"><span class="keycodes">g g (open) g c (close)</span> Goals</div>
			<div class="bottom-menu" onclick="Mousetrap.trigger('a a');"><span class="keycodes">a a/a c</span> AlgSets</div>
			<div class="bottom-menu" onclick="Mousetrap.trigger('i i');"><span class="keycodes">i i/i c</span> Import/Export</div>
			<div class="bottom-menu" onclick="Mousetrap.trigger('l l');"><span class="keycodes">l l/l c</span> Login</div>
			<div class="bottom-menu" onclick="Mousetrap.trigger('m m');"><span class="keycodes">m m/m c</span> Collection</div>
			<div class="bottom-menu" onclick="Mousetrap.trigger('p p');"><span class="keycodes">p p/p c</span> Statistics</div>`);
        layout.write("LOGO", `HTTimer <small onclick="cmd.switchToText()">V${version} ${transl("Alpha Graphic")}</small>`);
        layout.write("TIME", `<span class="keycodes">space</span>0.000`);
        layout.write("PORT", `<button onclick="alert(timer.exportCsv());">Export CSV</button>`);

        //Initialize components
        counter.init();
        algSets.init();
        goals.init();
        scramble.init();
        keyboard.init();
        stats.init();
        cmd.init();
        options.init();

        //Generate scramble and display it
        scramble.neu();
        scramble.draw();

        //Display Sessions
        sessions.display();

        //Autosave
        setInterval(function() {
            localStorage.HTAutoSave = JSON.stringify(core.getAll());
        }, 5e3);

        //Setup
        html = "", i;
        const WCA_EVENTS = ["2x2x2", "3x3x3", "4x4x4", "5x5x5", "6x6x6", "7x7x7", "Pyraminx", "Megaminx", "3x3x3 Onehanded", "3x3x3 BLD", "4x4x4 BLD", "5x5x5 BLD", "3x3x3 MBLD", "Square-1", "Skewb", "3x3x3 Fewest moves"];
        for (i = 0; i < WCA_EVENTS.length; ++i)
            html += "<input type='checkbox' id='setup-event-" + i + "' checked/>" + WCA_EVENTS[i] + "<br/>";
        layout.write("SETUP", html);
    }

    /*
     * timer:setup()
     * Reads the data the user entered in the setup dialogs, and creates sessions accordingly.
     */
    function setup() {
        const WCA_EVENTS = ["2x2x2", "3x3x3", "4x4x4", "5x5x5", "6x6x6", "7x7x7", "Pyraminx", "Megaminx", "3x3x3 Onehanded", "3x3x3 BLD", "4x4x4 BLD", "5x5x5 BLD", "3x3x3 MBLD", "Square-1", "Skewb", "3x3x3 Fewest moves"];
        const WCA_SCRAMBLER = ["222", "333", "444", "555", "666sh", "777sh", "Pyra", "Mega", "333", "333", "444", "555", "333", "Square1", "Skewb", "333"];
        var i;
        for (i = 0; i < WCA_EVENTS.length; ++i) {
            if (document.getElementById("setup-event-" + i).checked) {
                sessions.create(1, (~~WCA_EVENTS[i].search("BLD") ? 0 : 15), WCA_EVENTS[i], "normal", "", WCA_SCRAMBLER[i]);
            }
        }
        //Switch to 3x3 Session, or 4x4, if 2x2 has not been selected (shame on the user who does that)
        sessions.switchS(2);
        sessions.display();
    }

    function exportCode() {
        return JSON.stringify(core.getAll())
    }

    function exportCsv() {
        var solves = core.get("config").timeList[core.get("config").currentSession],
            i, csv = "";
        for (i = 0; i < solves.length; ++i)
            csv += [solves[i].zeit, solves[i].scramble].join(",") + "\n";
        return csv;
    }

    return {
        init: init,
        exportCode: exportCode,
        exportCsv: exportCsv,
        setup: setup
    }
})();
