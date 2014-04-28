function getLogin(req)
{
    var ret = { 'loggedin': false };
    if (req.user) {
        ret.loggedin = true;
        ret.user = req.user;
    };
    return ret;
}

module.exports = {
    index: function(req, res) {
        res.render('home/home', {pageClass: 'home', title: 'Home', loggedin: getLogin(req) });
    },
    login: function(req, res) {
        res.render('home/login', {pageClass:'login', title: 'Logga in'});
    }
};
