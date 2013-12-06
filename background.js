var logging = true; //enables logging in the broswers JS console.
var generateScoreBox = {
    //big dictionary object full of methods, one of many ways to do things in javascript.
    getStatsPage_: function (statsuri) {
        //Hand the URI from the content.js, pulls it down, does some basic parsing. 
        var xml;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", statsuri, true);
        xhr.onreadystatechange = function () {
            if (logging) {
                console.log("entering xhr.onreadystatechange");
            }
            if (xhr.readyState == 4) {
            xml = xhr.responseXML;
            if (logging) {
                console.log("xml: " + xml);
            }
            xml = xml.getElementById('generalstats'); //works
            if (logging) {
                console.log("xml: " + xml);
            }
        }
        }
        if (logging) {
                console.log("xml(2): " + xml);
            }
        xhr.responseType = "document";
        xhr.timeout = 4000;
        xhr.ontimeout = function () { console.log("Connection to timed out to" + statsuri); }
        xhr.send();
        //return xml; //returns an object, not sure what to do with it.
    },
    extractStats_: function (e) {
        // I throw an error, no one knows why.
        return "apple";
    }
};

var table;
chrome.runtime.onConnect.addListener(function (port) {
    //listens for a message from the content.js script
    console.assert(port.name == "uriexchange");
    if (logging) {
        console.log("connected: " + port.name);
    }
    port.onMessage.addListener(function (msg) { // listens for the URI to get passes
        table = generateScoreBox.getStatsPage_(msg.uri);
        if (logging) {
            console.log("uri: " + msg.uri);
        }
        var score = generateScoreBox.extractStats_(table); 
        if (logging) {
            console.log("table: " + table);
            console.log("score: " + score);
        }
        port.postMessage({
            table: score
        }); //sends back a score.
    });
});
