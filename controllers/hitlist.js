module.exports = {
    index: function(req, res) {
        res.render('hitlist/index', {title: 'Hitlist', pageClass: 'hitlist'});
    }
};