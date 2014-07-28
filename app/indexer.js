/**
 * indexer
 *
 * after import from old mysql, run in sequence:
 * 1. orgmembership
 * 2. accessmembership
 * 3. CRMContactObjectsWithPersonID
 * 4. crmobjectresponsibility
 * 5. parsecrmlogingroup
 * 6. parseLogTimes
 * 7. CRMContactObjectsWithOrg
 */
'use strict';

var models = require('../app/models'),
  async            = require('async'),
  helpers          = require('../app/helpers'),
  loginObject      = require('../app/objects/login'),
  personObject     = require('../app/objects/person'),
  personController = require('../controllers/admin/person'),
  crmModels        = require('../app/CRMModels');

module.exports = {
  // Indexerade kundkort
  // Ska laddas CRMContactObject:
  //  - en Person baserat på CRM.PersonID >> visa namn / titel
  //  - grupptillhörighet baserat på Login (baserat på PersonID) därefter AccessGroup baserat på Login.AccessMembership >> visa namn på grupptillhörighet
  //  - senaste aktivitet från  baserat på ContactObjectID >> ta senaste värdet och räkna bakåt från idag
  //    - Varje gång en aktivitet skrivs för detta objekt måste värdet uppdateras i detta table
  //  (OK) - CRMObjectResponsibility mergas in från andra tablet
  //         - Varje gång en PersonID uppdateras måste ResponsibleFullText uppdateras i detta table
  //
  // Kundkort: 
  //   - Organisation?
  //     - PersonID
  //     - PersonID

  parseLogTimes: function () {
    crmModels.CRMContactObject.find({}, function (err, crmObjects) {
      console.log('found contact objects');
      if (err) console.log(err);
      async.each(
        crmObjects,
        function(crm, callback){
          crmModels.CRMContactLog.find({ContactObjectID: crm.ContactObjectID}, null, {sort: { LogTime: -1 }}, function(err, logs){
            if (err) console.log(err);
            if (logs.length > 0) {
              if (logs[0]) {
                if (logs[0].LogTime !== undefined) {
                  crm.LogTimeIndexed = logs[0].LogTime;
                  crm.save(function(err){
                    callback();
                  });
                }
              }
            } // endif logs length
          });
        },
        function(err){
          if (err) console.log(err);
          console.log('Done!');
        }
      );
    });
  },
  PRSTPageWithOwnerCard: function(next) {
    console.log('Starting job "PRSTPageWithOwnerCard"');
    models.PRSTPage.find({}, function(err, pages) {
      async.each(
        pages,
        function(page, callback) {
          if (page.IsStructural == '0') {
            if (parseInt(page.OwnerID, 10) > 0) {
              console.log(page.OwnerID);
              
              crmModels.CRMContactObject.find({ PersonID: page.OwnerID.toString() }, function(err, crmObj) {
                if (err) console.log(err);
                if (crmObj.length === 1) {
                  page.OwnerCard = crmObj[0]._id;
                  page.save(function(err){
                    if (err) console.log(err);
                    callback();
                  });  
                
                } else {
                  console.log('Crm c obj length was '+crmObj.length);
                  callback();
                }
                
              });
            } else {
              console.log('Owner ID is null, continuing...');
              callback();
            }
          } else {
            page.remove(function(err){
              if (err) console.log(err);
              callback();
            });
          }
        },
        function(err) {
          if (err) console.log(err);
          console.log('Done!');
          next();
        }
      );
    });
  },

  CRMContactObjectsWithOrg: function (next) {
    console.log('Starting job "CRMContactObjectsWithOrg"');
    crmModels.CRMContactObject.find({}).populate('PersonObject').exec(function (err, page) {
      async.each(
        page,
        function (crmObj, callback) {
          if (crmObj.PersonObject !== null) {

            models.Organization.findOne({_id: crmObj.PersonObject.OrgMembership[0]}, function (err, org) {
              /**
               * Parse in org details on customer card and save
               */
              //console.log(crmObj.PersonObject);
              if (org) {
                crmObj.Organization.OrgName                     = org.OrgName;
                crmObj.Organization.PostAddress                 = crmObj.PersonObject.Address1;
                crmObj.Organization.PostNumber                  = crmObj.PersonObject.Zipcode;
                crmObj.Organization.PostOrt                     = crmObj.PersonObject.City;
                crmObj.Organization.Tel1                        = crmObj.PersonObject.Phone;
                crmObj.Organization.Tel2                        = crmObj.PersonObject.Mobile;
                crmObj.Organization.WWW                         = crmObj.PersonObject.Url;
                // Does not exist crmObj.Organization.OrgNumber = org.OrgName,
                // Does not exist crmObj.Organization.Lan       = String,
                crmObj.Organization.Country                     = crmObj.PersonObject.CountryID;
                
                crmObj.Invoice.OrgName                          = org.OrgName;
                //crmObj.Invoice.RefName: String,
                crmObj.Invoice.PostAddress                      = crmObj.PersonObject.Address1;
                crmObj.Invoice.PostNumber                       = crmObj.PersonObject.Zipcode;
                crmObj.Invoice.PostOrt                          = crmObj.PersonObject.City;
                crmObj.Invoice.OrgNumber                        = crmObj.PersonObject.City;
                
              } else {
                crmObj.Organization.OrgName                     = '';
                crmObj.Organization.PostAddress                 = '';
                crmObj.Organization.PostNumber                  = '';
                crmObj.Organization.PostOrt                     = '';
                crmObj.Organization.Tel1                        = '';
                crmObj.Organization.Tel2                        = '';
                crmObj.Organization.WWW                         = '';
                // Does not exist crmObj.Organization.OrgNumber = org.OrgName,
                // Does not exist crmObj.Organization.Lan       = String,
                crmObj.Organization.Country                     = '';
                
                crmObj.Invoice.OrgName                          = '';
                //crmObj.Invoice.RefName: String,
                crmObj.Invoice.PostAddress                      = '';
                crmObj.Invoice.PostNumber                       = '';
                crmObj.Invoice.PostOrt                          = '';
                crmObj.Invoice.OrgNumber                        = '';
                
              } 
              // Clean up schema
              crmObj.set('OrgName'       , undefined, { strict: false });
              crmObj.set('FirstName'     , undefined, { strict: false });
              crmObj.set('LastName'      , undefined, { strict: false });
              crmObj.set('PersonalTitle' , undefined, { strict: false });
              crmObj.set('Address1'      , undefined, { strict: false });
              crmObj.set('Address2'      , undefined, { strict: false });
              crmObj.set('Zipcode'       , undefined, { strict: false });
              crmObj.set('City'          , undefined, { strict: false });
              crmObj.set('Phone'         , undefined, { strict: false });
              crmObj.set('Fax'           , undefined, { strict: false });
              crmObj.set('Mobile'        , undefined, { strict: false });
              crmObj.set('Email'         , undefined, { strict: false });
              crmObj.set('Url'           , undefined, { strict: false });
              crmObj.set('CountryID'     , undefined, { strict: false });
              crmObj.set('ObjectTypeID'  , undefined, { strict: false });
              crmObj.set('ShortOrgName'  , undefined, { strict: false });
              crmObj.set('TextField1'    , undefined, { strict: false });
              crmObj.set('TextField2'    , undefined, { strict: false });
              crmObj.set('TextField3'    , undefined, { strict: false });
              crmObj.set('UniquePhone'   , undefined, { strict: false });
              crmObj.set('OrgNumber'     , undefined, { strict: false });

              crmObj.save(function (err, cat) {
                if (err) console.log(err);
                callback();
              });
            });

          } else {
            // Person object is null!
            crmObj.Organization.OrgName                     = '';
            crmObj.Organization.PostAddress                 = '';
            crmObj.Organization.PostNumber                  = '';
            crmObj.Organization.PostOrt                     = '';
            crmObj.Organization.Tel1                        = '';
            crmObj.Organization.Tel2                        = '';
            crmObj.Organization.WWW                         = '';
            // Does not exist crmObj.Organization.OrgNumber = org.OrgName,
            // Does not exist crmObj.Organization.Lan       = String,
            crmObj.Organization.Country                     = '';
            
            crmObj.Invoice.OrgName                          = '';
            //crmObj.Invoice.RefName: String,
            crmObj.Invoice.PostAddress                      = '';
            crmObj.Invoice.PostNumber                       = '';
            crmObj.Invoice.PostOrt                          = '';
            crmObj.Invoice.OrgNumber                        = '';
            // Clean up schema
            crmObj.set('OrgName'       , undefined, { strict: false });
            crmObj.set('FirstName'     , undefined, { strict: false });
            crmObj.set('LastName'      , undefined, { strict: false });
            crmObj.set('PersonalTitle' , undefined, { strict: false });
            crmObj.set('Address1'      , undefined, { strict: false });
            crmObj.set('Address2'      , undefined, { strict: false });
            crmObj.set('Zipcode'       , undefined, { strict: false });
            crmObj.set('City'          , undefined, { strict: false });
            crmObj.set('Phone'         , undefined, { strict: false });
            crmObj.set('Fax'           , undefined, { strict: false });
            crmObj.set('Mobile'        , undefined, { strict: false });
            crmObj.set('Email'         , undefined, { strict: false });
            crmObj.set('Url'           , undefined, { strict: false });
            crmObj.set('CountryID'     , undefined, { strict: false });
            crmObj.set('ObjectTypeID'  , undefined, { strict: false });
            crmObj.set('ShortOrgName'  , undefined, { strict: false });
            crmObj.set('TextField1'    , undefined, { strict: false });
            crmObj.set('TextField2'    , undefined, { strict: false });
            crmObj.set('TextField3'    , undefined, { strict: false });
            crmObj.set('UniquePhone'   , undefined, { strict: false });
            crmObj.set('OrgNumber'     , undefined, { strict: false });
            crmObj.save(function (err, cat) {
              if (err) console.log(err);
              callback();
            });
          }
        },
        function (err) {
          if (err) console.log(err);
          console.log('Done!');
          next();
        }
      );
    });
  },

  // Parse CRMContactObjects with Person ID schema
  CRMContactObjectsWithPersonID: function (next) {
    console.log('Starting job "CRMContactObjectsWithPersonID"');
    crmModels.CRMContactObject.find({}, function (err, crmObjects){
      if (err) console.log(err);
      async.each(
        crmObjects,
        function(crm, callback){
          models.Person.findOne({PersonID : crm.PersonID}).populate('OrgMembership').exec(function(err, person){
            if (err) console.log(err);
            if (person) {
              if (person.OrgMembership[0] !== undefined) {
                crm.PersonFullText = person.OrgMembership[0].OrgName +'<br/>'+ person.FirstName+' '+person.LastName;
              } else {
                crm.PersonFullText = person.FirstName+' '+person.LastName;
              }
              // @deprecated
              crm.PersonObject = person._id;
              // Clear personal
              crm.Personal = [];
              var pers = { 
                img: '',
                fullName: person.FirstName+' '+person.LastName,
                title: person.PersonalTitle,
                email: person.Email,
                phone: person.Phone,
                rank: 1,
                personObject: person._id
              }
              crm.Personal.push(pers);

              crm.save(function (err, cat) {
                if (err) console.log(err);
                callback();
              });
            } else {
              console.log('No corresponding person for '+crm._id);
              callback();
            }
          });
        },
        function(err){
          if (err) console.log(err);
          console.log('Done!');
          next();
        }
      );
    });
  },

  // Load person >> load login >> load group name >> save group name as fulltext to CRMContactObject
  parsecrmlogingroup: function (req, res) {
    var written = 0;
    crmModels.CRMContactObject.find({}, function (err, crmObjects){
      async.each(
        crmObjects,
        function(crm, callback){
          models.Login.findOne({PersonID: crm.PersonID}, function(err, login){
            //console.log(login);
            if (login) {

              if (login.AccessMembership !== undefined) {
                console.log(login.AccessMembership);
                models.AccessGroup.findOne({GroupID: login.AccessMembership}, function(err, memship) {
                  crm.AccessGroupFullText = memship.TechName;
                  crm.save(function(err, result){
                    written++;
                    callback();
                  });
                })
              } else {
                console.log('Could not find AccessMembership for crm id '+crm._id);
                callback();
              }
            } else {
              console.log('Can´t find login for crm id '+crm._id);
              callback();
            }
            
          });
        },
        function(err){
          console.log('Entries written: '+written);
          console.log('Done!');
        }
      );
    });
  },

  // Parse crm object responsibility
  crmobjectresponsibility: function (req, res) {
    var writtenToDb = 0;
    models.CRMObjectResponsibility.find({}, function(err, responsibility) {
      console.log('Finding responsibles');
      if (err) console.log(err);
      async.each(
        responsibility,
        function(resp, callback) {
          crmModels.CRMContactObject.findOne({ContactObjectID: resp.ContactObjectID}, function(err, cntct){
            if (err) {
              console.log(err);
              callback();
            }
            if (cntct) {
              models.Login.findOne({LoginID : resp.LoginID}, function(err, login){
                if (err) console.log(err);
                if (login) {
                  console.log('found corresponding login');
                  models.Person.findOne({PersonID: login.PersonID}, function(err, person){
                    if (person) {
                      console.log('Found person, writing to DB...');
                      cntct.ResponsibleObject = person._id;
                      cntct.ResponsibleFullText = person.FirstName+' '+person.LastName;
                      cntct.save(function(err){
                        writtenToDb++;
                        callback();
                      });
                    } else {
                      console.log('Could not find person based on loginID');
                    }
                    
                  });
                } else {
                  console.log('No corresponding person for '+crm._id);
                  callback();
                }
              });

            } else {
              console.log('Could not find object.');
            }
          });
          //console.log(resp);
        },
        function(err) {
          console.log('Number of entries written: '+writtenToDb);
          console.log('Done!');
        }
      );
    });
  },

  // Parse access membership
  // Writes membership level to login table.
  accessmembership: function (req, res) {
    models.Login.find({}, function(err, login){
      console.log('Finding logins');
      if (err) console.log(err);
      async.each(
        login,
        function (lgn, callback) {
          //console.log('Running for '+lgn._id);
          //console.log(lgn.LoginID);
          models.AccessMembership.findOne({LoginID:lgn.LoginID}, function(err, mem){
            if (err) {
              console.log(err);
              callback();
            }
            if (mem) {
              console.log(mem);
              lgn.AccessMembership = parseInt(mem.GroupID,10);
              lgn.save(function(err, lg){
                if (err) console.log(err);
                callback();
              });
            } else {
              console.log('Could not find login');
              callback();
            }
          });
        },
        function(err) {
          console.log('Done!.');
          //callback();
        }
      );
    });
  },

  orgmembership: function (next) {
    models.Person.find({}, function(err, persons) {
      console.log('Finding persons...');
      if (err) console.log(err);
      async.each(
        persons,
        function (person, callback) {
          models.OrgMembership.find({PersonID: person.PersonID}, function (err, memships) {
            if (memships.length > 0 && memships.length < 2) {
              // Found 1 org membership
              models.Organization.findOne({OrgID: memships[0].OrgID}, function (err, org) {
                person.OrgMembership = [];
                person.OrgMembership.push(org._id);
                
                // Clean up person schema
                person.set('InfoText1', undefined, { strict: false });
                person.save(function (err) {
                  callback();
                });
              });
            }
            if (memships.length > 1) {
              console.log('Found more than one orgmembership for person id '+person._id);
              callback();
            }
            if (memships.length < 1) {
              callback();
            }
          });
        },
        function (err) {
          console.log('Done!');
          next();
        }
      );
    });
  }
};