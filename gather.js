var casper = require('casper').create({
    pageSettings: {
        loadImages: false,//The script is much faster when this field is set to false
        loadPlugins: true,
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0'
    }
});

function getLinks() {
    var links = document.getElementsByClassName("home-icon");
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
};

casper.options.waitTimeout = 2000;

var num = casper.cli.get('num');

casper.start().thenOpen("http://127.0.0.1:8000", function() {});

casper.then(function(){
    this.evaluate(function(){
        document.getElementsByTagName('input')[0].click();
    });
});

casper.wait(1000);

casper.thenEvaluate(function(num){
    document.getElementById('page_record').value = num;
    showBooks();
},num);

casper.wait(1000);

casper.then(function(){
    links = this.evaluate(getLinks);
    this.echo(links);
});  
