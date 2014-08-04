/*function getLogin(req)
{
    var ret = { 'loggedin': false };
    if (req.user) {
        ret.loggedin = true;
        ret.user = req.user;
    };
    return ret;
}*/
var models = require('../app/models'),
crmModels        = require('../app/CRMModels');

module.exports = {
    start: function(req, res) {
      if (req.user) {
        // Check all crmContactObjects with this user _id
        crmModels.CRMContactObject.find({ 'AccessGroupFullText': 'memberColleague' }).where('Personal.personObject').equals(req.user.PersonData[0].id).exec(function (err, crmObj) {
          if (err) console.log(err);
          
          if (crmObj.length > 1) {
            // We have admin to several pages, redirect to choose login
            
          } else {
            req.session.backstageChoosen = crmObj._id;
            res.render('backstage/start', {
              crmObj: crmObj,
              currentUser: req.user,
              pageClass: 'backstage', 
              title: 'Start'});
          }
        });
      } else {
        req.flash('info', 'Du är inte inloggad!');
        res.redirect('/login');
      }
    },
    membertips: function(req, res) {
        res.render('backstage/membertips', {pageClass: 'membertips', title: 'Medlems-tips'});
    },
};
