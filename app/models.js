var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    ObjectId = Schema.ObjectId,
    bcrypt = require('bcrypt');

autoIncrement.initialize(mongoose.connection);

var Event = new Schema({
    profileHeader:  { type: String },
    profilePhoto:   { type: String },
    contact:        { type: ObjectId },
    companyInformation : { 
        phone1: String,
        phone2: String,
        url: String,
        email: String,
        location: String,
        presentation: String,
        extra: String,
        offer: String,
        map: String,
        media: String
    },
    category: String,
    subCategory: [{ value: String }],
    subOption: [{ value: String }],
    activeFrom: String,
    activeTo: String,
    created: String,
    updated: String,
    listPosition: String
});

var Contact = new Schema({
    email:      { type: String },
    name: {
        first:  { type: String },
        last:   { type: String }
    },
    phone:      { type: String },
    gravatar:   { type: String }
});

var User = new Schema({
    created : String,
    status  : String,
    access  : String,
    username: String,
    password: String,
    mainEmail : String
});
var Person = new Schema({
  PersonID : { type: Number },
  PersonCreated : String,
  CultureID : String,
  Hidden : String,
  LastUpdated : String,
  NewAutoReg : String,
  FirstName : String,
  LastName : String,
  PersonalTitle : String,
  Address1 : String,
  Address2 : String,
  Zipcode : String,
  City : String,
  Phone : String,
  Fax : String,
  Mobile : String,
  Email : String,
  Url : String,
  Attribute1 : String,
  Attribute2 : String,
  Attribute3 : String,
  CountryID : String,
  RegionID : String,
  Notes : String,
  IDNumber : String,
  OrgMembership : [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  BoolField1 : String,
  /* InfoText1 : String, */
  InfoText2 : String,
  InfoText3 : String,
  IntField1 : String,
  IntField2 : String,
  BoolField2 : String,
  NotificationTypePrstRqstOpen : String,
  NotificationTypePrstRqstDirect : String
}, { collection: 'Person' });
var Country = new Schema({
  CountryID : { type: Number },
  EntityName : String,
  EntityOwnerICID : { type: Number },
  TechName : String
}, {collection: 'Country'});
var Culture = new Schema({
  CultureID : { type: Number },
  CultureName : String,
  AdminCulture : String,
  PublicCulture : String,
  Lang : String
}, {collection:'Culture'});
var Region = new Schema({
  RegionID : { type: Number },
  RegionName : String,
  CountryID : { type: Number },
  SortOrder : { type: Number }
}, {collection:'Region'});
var AccessGroup = new Schema({
  GroupID         : String,
  EntityName      : String,
  EntityOwnerICID : String,
  AutoReg         : String,
  TechName        : String
}, {collection: 'AccessGroup'});
var AccessMembership = new Schema({
  GroupID : String,
  LoginID : String
}, {collection: 'AccessMembership'});
var CRMObjectResponsibility = new Schema({
  ContactObjectID : String,
  LoginID : String
}, {collection: 'CRMObjectResponsibility'});
// Unused in production
var OrgMembership = new Schema({
  PersonID : String,
  OrgID : String
}, {collection:'OrgMembership'});
var Organization = new Schema({
  OrgID       : String,
  OrgName     : String,
  OrgCreated  : String,
  LastUpdated : String,
  CountryID   : String,
  OrgIDNumber : String
}, {collection:'Organization'});

var Login = new Schema({
  LoginID : { type: Number },
  LoginName : String,
  DisabledUntil : String,
  Pwd : String,
  PwdCreated : String,
  SuperUser : String,
  RootAdmin : String,
  LastUpdated : String,
  Disabled : String,
  PersonID : { type: Number },
  CreatedBy : String,
  LastOKLogin : String,
  NoOfFailedLogins : String,
  AutoLogin : String,
  ValidUntil : String,
  AccessMembership: Number
}, { collection: 'Login'});
// @deprecated
Login.methods.logSomething = function (item, next) {
  console.log(item);
  next();
}
// @deprecated
Login.methods.addPostData = function (post, next) {
  if (post._id) {
    this.findById(post._id, function (err, login) {
      console.log(login);
      next();
    });
  }
  //console.log(this);
  next();  
}
var BANRBanner = new Schema({
  category: [{ value: String }],
  subCategory: [{ value: String }],
  BannerICID : String,
  ModInstanceICID : String,
  BannerName : String,
  StartDate : String,
  EndDate : String,
  FormatID : String,
  ImageID : String,
  ExpCounterID : String,
  ClickCounterID : String,
  Url : String,
  AltText : String,
  OwnerID : String,
  OwnerName : String,
  OwnerOrg : String,
  Notes : String,
  Completed : String,
  Lang : String,
  LastUpdated : String,
  OwnerEmail : String
}, { collection: 'BANRBanner'});
var Category = new Schema({
  CategoryICID : String,
  ModInstanceICID : String,
  Name : String,
  DisplayName : String,
  Lang : String,
  EnableItems : String,
  EnableSubCats : String,
  PublicCategory : String,
  Visible : String,
  SortOrder : String,
  CategoryType : String,
  SysCategory : String,
  Price : String,
  PriceScaleFactor : String,
  DateField1 : String,
  IntField1 : String,
  BoolField1 : String,
  InfoText1 : String,
  TechName : String,
  PersonID : String,
  LastUpdated : String,
  OnlyShowInFilter : String,
  TextField1 : String,
  FileID1 : String,
  TextField2 : String,
  TextField3 : String,
  TextField4 : String,
  TextField5 : String,
  TextField6 : String,
  TextField7 : String,
  TextField8 : String,
  TextField9 : String,
  TextField10 : String,
  FileID2 : String,
  InfoText2 : String
}, { collection: 'Category'});
var PRSTPage = new Schema({
  PageICID : String,
  Title : String, // Used
  OwnerID : String, // Used
  IsStructural : String, // Used
  // Relates to CRMContactObject
  OwnerCard: { type: Schema.Types.ObjectId, ref: 'CRMContactObject' },
  // Fetch from CrmContactObject if empty
  OrgName : String,
  // Contact name
  TextField1 : String,
  Address1 : String,
  Zipcode : String,
  City : String,
  RegionID : Number,
  CountryID : Number,
  Phone : String,
  Mobile : String,
  Email : String,
  FacebookURL: String,
  TwitterURL: String,
  InstaURL: String,
  LogoImg: String,

  EventText: String,
  LargestCompany: String,
  NoMeetingRooms: String,
  LargestMeetingRoom: String,
  SittingGuests: String,
  MingleGuests: String,
  NoBeds: String,
  price: String,
  newCategory: [{ value: String }],

  presTitle: String,
  // Presentation text
  InfoText1 : String,
  extraTabName: String,
  extraTitle: String,
  extraText: String,
  media950: String,
  text950: String,
  mapAddress: String,

  pageType: String,
  ActivatedDate : String,
  ExpiryDate : String,
  TopDate: String,
  TopEndDate: String,
  Visible : String,
  seoUrl: String,
  seoTitle: String,
  seoDescription: String,
  seoTags: String,
  CreatedDate : String,
  LastUpdated : String,
  // Mostly not used below :
  // 
  // 
  IsMainPage : Number,
  ModInstanceICID : Number,
  Completed : Number,
  Lang : String,
  Notes : String,
  InfoText2 : String,
  InfoText3 : String,
  // replaced with ContactName FirstName : String,
  // replaced with ContactName LastName : String,
  // deprecated Address2 : String,
  // deprecated Fax : String,
  Url : String,
  FileID1 : Number,
  FileID2 : Number,
  FileID3 : Number,
  FileID4 : Number,
  CounterID1 : Number,
  CounterID2 : Number,
  CounterID3 : Number,
  CounterID4 : Number,
  CounterID5 : Number,
  TextField2 : String,
  TextField3 : String,
  TextField4 : String,
  TextField5 : String,
  BoolField1 : Number,
  BoolField2 : Number,
  BoolField3 : Number,
  BoolField4 : Number,
  BoolField5 : Number,
  DateField1 : String,
  DateField2 : String,
  DateField3 : String,
  DateField4 : String,
  DateField5 : String,
  DecimalField1 : Number,
  DecimalField2 : Number,
  DecimalField3 : Number,
  DecimalField4 : Number,
  DecimalField5 : Number,
  IntField1 : Number,
  IntField2 : Number,
  IntField3 : Number,
  IntField4 : Number,
  IntField5 : Number,
  Approved : Number,
  RenewalDate : String,
  ActiveStatus : Number,
  TextField6 : String,
  TextField7 : String,
  TextField8 : String,
  TextField9 : String,
  IntField6 : Number,
  PrstPageTypeID : Number,
  TextField10 : String,
  NewlyCreated : Number,
  CreatedByAdmin : Number,
  LastDisplayed : String,
  SystemInactivatedRequests : Number,
  SelfInactivatedRequests : Number,
  CounterID6 : Number,
  CounterID7 : Number,
  TextField11 : String,
  TextField12 : String,
  TextField13 : String,
  TextField14 : String
}, { collection: 'PRSTPage' });
//console.log(User);
var newCategory = new Schema({
  topLevel: String,
  parent : String,
  name : String,
  displayName : String,
  visible : String,
  sortOrder: String,
  createdDate: String,
  createdBy: String,
  lastUpdate: String,
  notes: String,
  icon : String
}, {collection:'newCategory'});
/**User.methods.validPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (res == true) {
      console.log('Was correct!');
    } else {
      console.log('')
    }
  });
  
}*/

module.exports = {
    Event: mongoose.model('Event', Event),
    Contact: mongoose.model('Contact', Contact),
    User: mongoose.model('User', User),
    PRSTPage: mongoose.model('PRSTPage', PRSTPage),
    Person: mongoose.model('Person', Person),
    Login: mongoose.model('Login', Login),
    BANRBanner: mongoose.model('BANRBanner', BANRBanner),
    Category: mongoose.model('Category', Category),
    newCategory: mongoose.model('newCategory', newCategory),
    Country: mongoose.model('Country', Country),
    Culture: mongoose.model('Culture', Culture),
    Region: mongoose.model('Region', Region),
    AccessMembership: mongoose.model('AccessMembership', AccessMembership),
    CRMObjectResponsibility: mongoose.model('CRMObjectResponsibility', CRMObjectResponsibility),
    AccessGroup: mongoose.model('AccessGroup', AccessGroup),
    OrgMembership: mongoose.model('OrgMembership', OrgMembership),
    Organization: mongoose.model('Organization', Organization)
};
