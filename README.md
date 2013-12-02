Wiki-reliable
=============

An Experimental Chrome Extension to evaluate the reliability of a Wikipedia article.

###To install:

1. Set Chrome to Developer mode. In the Extensions menu check the 'Developer Mode'
2. run `git clone https://github.com/Wiki-reliable/Wiki-reliable.git`
3. click 'Load Unpacked Extension' and select the folder you just cloned


##About The Project

Wiki-reliable is a final project for [INLS 560](http://silshack.github.io/fall2013/) at [SILS UNC](http://sils.unc.edu).

Our goal is to give a user a basic, easy, and straightforward score to help in evaluating the reliability of any wikipedia article.

##How We built it

Wiki-reliable is built in Javascript using the [Chrome APIs](http://developer.chrome.com/extensions/api_index.html). 

##Contributing

If you want to contribute open an issue, comment on an existing one, fork the repo and shoot us a pull request, whatever you like. Checkout the [dev branch](https://github.com/Wiki-reliable/Wiki-reliable/tree/dev) for the current development version, and send pull requests to the dev branch.

##Things we've learned

While developing this we've learned some intersting (and fairly obvious in retrospect) things:
  Chrome won't let content land scripts execute cross site XHR requests  
  The way Chrome handles passing data from background to content is not intuitive  
  Order of operations matters. i.e. declare your variables before you call them (yes, I am an idiot)
