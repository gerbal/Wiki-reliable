chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request.uri);
    // if (request.greeting == "hello")
    //   sendResponse({farewell: "goodbye"});
    var tables = generateScoreBox.getStatsPage_(request.uri);
    sendResponse({table: tables});
  });

var generateScoreBox = {
	getStatsPage_: function(statsuri){
		var req = new XMLHttpRequest();
		req.open('GET', statsuri);
		req.send();
	    req.onreadystatechange = function() {
  			if ((this.readyState == 4) && (this.status == 200)) {
  				var div = this.responseXML.getElementsById('generalstats');
			var tables = div.getElementsByType('table');
			return tables[0];
  			}
		}
	},


	extractStats_: function(e){
		
	}
}