var express = require('express');
var app = express();
var links = [];


app.get('/index', function(req, res) {


    genRequest('http://ebay.com', number);

    


});

app.listen(3000);

// function getLinks() {
//     //console.log(" enter");
//     var links = document.querySelectorAll('.rls a');
//     return Array.prototype.map.call(links, function(e) {
//         return e.getAttribute('href');
//     });


// }

function genRequest(url, num) {
    try {
        var Spooky = require('spooky');
    } catch (e) {
        var Spooky = require('../lib/spooky');
    }
    var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function(err) {
        var i =0;
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        i = spooky.start(url).repeat(num + 1, function(){
            console.log("Iteration # " + ++i);
            return i;
        }, {i: i});


        // spooky.then(function() {
        //     this.fill('form#gh-f', {
        //         '_nkw': 'nike'
        //     }, true);
        // });


        // links = spooky.then(function(links) {
        //     console.log("check1: " + links);
        //     try {
                
        //         links = links.concat(this.evaluate(getLinks));
        //     } catch (err) {
        //         e = new Error('failed to concat');
        //         e.details = err;
        //         throw e;
        //     }
        //     return links;

        // }, { 
        //     links: links
        // });

        spooky.run();
        
        // spooky.run(function(links) {
        //     // echo results in some pretty fashion
            
        //         console.log("check2: " + links + "of type: " + typeof links);
        //         // this.echo(links.length + ' links found:');
        //         // this.echo(' - ' + links.join('\n - ')).exit();
        //         return links.join('\n -');

        //     return null;
        // }, {
        //     links: links
        // });
    });

    spooky.on('console', function(line) {
        console.log(line);
    });
    spooky.on('error', function(e, stack) {
        console.error(e);

        if (stack) {
            console.log(stack);
        }
    });
}