var express = require('express');
var app = express();
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var links = [];



app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/gen', function(req, res) {
    if (req.body) {

        
        console.log("req.url: " + req.param('url'));
        var url = req.param('url') || 'http://ebay.com';
        console.log("req.number: " + req.param('number'));
        var num = req.param('number') || 50;
        //for (var i =0; i < num; i++) {
        //    console.log("url: " + url + "num: " +num);
            genRequest(url, num);    
        //}
        
    }
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});



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
        var i = 0;
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        spooky.start(url, function() {
            console.log("spooky started");

        });

        spooky.then([{
                num: num,
                url: url
            },
            function() {
                var i = 0;
                this.repeat(num, function() {
                    // location.href = "http://ebay.com";
                    // location.href = url;
                    this.thenOpen(url); 
                    console.log("Iteration # " + (++i));

                });
            }
        ]);

        spooky.run();

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



/*

/**
 * Module dependencies.
 

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

 */