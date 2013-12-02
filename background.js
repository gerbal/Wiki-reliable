var logging = true; //enables logging in the broswers JS console.
var generateScoreBox = {
    //big dictionary object full of methods, one of many ways to do things in javascript.
    getStatsPage_: function (statsuri) {
        //Hand the URI from the content.js, pulls it down, does some basic parsing. 
        var xml = Object;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var xml = this.responseXML;
            if (logging) {
                console.log("xml: " + xml);
            }
            xml = xml.getElementById('generalstats'); //works
            if (logging) {
                console.log("xml: " + xml);
            }
        }
        xhr.open("GET", statsuri);
        xhr.responseType = "document";
        xhr.send();
        return xml; //returns an object, not sure what to do with it.
    },
    extractStats_: function (e) {
        // I throw an error, no one knows why.
        return 1;
    }
};

var table = Object;
chrome.runtime.onConnect.addListener(function (port) {
    //listens for a message from the content.js script
    console.assert(port.name == "uriexchange");
    if (logging) {
        console.log("connected: " + port.name);
    }
    port.onMessage.addListener(function (msg) { // listens for the URI to get passes
        var table = generateScoreBox.getStatsPage_(msg.uri);
        if (logging) {
            console.log("uri: " + msg.uri);
        }
        port.postMessage({
            table: score
        }); //sends back a score.
    });
});
if (logging) {
    console.log("table: " + table);
}
var score = generateScoreBox.extractStats_(table); 
