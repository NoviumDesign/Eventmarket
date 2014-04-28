var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

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
    mainEmail : String,
    profile : {
        provider    : String,
        id          : String,
        displayName : String,
        name : {
            familyName : String,
            givenName  : String,
            middleName : String
        },
        emails : [{
            value : String
        }],
        photos : [{
            value : String
        }]
    }

});


module.exports = {
    Event: mongoose.model('Event', Event),
    Contact: mongoose.model('Contact', Contact),
    User: mongoose.model('User', User)
};
