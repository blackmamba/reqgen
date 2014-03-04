var express = require('express');
var phantom = require('phantom');
var app = express();
var _page;
var _ph;
//var links = [];
//var casper = require('casper').create();
// app.get('/index', function(req, res){
//   var body = 'Hello World';
//   res.setHeader('Content-Type', 'text/plain');
//   res.setHeader('Content-Length', Buffer.byteLength(body));
//   res.end(body);
// });

phantom.create("--web-security=no", "--ignore-ssl-errors=yes", {
    port: 12345
}, function(ph) {
    console.log("Phantom Bridge Initiated");
    _ph = ph;
    _ph.createPage(function(page) {
        console.log("Page created!");
        _page = page;
        // _page.set('onConsoleMessage', function(msg) {
        //     console.log("Phantom Console: " + msg);
        // });
    });
});



function openPage() {
    // _page.set('onConsoleMessage', function(msg) {
    //     console.log("Phantom Console: " + msg);
    // });
    _page.open("http://www.ebay.com", function(status) {
        if (status == "success") {
            console.log("Page is open!");
            //_page.close();
            //The following would yield an error:
            //_page.open("http://www.google.com", function(status) {
            //})
            text = _page.evaluate(function() {
                var text = document.querySelector("title").innerText;
                console.log("text: " + text);
                return text;
            });
        }
    });
}

app.get('/index', function(req, res) {

    openPage();



    res.send('hello world: ');

    //genRequest();
});

app.get('/beacon', function(req, res) {
    console.log('beacon received');

});
app.listen(3000);
console.log('Listening on port 3000');



// function getLinks() {
//     //console.log(" enter");
//     var links = document.querySelectorAll('.rls a');
//     return Array.prototype.map.call(links, function(e) {
//         return e.getAttribute('href');
//     });

// }

// function genRequest(url) {
//     try {
//         var Spooky = require('spooky');
//     } catch (e) {
//         var Spooky = require('../lib/spooky');
//     }

//     var spooky = new Spooky({
//         child: {
//             transport: 'http'
//         },
//         casper: {
//             logLevel: 'debug',
//             verbose: true
//         }
//     }, function(err) {
//         var links = [];
//         if (err) {
//             e = new Error('Failed to initialize SpookyJS');
//             e.details = err;
//             throw e;
//         }

//         spooky.start(
//             'http://ebay.com');
//         spooky.then(function() {
//             this.fill('form#gh-f', {
//                 '_nkw': 'nike'
//             }, true);
//         });
//         spooky.then(function() {
//             console.log("check1: " +links);
//             links = links.concat(this.evaluate(getLinks));
//         });
//         spooky.run(function() {
//             // echo results in some pretty fashion
//             console.log("check2: " +links);
//             this.echo(links.length + ' links found:');
//             this.echo(' - ' + links.join('\n - ')).exit();
//             return links.join('\n -');
//         });
//     });

//     spooky.on('error', function(e, stack) {
//         console.error(e);

//         if (stack) {
//             console.log(stack);
//         }
//     });



//     // casper.start('http://ebay.com').then(function() {
//     //     this.fill('form#gh-f', {
//     //         '_nkw': 'nike'
//     //     }, true);
//     // });

//     // casper.then(function() {
//     //     links = links.concat(this.evaluate(getLinks));
//     // });


//     // casper.run(function() {
//     //     // echo results in some pretty fashion
//     //     this.echo(links.length + ' links found:');
//     //     this.echo(' - ' + links.join('\n - ')).exit();
//     // });

// }