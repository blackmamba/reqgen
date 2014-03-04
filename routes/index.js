/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('index', {
        title: 'Request Generator'
    });
    var url = req.body.url || 'http://ebay.com';
    var num = req.body.num || 50;
    genRequest(url, num);
};