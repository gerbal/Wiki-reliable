var generateScoreBox = {


	getStatsPageURI_: function(){
		var currentTab= location.href;
		var article = currentTab.slice(currentTab.lastIndexOf("/")+1, currentTab.length);
		var statsuri = "https://tools.wmflabs.org/xtools/articleinfo/index.php?article=" +  article + "&lang=en&wiki=wikipedia";
		console.log(statsuri);
		return statsuri;
	},

	getStatsPage_: function(statsuri){
		var req = new XMLHttpRequest();
	    req.open("GET", statsuri, true);
	    req.onload = this.extractStats_.bind(this);
	    req.send(null);
	},


	extractStats_: function(e){
		var div = e.target.responseXML.querySelectorAll('generalstats');
		var tables = div.getElementsByType('table');
		this.putbox(this.currentTab,"test","warning");
	},


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

	putbox: function(document, score, color){
		var box = document.getElementById('mw-content-text');
		var table = document.createElement("table");
		var newrow = document.createElement('tr');
		var th = document.createElement('th');
		newrow.className= color;
		table.className = color + " infobox vcard ";
		table.style.width = "22em";
		table.id= color;
		th.colspan = "2";
		th.className = color +" n";
		th.style.textAlign = "center";
		th.style.fontSize = "125%";
		th.innerText = score;
		newrow.appendChild(th);
		table.appendChild(newrow);
		box.insertBefore(table, box.firstChild);
	}

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

chrome.runtime.sendMessage({uri: generateScoreBox.getStatsPageURI_()}, function(response) {
  console.log(response.table);
});

function insertCSS() {
	var css = document.createElement("link");
	var bsurl= chrome.extension.getURL("bootstrap.css")
	css.href =  bsurl;
	css.rel= "stylesheet";
	document.head.appendChild(css);


	
}
insertCSS();

generateScoreBox.putbox(document, "A very long string like this, made even longer, what happens", "success");
//generateScoreBox.getStatsPage_(generateScoreBox.getStatsPageURI_());
//generateScoreBox.getStatsPageURI_();
