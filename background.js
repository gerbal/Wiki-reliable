function getjson(title){

}

function parseDocument(document){
	return calculateScore(featured, length, edits, sources,authors,links,recency);
}

function calculateScore(featured,length,edits,sources,authors,links,recency){
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
		return "green";
	}
	if(score<10&&score>=5){
		return "orange";
	}
	else{
		return "red";
	}
}

function putbox(document, score, color){
	var box = document.getElementById('mw-content-text');
	var table = document.createElement("table");
	var newrow = document.createElement('tr');
	var th = document.createElement('th');
	newrow.className= color;
	table.className = color +" infobox vcard " ;
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

function runscript(tabId, changeInfo, tab) {
  // No tabs or host permissions needed!
  chrome.tabs.insertCSS(tabId, {
            file: chrome.extension.getURL( "css/styles.css")
        });
  if (changeInfo.status == 'complete') {
    chrome.tabs.executeScript({
    code: 'putbox(document, 10, "red")'
  });
    
  };
  
};


chrome.tabs.onUpdated.addListener(runscript);