chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request.greeting);
    // if (request.greeting == "hello")
    //   sendResponse({farewell: "goodbye"});
    var tables = generateScoreBox.getStatsPage_(request.uri);
    sendResponse({table: tables});
  });

var generateScoreBox = {
	getStatsPage_: function(statsuri){
		var req = new XMLHttpRequest();
	    req.open("GET", statsuri, true);
	    req.onload = this.extractStats_.bind(this);
	    req.send(null);
	},


	extractStats_: function(e){
		var div = e.target.responseXML.querySelectorAll('generalstats');
		var tables = div.getElementsByType('table');
		return tables[0];
	}
}