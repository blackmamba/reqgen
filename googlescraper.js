var links = [];
var casper = require('casper').create();

function getLinks() {
    //console.log(" enter");
    var links = document.querySelectorAll('.rls a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });

}


casper.start('http://ebay.com').then(function() {
    this.fill('form#gh-f', {
        '_nkw': 'nike'
    }, true);
});

casper.then(function(){
    links = links.concat(this.evaluate(getLinks));
});


casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});





// var links = [];
// var casper = require('casper').create();

// function getLinks() {
//     var links = document.querySelectorAll('.rls a');
//     return Array.prototype.map.call(links, function(e) {
//         return e.getAttribute('href');
//     });
// }

// casper.start('http://ebay.com/', function() {
//     // search for 'casperjs' from google form
//     this.fill('form#gh-f', {
//          '_nkw': 'nike'
//     }, true);
// });

// // casper.then(function() {
// //     // aggregate results for the 'casperjs' search
// //     links = this.evaluate(getLinks);
// //     // now search for 'phantomjs' by filling the form again
// //     this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
// // });

// casper.then(function() {
//     // aggregate results for the 'phantomjs' search
//     links = links.concat(this.evaluate(getLinks));
// });

// casper.run(function() {
//     // echo results in some pretty fashion
//     this.echo(links.length + ' links found:');
//     this.echo(' - ' + links.join('\n - ')).exit();
// });