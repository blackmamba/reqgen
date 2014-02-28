var casper = require('casper').create();

casper.start('http://ebay.com', function(){
    this.echo(this.getTitle());

});
casper.then(function() {
    //links = this.evaluate(getlinks);
    this.fill('form#gh-f', {'_nkw': 'nike'}, true);
    console.log('end of 1st then');
});
casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());

});

casper.run();