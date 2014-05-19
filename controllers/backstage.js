/*function getLogin(req)
{
    var ret = { 'loggedin': false };
    if (req.user) {
        ret.loggedin = true;
        ret.user = req.user;
    };
    return ret;
}*/

module.exports = {
    start: function(req, res) {
        res.render('backstage/start', {pageClass: 'backstage', title: 'Start'});
    },
    membertips: function(req, res) {
        res.render('backstage/membertips', {pageClass: 'membertips', title: 'Medlems-tips'});
    },
};
