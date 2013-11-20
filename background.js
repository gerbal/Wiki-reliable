var generateScoreBox {

	getStatsPageURI_: function(tab){
		var tablink;
		var statsuri;
		chrome.tabs.getSelected(null, function (tab) {
		    var tablink = tab.url;
		    var article = tablink.slice(tablink.lastIndexOf("/")+1, tablink.length);
		    statsuri = "https://tools.wmflabs.org/xtools/articleinfo/index.php?article=" +  encodeURIComponent(article) + "&lang=en&wiki=wikipedia";
		});
		return statsuri;
	};

	getStatsPage_: function(statsuri){
		var req = new XMLHttpRequest();
	    req.open("GET", statsuri, true);
	    req.onload = this.extractStats_.bind(this);
	    req.send(null);
	}


	extractStats_: function(e){
		var div = e.getElementById('generalstats');
		var tables = div.getElementsByType('table');

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

	putbox: function(document, score, color){
		var box = document.getElementById('mw-content-text');
		var table = document.createElement("table");
		var newrow = document.createElement('tr');
		var th = document.createElement('th');
		newrow.className= color;
		table.className = "infobox vcard " + color;
		table.style.width = "22em";
		th.colspan = "2";
		th.className = "n " + color;
		th.style.textAlign = "center";
		th.style.fontSize = "125%";
		th.innerText = "Hello World!";
		newrow.appendChild(th);
		table.appendChild(newrow);
		box.insertBefore(table, box.firstChild);
	};

};
function runscript(tabId, changeInfo, tab) {
  // No tabs or host permissions needed!
  chrome.tabs.insertCSS(tabId, {
            file: chrome.extension.getURL( "css/styles.css")
        });
  if (changeInfo.status == 'complete') {
    chrome.tabs.executeScript({
    code: 'generateScoreBox.putbox(document, 10, "warning")'
  })
    chrome.tabs.insertCSS(tab.id, {
            file: "css/styles.css"
        });

  };
  
}

chrome.tabs.onUpdated.addListener(runscript);
