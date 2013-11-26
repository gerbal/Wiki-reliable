var logging = true;
var table = Object;

chrome.runtime.onConnect.addListener(function(port){
      console.assert(port.name == "uriexchange");
      if (logging){console.log("connected: " + port.name)};
      port.onMessage.addListener(function(msg) {
        var table = generateScoreBox.getStatsPage_(msg.uri);
        if (logging){console.log("uri: " + msg.uri)};
        port.postMessage({table: score});
      });
        // console.log(sender.tab ?
        //     "from a content script:" + sender.tab.url :
        //     "from the extension:" + request);
        // console.log("request: " + request.uri);
        // // if (request.greeting == "hello")
        // //   sendResponse({farewell: "goodbye"});
        // var uri = request.uri;
        // if (logging){console.log("uri: " + uri);};
        // var tables = generateScoreBox.getStatsPage_(uri);
        // if (logging){console.log("tables: " +tables);};
        // sendResponse({
        //     table: tables
        // });
    });

if (logging){console.log("table: " + table)};
var score = generateScoreBox.extractStats_(table);

var generateScoreBox = {
    getStatsPage_: function (statsuri) {
      var xml = Object;
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var xml = this.responseXML;
        if (logging){console.log("xml: " +xml);};
        var xml = xml.getElementById('generalstats');
        if (logging){console.log("xml: " +xml);};
      }
      xhr.open("GET", statsuri);
      xhr.responseType = "document";
      xhr.send();
      return xml;
      },


    extractStats_: function (e) {
      return e;
    }
}