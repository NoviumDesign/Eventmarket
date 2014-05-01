module.exports = {
    index: function(req, res) {
        res.render('conference/index', {title: 'Konferens', pageClass: 'conference'});
    }
};