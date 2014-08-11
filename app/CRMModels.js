var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    ObjectId = Schema.ObjectId,
    bcrypt = require('bcrypt');
var CRMContactLog = new Schema({
  LogID           : String,
  LoginID         : String,
  ContactObjectID : String,
  LogType         : String,
  LogTime         : String
}, {collection: 'CRMContactLog'});
var CRMContactObject = new Schema({
  ResponsibleFullText : String,
  ResponsibleObject   : { type: Schema.Types.ObjectId, ref: 'Person' }, // Id of responsible customer contact object
  PersonFullText      : String,
  PersonObject        : { type: Schema.Types.ObjectId, ref: 'Person' },
  AccessGroupFullText : String,
  LogTimeIndexed      : String,
  
  PageICID        : String,
  ContactObjectID : String,
  ModInstanceICID : Number,
  LastContact     : String,
  Summary         : String,
  // Interests
  intresse: [{ value: String }],
  // Replaces summary
  Historik : [{
    typ: String,
    datum: String,
    freeContent: String,
    createdBy: String
  }],
  PersonID        : String,
  LastUpdated     : String,
  LogoURL : String,
  Organization : {
    OrgName : String,
    PostAddress: String,
    PostNumber: String,
    PostOrt : String,
    Tel1 : String,
    Tel2 : String,
    WWW: String,
    OrgNumber: String,
    Lan: String,
    Country: String
  },
  Invoice: {
    OrgName: String,
    RefName: String,
    PostAddress: String,
    PostNumber: String,
    PostOrt: String,
    OrgNumber: String,
    InvoiceEmail: String
  },
  Personal:[{
    img: String,
    fullName: String,
    title: String,
    email: String,
    phone: String,
    rank: String,
    personObject: { type: Schema.Types.ObjectId, ref: 'Person' } 
  }],
  Tags : [{ value: String }]
  /*OrgName         : String,
  FirstName       : String,
  LastName        : String,
  PersonalTitle   : String,
  Address1        : String,
  Address2        : String,
  Zipcode         : String,
  City            : String,
  Phone           : String,
  Fax             : String,
  Mobile          : String,
  Email           : String,
  Url             : String,
  CountryID       : Number,
  ObjectTypeID    : Number, 
  ShortOrgName    : String,
  TextField1      : String,
  TextField2      : String,
  TextField3      : String,
  UniquePhone     : String,
  OrgNumber       : String*/
}, { collection: 'CRMContactObject'});

module.exports = {
    CRMContactObject : mongoose.model('CRMContactObject', CRMContactObject),
    CRMContactLog    : mongoose.model('CRMContactLog', CRMContactLog)
};