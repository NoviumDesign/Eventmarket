var models = require('../app/models');
var url    = require('url');

module.exports = {
    events: function(req, res) {
        var q = {};

        var url_parts = url.parse(req.url, true);
        q["$or"] = [];
        
        for (var key in url_parts.query) {
            if (key == 'filtering') {
                if (url_parts.query[key] !== 'All') {
                    q["$and"] = [];
                    q["$and"].push( { subCategory: { $elemMatch: { value: url_parts.query[key] } } } );
                } 
            } else {
                q["$or"].push( { subOption: { $elemMatch: { value: key } } } );
            }
        }

        console.log(q);
        
        models.Event.find(q, function(err, data) {
            res.json(data);
        });
    }
}