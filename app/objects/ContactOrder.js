var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    helpers = require('../helpers');

var ContactObject = function(){  

  var hasData = false;
  var isDirty = false;
  var errors  = [];
  var _data = {};

  // Gamla
  // Förnya profilsida (1, 77, 1, 1, N'PrstPageRenewal', 2, N'OrderType_PresentationRenewal', 79, 4);
  // Sälj in Profilsida (2, 77, 0, 0, N'Banner', 2, N'OrderType_Banner', 79, 2);
  // Kundvårda (3, 77, 0, 0, N'Crm', 2, N'OrderType_Crm', 79, 1);
  // Övrigt (4, 77, 0, 0, N'Other', 2, N'OrderType_Other', 79, 5);
//(5, 77, 0, 0, N'Sales', 2, N'OrderType_Sales', 79, 3);
  // Släck (6, 77, 0, 0, N'Deactivate', 2, N'OrderType_Deactivate', 79, 6);
//(7, 77, 0, 0, N'Expo', 2, N'OrderType_Expo', 79, 7);
//(9, 77, 1, 1, N'BanrBannerRenewal', 2, N'OrderType_BannerRenewal', 79, 8);
  // Demosida (13, 77, 0, 0, N'DemoPage', 2, N'OrderType_DemoPage', 79, 9);
  // Nya
  // option(value="1") Förnya profilsida 
  // option(value="2") Sälj in Profilsida
  // option(value="13") Demosida
  // option(value="3") Kundvårda
  // option(value="6") Släck
  // option(value="21") Erbjudande 
  // option(value="22") Mailannons 
  // option(value="23") Meeting
  // option(value="4") Övrigt


  var CRMContactOrder = new Schema({
    ContactOrderID  : String, // @deprecated
    ModInstanceICID : String, // @deprecated
    ContactObjectID : String, // @deprecated
    CardObjectRef   : { type: ObjectId }, // Ok
    OrderType       : String, // Ok
    Priority        : String, // @deprecated
    CreatedDate     : String, // Ok
    ExecuteDate     : String, // Ok
    Description     : String, // Ok
    Comment         : String, // Ok
    UniqueOrderKey  : String, // @deprecated
    Responsible     : { type: Schema.Types.ObjectId, ref: 'Person' }, // Ok
    CreatedBy       : { type: Schema.Types.ObjectId, ref: 'Person' }, // Ok
    LastUpdated     : String // Ok
  }, { collection: 'CRMContactOrder'});

  var dbModel = mongoose.model('CRMContactOrder', CRMContactOrder)

  function validate() {
    console.log('Validating!');
    errors = [];
    if (_data.Description == undefined || _data.Description.length < 1) {
      errors.push('Beskrivning kan inte vara tom!');
    }
    if (_data.CreatedDate == undefined || _data.CreatedDate.length < 1) {
      _data.CreatedDate = helpers.sqlDateFormat(new Date());
    }
    if (_data.ExecuteDate == undefined || _data.ExecuteDate.length < 1) {
      errors.push('Datum för kommande kontakt kan inte vara tomt!')
    }
}

  /**
   * Retains other existing data
   * Validates.
   * @param {object} data Key value object matching Schema
   */
  var _addData = function (data) {
    // Keep existing data
    for (var key in data) {
      _data[key] = data[key];
    }
    isDirty = true;
    validate();
    return ContactObject;
  };

  /**
   * Save the object
   * 
   * @param  {function} callBack Callback with optional error
   */
  var _save = function (callBack) {
    if (errors.length > 0) {
      callBack(errors);
    } else {

      if (_data._id) {
        // model.findById(objectId, function (err, result) {
        //   _data = result;
        //   callBack(err, result);
        // });
      } else {
        console.log(_data);
        obj = new dbModel(_data);
        obj.LastUpdated = helpers.sqlDateFormat(new Date());
        obj.save(function(err){
          if (err) {
            callBack(err);
          }
          callBack();
        });
      }
    } // endif errors
  }

  var _loadById = function (objectId, callBack) {
    dbModel.findById(objectId, function (err, result) {
      _data = result;
      callBack(err, result);
    });
  };

  var _hasData = function () {
    return hasData;
  };

  return {
    save : _save,
    addData : _addData,
    hasData : _hasData,
    loadById: _loadById
  };
}();
module.exports = ContactObject;
