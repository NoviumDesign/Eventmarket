module.exports = {
    index: function(req, res) {
        res.render('tickets/index', {title: 'Biljett', pageClass: 'tickets'});
    },
    theaterentertainment: function(req, res) {
        res.render('tickets/theaterentertainment', {title: 'Teater & Underhållning', pageClass: 'theaterentertainment'});
    },
};