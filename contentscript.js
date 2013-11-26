function getStatsPageURI_() {
        var currentTab = location.href;
        var article = currentTab.slice(currentTab.lastIndexOf("/") + 1, currentTab.length);
        var lang = currentTab.slice()
        var statsuri = "https://tools.wmflabs.org/xtools/articleinfo/index.php?article=" + article + "&lang=en&wiki=wikipedia";
        console.log(statsuri);
        return statsuri;
    };

function getStatsPage_(statsuri) {
        var req = new XMLHttpRequest();
        req.open("GET", statsuri, true);
        req.onload = extractStats_.bind(this);
        req.send(null);
    };


function extractStats_(div) {
        var tables = div.getElementsByType('table');
        putbox(document, tables, "warning");
    };


    /*function calculateScore(featured,length,edits,sources,authors,links,recency){
		if(featured){
			var score = (edits/length)+(sources/length)+(authors/length)+(links/length)+(10/recency);
			return score;
		}
		else
		{
			var score =(edits/length)+(sources/length)+(authors/length)+(links/length)+(10/recency);
			return score;
		}
	}


	function decorateBoxScore(score){
		if(score>=10){
			return "good";
		}
		if(score<10&&score>=5){
			return "warning";
		}
		else{
			return "danger";
		}
	}*/
 
function putbox(document, score, color) {
        var box = document.getElementById('mw-content-text');
        var table = document.createElement("table");
        var newrow = document.createElement('tr');
        var th = document.createElement('th');
        newrow.className = color;
        table.className = color + " infobox vcard ";
        table.style.width = "22em";
        table.id = color;
        th.colspan = "2";
        th.className = color + " n";
        th.style.textAlign = "center";
        th.style.fontSize = "125%";
        th.innerText = score;
        newrow.appendChild(th);
        table.appendChild(newrow);
        box.insertBefore(table, box.firstChild);
    };
// function runscript(tabId, changeInfo, tab) {
// 	// No tabs or host permissions needed!
// 	chrome.tabs.insertCSS(tabId, {
// 	        file: chrome.extension.getURL( "css/styles.css")
// 	    });
// 	if (changeInfo.status == 'complete') {
// 		chrome.tabs.executeScript({
// 			code: 'generateScoreBox.putbox(document, 10, "warning");'});
// 		chrome.tabs.insertCSS(tabId, {
// 	        file: "css/styles.css" 
// 	    	}, 
// 	    function(){console.log("css injected");});
// 	    }
// 	};
var xml = Object
var port =  chrome.runtime.connect({name: "uriexchange"});
port.postMessage({uri: getStatsPageURI_() });
console.log("port name: " + port.name);
port.onMessage.addListener(function(msg) {
	var xml = msg.table;
   });
//extractStats_(xml);
//     uri: generateScoreBox.getStatsPageURI_()
// 	}, function (response) {
//     console.log(response.table);
// });

function insertCSS() {
    var css = document.createElement("link");
    var bsurl = chrome.extension.getURL("bootstrap.css")
    css.href = bsurl;
    css.rel = "stylesheet";
    document.head.appendChild(css);
}

insertCSS();

putbox(document, xml, "success");
//generateScoreBox.getStatsPage_(generateScoreBox.getStatsPageURI_());
//generateScoreBox.getStatsPageURI_();