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
 * 
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
  // Parse CRMContactObjects with Person ID schema
  CRMContactObjectsWithPersonID: function (next) {
    crmModels.CRMContactObject.find({}, function (err, crmObjects){
      console.log('found contact objects');
      if (err) console.log(err);
      async.each(
        crmObjects,
        function(crm, callback){
          //crmModels.CRMContactObject.find({'PersonObject.City' : 'STOCKHOLM'}).populate('PersonObject').exec(function (err, crm) {
          //  console.log(crm);
          //});
          models.Person.findOne({PersonID : crm.PersonID}).populate('OrgMembership').exec(function(err, person){
            if (err) console.log(err);
            if (person) {
              //console.log(person.OrgMembership[0]);
              if (person.OrgMembership[0] !== undefined) {
                crm.PersonFullText = person.OrgMembership[0].OrgName +'<br/>'+ person.FirstName+' '+person.LastName;
              } else {
                crm.PersonFullText = person.FirstName+' '+person.LastName;
              }
              crm.PersonObject = person._id;
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