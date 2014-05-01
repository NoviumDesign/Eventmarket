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
        console.log('Start rendering backstage start page...');
        res.render('backstage/start', {pageClass: 'backstage', title: 'Start'});
    }
};
