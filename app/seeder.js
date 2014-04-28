var mongoose = require('mongoose'),
    models = require('./models'),
    md5 = require('MD5');

var pres1 = 'Att vara artist är inte bara ett jobb för Labero, det är en livslång passion. Hans livsfilosofi är att förverkliga sina drömmar. “Jag tror att som artist kan man aldrig bli helt tillfredsställd, det finns alltid någonting som kan bli bättre, det finns alltid rum för utveckling. Jag tror på att alltid förbereda sig för nästa steg. ”Joe Labero är idag en av världens största magiker. Han är hjärnan bakom några av de mest häpnadsväckande illusionerna du någonsin kommer att se! Joe Labero startade sin karriär redan som tolvåring då han fick en trollerilåda av sina föräldrar. Hans magiska shower blev ett populärt inslag på barnkalas och skoldanser. 1978 kom Joe, som då hade artistnamnet Magino, med i organisationen Svensk Magisk Cirkel. När han uppträdde första gången i Svenska juniormästerskapen 1980, så vann han. Ett år senare vann han en talangjakt och fick som pris att åka till USA och underhålla vid den svensk-amerikanska nationaldagen. Detta följdes upp med hans första tv-debut, som leddes av den kända cirkusdirektören Trolle Rhodin. Joe jobbade hårt och blev anlitad som underhållare av flera stora svenska företag. Han blev även anlitad utomlands och arbetade på flera olika platser runt om i världen, bland annat framförde han13 gala-shower för Magic Hands i Tyskland, underhöll på Sunwing-hotellen på Kanarieöarna och på lyxkryssaren M/S Funchal. Mellan varven höll han även i en trolleriskola på TV2 som det totalt sändes 19 program av. Det verkligt stora genombrottet kom när Joe Labero 1991 satte upp ”A Magic Night” på Berns Salonger i Stockholm. Denna produktion lovordades i pressen och succén var ett faktum. Under de senaste åren har han gjort mer än 200 shower i sitt nya hemland Australien. Under hösten 2013 kommer han göra en exklusiv Sverige-turné med namnet: ”20 år senare”. Utöver sin otroliga popularitet har Labero blivit ärad av sina magikerkollegor med det prestigefyllda Merlin Award, jämförbart med en Oscar. Priset fick han med motiveringen: ” for continuing achievement in the art of magic”.';
var pres2 = 'För 30 år sedan, den 26 februari 1983, stegade en ung sångerska upp på scenen i Melodifestivalen på Palladium i Malmö. Hon var då endast 16 år men hennes röst och utstrålning slog knockout på både jurygrupper och svenska folket. Sedan slog hon alla rekord i sålda LP, singlar och kassetter och i publik på folkparkerna. Med låten Främling blev hon allas vår Carola!';
module.exports = {
    check: function() {
        models.Event.find({}, function(err, events) {
            if (events.length === 0) {
                console.log('Seeding with events...');
                var newEvent = new models.Event({
                    profileHeader:  'Joe Labero',
                    profilePhoto:   'http://iloveboras.se/wp-content/uploads/2011/10/Joe_Labero-490x318.jpg',
                    contact:        '5356c69ad84acb79e8ba5035',
                    companyInformation : { 
                        phone1: '08-123123123',
                        phone2: '0702-12312312',
                        url: 'http://labero.se/',
                        email: 'info@labero.se',
                        location: 'Stockholm, Sverige',
                        presentation: pres1,
                        extra: 'Extra',
                        offer: 'Offer',
                        map: 'Map',
                        media: 'Media'
                    },
                    category: 'Underhållning',
                    subCategory: [{value:'Company'}],
                    subOption: [{value:'magic'}],
                    activeFrom: '2014-01-01',
                    activeTo: '2099-12-31',
                    created: '2014-04-23',
                    updated: '2014-04-23',
                    listPosition: 1

                });
                newEvent.save(function(err, events) {
                    console.log(err);
                    console.log(events);
                });

                // singers-female
                var newEvent = new models.Event({
                    profileHeader:  'Carola Häggkvist',
                    profilePhoto:   'http://rickarderiksson.com/wp-content/uploads/084_2.jpg',
                    contact:        '5356c69ad84acb79e8ba5036',
                    companyInformation : { 
                        phone1: '08-123123123',
                        phone2: '0702-12312312',
                        url: 'http://www.carola.com/',
                        email: 'info@carola.com',
                        location: 'Stockholm, Sverige',
                        presentation: pres2,
                        extra: 'Extra',
                        offer: 'Offer',
                        map: 'Map',
                        media: 'Media'
                    },
                    category: 'Underhållning',
                    subCategory: [{value:'Company'}],
                    subOption: [{value:'singers-female'}],
                    activeFrom: '2014-01-01',
                    activeTo: '2099-12-31',
                    created: '2014-04-23',
                    updated: '2014-04-23',
                    listPosition: 2

                });
                newEvent.save(function(err, events) {
                    console.log(err);
                    console.log(events);
                });
            }
        });

        models.Contact.find({}, function(err, contacts) {
            if (contacts.length === 0) {
                console.log('no contacts found, seeding...');
                var newContact = new models.Contact({
                    email: 'jkat98@gmail.com',
                    name: {
                        first: 'Jason',
                        last: 'Krol'
                    },
                    phone: '215-123-1234',
                    gravatar: md5('jkat98@gmail.com')
                });
                newContact.save(function(err, contact) {
                    console.log('successfully inserted contact: ' + contact._id);
                });

                newContact = new models.Contact({
                    email: 'testerson@example.com',
                    name: {
                        first: 'Steve',
                        last: 'Testerson'
                    },
                    phone: '215-123-1234',
                    gravatar: md5('testerson@example.com')
                });
                newContact.save(function(err, contact) {
                    console.log('successfully inserted contact: ' + contact._id);
                });

                newContact = new models.Contact({
                    email: 'nancy@testerson.com',
                    name: {
                        first: 'Nancy',
                        last: 'Testerson'
                    },
                    phone: '215-123-1234',
                    gravatar: md5('nancy@testerson.com')
                });
                newContact.save(function(err, contact) {
                    console.log('successfully inserted contact: ' + contact._id);
                });
            } else {
                console.log('found ' + contacts.length + ' existing contacts!');
            }
        });
    }
};
