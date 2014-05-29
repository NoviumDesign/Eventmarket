var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    bcrypt = require('bcrypt');

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

var PRSTPage = new Schema({
  PageICID : String,
  Title : String,
  OwnerID : Number,
  IsStructural : String,
  IsMainPage : Number,
  ModInstanceICID : Number,
  Completed : Number,
  Visible : Number,
  Lang : String,
  CreatedDate : String,
  ActivatedDate : String,
  LastUpdated : String,
  ExpiryDate : String,
  Notes : String,
  InfoText1 : String,
  InfoText2 : String,
  InfoText3 : String,
  OrgName : String,
  FirstName : String,
  LastName : String,
  Address1 : String,
  Address2 : String,
  Zipcode : String,
  City : String,
  Phone : String,
  Fax : String,
  Mobile : String,
  Email : String,
  Url : String,
  RegionID : Number,
  CountryID : Number,
  FileID1 : Number,
  FileID2 : Number,
  FileID3 : Number,
  FileID4 : Number,
  CounterID1 : Number,
  CounterID2 : Number,
  CounterID3 : Number,
  CounterID4 : Number,
  CounterID5 : Number,
  TextField1 : String,
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
    PRSTPage: mongoose.model('PRSTPage', PRSTPage)
};
