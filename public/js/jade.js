this["JST"] = this["JST"] || {};

this["JST"]["client/templates/hitlist-medium"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),_id = locals_._id,LogoImg = locals_.LogoImg,Title = locals_.Title,City = locals_.City,InfoText1 = locals_.InfoText1,newCategory = locals_.newCategory,LargestCompany = locals_.LargestCompany,NoMeetingRooms = locals_.NoMeetingRooms,LargestMeetingRoom = locals_.LargestMeetingRoom,SittingGuests = locals_.SittingGuests,MingleGuests = locals_.MingleGuests,NoBeds = locals_.NoBeds;
buf.push("<div data-equalizer-watch=\"data-equalizer-watch\" class=\"panel small-12 medium-6 large-6 columns\"><a" + (jade.attr("data-reveal-id", 'profileside' + (_id) + '', true, false)) + "><div class=\"informationbox small-12 medium-12 large-12 columns\"><img" + (jade.attr("src", '' + (LogoImg) + '', true, false)) + " alt=\"\" class=\"thumbnailsmall show-for-medium-up right\"/><h2>" + (jade.escape((jade.interp = Title) == null ? '' : jade.interp)) + "</h2><p class=\"location\">" + (jade.escape((jade.interp = City) == null ? '' : jade.interp)) + "</p><p>" + (jade.escape((jade.interp = InfoText1) == null ? '' : jade.interp)) + "</p>");
var lokaler = ['53e1126ddf7d890000809785', '53e1127adf7d890000809786', '53e1128cdf7d890000809787', '53e1129edf7d890000809788', '53e112afdf7d890000809789', '53e112c0df7d89000080978a', '53e112dbdf7d89000080978b', '53e112eadf7d89000080978c', '53e112f9df7d89000080978d', '53e11308df7d89000080978e', '53e11316df7d89000080978f']; 
var isConf = false;
for (var cKey in newCategory) {
{
if (lokaler.indexOf(newCategory[cKey]['value']) !== -1) {
{
isConf = true;
}
}
}
}
if (isConf) {
{
buf.push("<i><svg viewbox=\"0 0 32 32\" class=\"icon icon-sallskap\"><use xlink:href=\"#icon-sallskap\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = LargestCompany) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-motesplatser\"><use xlink:href=\"#icon-motesplatser\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = NoMeetingRooms) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-moteslokal\"><use xlink:href=\"#icon-moteslokal\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = LargestMeetingRoom) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mat\"><use xlink:href=\"#icon-mat\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = SittingGuests) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mingel\"><use xlink:href=\"#icon-mingel\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = MingleGuests) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-logi\"><use xlink:href=\"#icon-logi\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = NoBeds) == null ? '' : jade.interp)) + "</span></i>");
}
}
buf.push("</div><div class=\"arrowcontainer show-for-medium-up\"><div class=\"arrow\"></div></div></a></div>");;return buf.join("");
};

this["JST"]["client/templates/hitlist-small"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),_id = locals_._id,Title = locals_.Title,InfoText1 = locals_.InfoText1,newCategory = locals_.newCategory,LargestCompany = locals_.LargestCompany,NoMeetingRooms = locals_.NoMeetingRooms,LargestMeetingRoom = locals_.LargestMeetingRoom,SittingGuests = locals_.SittingGuests,MingleGuests = locals_.MingleGuests,NoBeds = locals_.NoBeds;
buf.push("<div class=\"row\"><div class=\"small-12 columns\"><a" + (jade.attr("data-reveal-id", 'profileside' + (_id) + '', true, false)) + " class=\"hits\"><h2>" + (jade.escape((jade.interp = Title) == null ? '' : jade.interp)) + "</h2><p>" + (jade.escape((jade.interp = InfoText1) == null ? '' : jade.interp)) + "</p>");
var lokaler = ['53e1126ddf7d890000809785', '53e1127adf7d890000809786', '53e1128cdf7d890000809787', '53e1129edf7d890000809788', '53e112afdf7d890000809789', '53e112c0df7d89000080978a', '53e112dbdf7d89000080978b', '53e112eadf7d89000080978c', '53e112f9df7d89000080978d', '53e11308df7d89000080978e', '53e11316df7d89000080978f']; 
var isConf = false;
for (var cKey in newCategory) {
{
if (lokaler.indexOf(newCategory[cKey]['value']) !== -1) {
{
isConf = true;
}
}
}
}
if (isConf) {
{
buf.push("<i><svg viewbox=\"0 0 32 32\" class=\"icon icon-sallskap\"><use xlink:href=\"#icon-sallskap\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = LargestCompany) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-motesplatser\"><use xlink:href=\"#icon-motesplatser\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = NoMeetingRooms) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-moteslokal\"><use xlink:href=\"#icon-moteslokal\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = LargestMeetingRoom) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mat\"><use xlink:href=\"#icon-mat\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = SittingGuests) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mingel\"><use xlink:href=\"#icon-mingel\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = MingleGuests) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-logi\"><use xlink:href=\"#icon-logi\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = NoBeds) == null ? '' : jade.interp)) + "</span></i>");
}
}
buf.push("</a></div></div>");;return buf.join("");
};

this["JST"]["client/templates/hitlist"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),_id = locals_._id,LogoImg = locals_.LogoImg,Title = locals_.Title,InfoText1 = locals_.InfoText1,newCategory = locals_.newCategory,LargestCompany = locals_.LargestCompany,NoMeetingRooms = locals_.NoMeetingRooms,LargestMeetingRoom = locals_.LargestMeetingRoom,SittingGuests = locals_.SittingGuests,MingleGuests = locals_.MingleGuests,NoBeds = locals_.NoBeds;
buf.push("<div data-equalizer=\"data-equalizer\"><div data-equalizer-watch=\"data-equalizer-watch\" class=\"panel small-12 medium-6 large-12 columns\"><a" + (jade.attr("data-reveal-id", 'profileside' + (_id) + '', true, false)) + "><div class=\"thumbnail large-2 columns show-for-large-up\"><img" + (jade.attr("src", '' + (LogoImg) + '', true, false)) + " alt=\"\"/></div><div class=\"informationbox small-12 medium-12 large-10 columns\"><img" + (jade.attr("src", '' + (LogoImg) + '', true, false)) + " alt=\"\" class=\"thumbnailsmall show-for-medium-only right\"/><h2>" + (jade.escape((jade.interp = Title) == null ? '' : jade.interp)) + "</h2><p class=\"location\"></p><p>" + (jade.escape((jade.interp = InfoText1) == null ? '' : jade.interp)) + "</p>");
var lokaler = ['53e1126ddf7d890000809785', '53e1127adf7d890000809786', '53e1128cdf7d890000809787', '53e1129edf7d890000809788', '53e112afdf7d890000809789', '53e112c0df7d89000080978a', '53e112dbdf7d89000080978b', '53e112eadf7d89000080978c', '53e112f9df7d89000080978d', '53e11308df7d89000080978e', '53e11316df7d89000080978f']; 
var isConf = false;
for (var cKey in newCategory) {
{
if (lokaler.indexOf(newCategory[cKey]['value']) !== -1) {
{
isConf = true;
}
}
}
}
if (isConf) {
{
buf.push("<i><svg viewbox=\"0 0 32 32\" class=\"icon icon-sallskap\"><use xlink:href=\"#icon-sallskap\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = LargestCompany) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-motesplatser\"><use xlink:href=\"#icon-motesplatser\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = NoMeetingRooms) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-moteslokal\"><use xlink:href=\"#icon-moteslokal\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = LargestMeetingRoom) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mat\"><use xlink:href=\"#icon-mat\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = SittingGuests) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mingel\"><use xlink:href=\"#icon-mingel\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = MingleGuests) == null ? '' : jade.interp)) + "</span></i><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-logi\"><use xlink:href=\"#icon-logi\"></use></svg><span class=\"icon-text\">" + (jade.escape((jade.interp = NoBeds) == null ? '' : jade.interp)) + "</span></i>");
}
}
buf.push("</div><div class=\"arrowcontainer show-for-medium-up\"><div class=\"arrow\"></div></div></a></div></div>");;return buf.join("");
};

this["JST"]["client/templates/kundkortlistapopup"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),_id = locals_._id;
buf.push("<!--kundkortlistapopup.jade--><div" + (jade.attr("id", "quickInfo" + (_id) + "", true, false)) + " data-reveal=\"data-reveal\" data-options=\"close_on_background_click: true\" class=\"reveal-modal\"><div class=\"row\"><div class=\"small-12 columns\"><h2>Företagsnamn</h2></div><div class=\"small-12 columns\"><h4>Profilsidor</h4><table id=\"customer-table\" class=\"dynamic-table\"><thead><tr><th>Sidans namn</th><th>Kontaktperson</th><th>Sidtyp</th><th>Giltig t.o.m.</th><th>Synlig / Släckt</th></tr></thead><tbody><tr><td>Lindaus bokningssida</td><td>Anders Lundin</td><td>Small</td><td>2013-06-05</td><td><div class=\"green-ball\"></div></td></tr><tr><td>Inlands bussbiljetter</td><td>Kalle Kanin</td><td>Medium</td><td>2013-06-06</td><td><div class=\"red-ball\"></div></td></tr><tr><td>Lindaus bokningssida</td><td>Anders Lundin</td><td>Large</td><td>2013-06-05</td><td><div class=\"green-ball\"></div></td></tr><tr><td>Inlands bussbiljetter</td><td>Kalle Kanin</td><td>Medium</td><td>2013-06-06</td><td><div class=\"red-ball\"></div></td></tr></tbody></table></div><div class=\"small-12 columns\"><h4>Erbjudanden</h4><table id=\"my-table\" class=\"dynamic-table\"><thead><tr><th>Rubrik</th><th>Startdatum</th><th>Slutdatum</th><td>Typ</td><th>Publikt</th></tr></thead><tbody><tr><td>Julbord från 99:-</td><td>2013-02-12</td><td>2014-12-31</td><td>Jul</td><td><div class=\"red-ball\"></div></td></tr><tr><td>Bananer 98:-/styck</td><td>2010-12-23</td><td>2015-12-12</td><td>Event</td><td><div class=\"green-ball\"></div></td></tr><tr><td>Gaffel 1:-/styck</td><td>2010-11-23</td><td>2010-12-24</td><td>Konferens</td><td><div class=\"red-ball\"></div></td></tr><tr><td>Gaffel 1:-/styck</td><td>2010-11-23</td><td>2010-12-24</td><td>Konferens</td><td></td></tr></tbody></table></div></div></div>");;return buf.join("");
};

this["JST"]["client/templates/profileside"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),_id = locals_._id,Title = locals_.Title,LogoImg = locals_.LogoImg,OrgName = locals_.OrgName,TextField1 = locals_.TextField1,Address1 = locals_.Address1,Zipcode = locals_.Zipcode,City = locals_.City,Phone = locals_.Phone,Mobile = locals_.Mobile,Email = locals_.Email,newCategory = locals_.newCategory,LargestCompany = locals_.LargestCompany,NoMeetingRooms = locals_.NoMeetingRooms,LargestMeetingRoom = locals_.LargestMeetingRoom,SittingGuests = locals_.SittingGuests,MingleGuests = locals_.MingleGuests,NoBeds = locals_.NoBeds,categoriesToText = locals_.categoriesToText,media = locals_.media,extraTabName = locals_.extraTabName,presTitle = locals_.presTitle,InfoText1 = locals_.InfoText1,extraTitle = locals_.extraTitle,extraText = locals_.extraText,lat = locals_.lat,lon = locals_.lon;
buf.push("<!-- Model id--><div" + (jade.attr("id", "profileside" + (_id) + "", true, false)) + " data-reveal=\"data-reveal\" class=\"reveal-modal\"><!-- Large content--><section class=\"profileside show-for-large-up\"><div class=\"row\"><div class=\"small-12 columns\"><h2 class=\"profileheader\">" + (jade.escape((jade.interp = Title) == null ? '' : jade.interp)) + "</h2></div></div><div class=\"row\"><div class=\"small-3 columns\"><img" + (jade.attr("src", '' + (LogoImg) + '', true, false)) + " alt=\"\" class=\"profilephoto\"/><h4>Kontakt</h4><ul class=\"companyinformation\"><li>" + (jade.escape((jade.interp = OrgName) == null ? '' : jade.interp)) + "</li><li>" + (jade.escape((jade.interp = TextField1) == null ? '' : jade.interp)) + "</li><li>" + (jade.escape((jade.interp = Address1) == null ? '' : jade.interp)) + "</li><li>" + (jade.escape((jade.interp = Zipcode) == null ? '' : jade.interp)) + " " + (jade.escape((jade.interp = City) == null ? '' : jade.interp)) + "</li></ul><ul class=\"companyinformation\"><li class=\"phonenumber\">" + (jade.escape((jade.interp = Phone) == null ? '' : jade.interp)) + "</li><li class=\"phonenumber paddingbottom\">" + (jade.escape((jade.interp = Mobile) == null ? '' : jade.interp)) + "</li><li><a href=\"#\" class=\"button expand\">Hemsida</a></li><li><a" + (jade.attr("href", 'mailto:' + (Email) + '', true, false)) + " class=\"button expand\">" + (jade.escape((jade.interp = Email) == null ? '' : jade.interp)) + "</a></li></ul><hr/>");
var lokaler = ['53e1126ddf7d890000809785', '53e1127adf7d890000809786', '53e1128cdf7d890000809787', '53e1129edf7d890000809788', '53e112afdf7d890000809789', '53e112c0df7d89000080978a', '53e112dbdf7d89000080978b', '53e112eadf7d89000080978c', '53e112f9df7d89000080978d', '53e11308df7d89000080978e', '53e11316df7d89000080978f']; 
var isConf = false;
for (var cKey in newCategory) {
{
if (lokaler.indexOf(newCategory[cKey]['value']) !== -1) {
{
isConf = true;
}
}
}
}
if (isConf) {
{
buf.push("<h4>Fakta</h4><ul class=\"companyinformation\"><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-sallskap\"><use xlink:href=\"#icon-sallskap\"></use></svg><span class=\"icon-text\">Största sällskap: " + (jade.escape((jade.interp = LargestCompany) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-motesplatser\"><use xlink:href=\"#icon-motesplatser\"></use></svg><span class=\"icon-text\">Antal mötesrum: " + (jade.escape((jade.interp = NoMeetingRooms) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-moteslokal\"><use xlink:href=\"#icon-moteslokal\"></use></svg><span class=\"icon-text\">Största möteslokal: " + (jade.escape((jade.interp = LargestMeetingRoom) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mat\"><use xlink:href=\"#icon-mat\"></use></svg><span class=\"icon-text\">Sittande matgäster: " + (jade.escape((jade.interp = SittingGuests) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mingel\"><use xlink:href=\"#icon-mingel\"></use></svg><span class=\"icon-text\">Mingel/stående: " + (jade.escape((jade.interp = MingleGuests) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-logi\"><use xlink:href=\"#icon-logi\"></use></svg><span class=\"icon-text\">Logi, antal bäddar: " + (jade.escape((jade.interp = NoBeds) == null ? '' : jade.interp)) + "</span></i></li></ul><hr/>");
}
}
buf.push("<h4>Kategorier</h4><p>" + (jade.escape((jade.interp = categoriesToText(newCategory)) == null ? '' : jade.interp)) + "</p><dl><dt>Aktiviteter<div class=\"listarrow\"></div></dt><dd>Mat & Dryckesaktiviteter</dd><dd>Motor</dd><dt>Event & Möteslokaler<div class=\"listarrow\"></div></dt><dd>Fest & Bröllopslokaler</dd><dd>Konferens</dd><dt>Konferenslokaler<div class=\"listarrow\"></div></dt><dd>Konferens</dd><dd>Fest/event</dd><dt>Underhållning<div class=\"listarrow\"></div></dt><dd>Magi/Trolleri</dd><dd>Standup</dd></dl></div><div class=\"small-9 columns\"><ul data-orbit=\"data-orbit\" data-options=\"bullets:false; timer: false; slide_number: false;\" class=\"profile-orbit\">");
for (var mkey in media) {
{
buf.push("<li><img" + (jade.attr("src", media[mkey].img, true, false)) + (jade.attr("alt", media[mkey].bildtext, true, false)) + "/><div class=\"orbit-caption text-right\">" + (jade.escape((jade.interp = media[mkey].bildtext) == null ? '' : jade.interp)) + "</div></li>");
}
}
buf.push("</ul><dl data-tab=\"data-tab\" class=\"tabs profilenav\"><dd class=\"active\"><a href=\"#presentation\" class=\"text-center\">Presentation</a></dd>");
if (extraTabName) {
{
buf.push("<dd><a href=\"#extraheader\" class=\"text-center\">" + (jade.escape((jade.interp = extraTabName) == null ? '' : jade.interp)) + "</a></dd>");
}
}
buf.push("<dd><a href=\"#offer\" class=\"text-center\">Erbjudanden</a></dd><dd><a href=\"#map\" class=\"text-center\">Karta</a></dd><dd><a href=\"#media\" class=\"text-center\">Media</a></dd></dl><div class=\"tabs-content\"><div id=\"presentation\" class=\"content active\"><h2>" + (jade.escape((jade.interp = presTitle) == null ? '' : jade.interp)) + "</h2><p>" + (jade.escape((jade.interp = InfoText1) == null ? '' : jade.interp)) + "</p></div>");
if (extraTabName) {
{
buf.push("<div id=\"extraheader\" class=\"content\"><h2>" + (jade.escape((jade.interp = extraTitle) == null ? '' : jade.interp)) + "</h2><p>" + (jade.escape((jade.interp = extraText) == null ? '' : jade.interp)) + "</p></div>");
}
}
buf.push("<div id=\"offer\" class=\"content\"><img src=\"http://placehold.it/900x300\" alt=\"\"/><p>World Trade Center Stockgolm strävar efter det perfekta. Det perfekta läget. Det perfekta mötet. Det perfekta serviceutbudet.</p><p>Mitt i Stockholm city, 20 minuter från Arlandas landnings-och startbanor och på tröskeln till storstadens utbud, finns World Trade Center med kontor i toppklass och nyrenoverade effektiva konferenslokaler och eventlokaler. Med personal, service och faciliteter i perfekt anda</p><p>Med ambitionen att vara en av landets ledande arrangör av konferenser och möten erbjuder vi också välkompenerade menyer - dag som kväll. Från Piazzan, den perfekta lunchrestaurangen, till WTC Restaurang som serverar á la carte och affärslunch. För sittningar på tu man hand eller fest för många.</p><p>För bokning, ring 079-324 03 97 eller<a href=\"#\">maila oss</a>.</p><hr/><img src=\"http://placehold.it/900x300\" alt=\"\"/><p>World Trade Center Stockgolm strävar efter det perfekta. Det perfekta läget. Det perfekta mötet. Det perfekta serviceutbudet.</p><p>Mitt i Stockholm city, 20 minuter från Arlandas landnings-och startbanor och på tröskeln till storstadens utbud, finns World Trade Center med kontor i toppklass och nyrenoverade effektiva konferenslokaler och eventlokaler. Med personal, service och faciliteter i perfekt anda</p><p>Med ambitionen att vara en av landets ledande arrangör av konferenser och möten erbjuder vi också välkompenerade menyer - dag som kväll. Från Piazzan, den perfekta lunchrestaurangen, till WTC Restaurang som serverar á la carte och affärslunch. För sittningar på tu man hand eller fest för många.</p><p>För bokning, ring 079-324 03 97 eller<a href=\"#\">maila oss</a>.</p></div><div id=\"map\" class=\"content\"><div" + (jade.attr("id", "maplarge" + (_id) + "", true, false)) + " style=\"width:100%, height:300px;\"" + (jade.attr("lat", "" + (lat) + "", true, false)) + (jade.attr("lon", "" + (lon) + "", true, false)) + "></div></div><div id=\"media\" class=\"content\"><p>Fourth panel content goes here...</p></div></div></div></div></section><!-- Small & Medium content--><section class=\"hide-for-large-up\"><section class=\"hero\"><div class=\"row main-content\"><div class=\"container\"><ul data-orbit=\"data-orbit\" data-options=\"bullets:false; timer: false; slide_number: false;\" class=\"hero-orbit\">");
for (var mkey in media) {
{
buf.push("<li><img" + (jade.attr("src", media[mkey].img, true, false)) + (jade.attr("alt", media[mkey].bildtext, true, false)) + "/></li>");
}
}
buf.push("</ul></div></div></section><section class=\"profileside\"><div class=\"row\"><div class=\"small-12 columns\"><h2>" + (jade.escape((jade.interp = Title) == null ? '' : jade.interp)) + "</h2></div></div><div class=\"row\"><div class=\"small-6 columns\"><h4>Kontakt</h4><ul class=\"companyinformation\"><li>" + (jade.escape((jade.interp = OrgName) == null ? '' : jade.interp)) + "</li><li>" + (jade.escape((jade.interp = TextField1) == null ? '' : jade.interp)) + "</li><li>" + (jade.escape((jade.interp = Address1) == null ? '' : jade.interp)) + "</li><li>" + (jade.escape((jade.interp = Zipcode) == null ? '' : jade.interp)) + " " + (jade.escape((jade.interp = City) == null ? '' : jade.interp)) + "</li></ul></div><div class=\"small-6 columns\"><ul class=\"companyinformation\"><li class=\"phonenumber\">" + (jade.escape((jade.interp = Phone) == null ? '' : jade.interp)) + "</li><li class=\"phonenumber paddingbottom\">" + (jade.escape((jade.interp = Mobile) == null ? '' : jade.interp)) + "</li><li><a href=\"#\" class=\"button expand\">Hemsida</a></li><li><a" + (jade.attr("href", 'mailto:' + (Email) + '', true, false)) + " class=\"button expand\">" + (jade.escape((jade.interp = Email) == null ? '' : jade.interp)) + "</a></li></ul></div><div class=\"small-12 columns\"><hr/></div><div class=\"small-12 columns\">");
var lokaler = ['53e1126ddf7d890000809785', '53e1127adf7d890000809786', '53e1128cdf7d890000809787', '53e1129edf7d890000809788', '53e112afdf7d890000809789', '53e112c0df7d89000080978a', '53e112dbdf7d89000080978b', '53e112eadf7d89000080978c', '53e112f9df7d89000080978d', '53e11308df7d89000080978e', '53e11316df7d89000080978f']; 
var isConf = false;
for (var cKey in newCategory) {
{
if (lokaler.indexOf(newCategory[cKey]['value']) !== -1) {
{
isConf = true;
}
}
}
}
if (isConf) {
{
buf.push("<h4>Fakta</h4><ul class=\"companyinformation\"><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-sallskap\"><use xlink:href=\"#icon-sallskap\"></use></svg><span class=\"icon-text\">Största sällskap: " + (jade.escape((jade.interp = LargestCompany) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-motesplatser\"><use xlink:href=\"#icon-motesplatser\"></use></svg><span class=\"icon-text\">Antal mötesrum: " + (jade.escape((jade.interp = NoMeetingRooms) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-moteslokal\"><use xlink:href=\"#icon-moteslokal\"></use></svg><span class=\"icon-text\">Största möteslokal: " + (jade.escape((jade.interp = LargestMeetingRoom) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mat\"><use xlink:href=\"#icon-mat\"></use></svg><span class=\"icon-text\">Sittande matgäster: " + (jade.escape((jade.interp = SittingGuests) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-mingel\"><use xlink:href=\"#icon-mingel\"></use></svg><span class=\"icon-text\">Mingel/stående: " + (jade.escape((jade.interp = MingleGuests) == null ? '' : jade.interp)) + "</span></i></li><li><i><svg viewbox=\"0 0 32 32\" class=\"icon icon-logi\"><use xlink:href=\"#icon-logi\"></use></svg><span class=\"icon-text\">Logi, antal bäddar: " + (jade.escape((jade.interp = NoBeds) == null ? '' : jade.interp)) + "</span></i></li></ul>");
}
}
buf.push("</div></div><div class=\"row\"><div class=\"small-12 columns profileinformation\"><dl data-accordion=\"data-accordion\" class=\"accordion\"><dd class=\"active\"><a href=\"#presentation\">Presentation</a><div id=\"presentation\" class=\"content\"><h2>" + (jade.escape((jade.interp = presTitle) == null ? '' : jade.interp)) + "</h2><p>" + (jade.escape((jade.interp = InfoText1) == null ? '' : jade.interp)) + "</p></div></dd>");
if (extraTabName) {
{
buf.push("<dd><a href=\"#extraheader\">" + (jade.escape((jade.interp = extraTabName) == null ? '' : jade.interp)) + "</a><div id=\"extraheader\" class=\"content\"><h2>" + (jade.escape((jade.interp = extraTitle) == null ? '' : jade.interp)) + "</h2><p>" + (jade.escape((jade.interp = extraText) == null ? '' : jade.interp)) + "</p></div></dd>");
}
}
buf.push("<dd><a href=\"#offer\">Erbjudanden</a><div id=\"offer\" class=\"content\"><img src=\"http://placehold.it/900x300\" alt=\"\"/><p>World Trade Center Stockgolm strävar efter det perfekta. Det perfekta läget. Det perfekta mötet. Det perfekta serviceutbudet.</p><p>Mitt i Stockholm city, 20 minuter från Arlandas landnings-och startbanor och på tröskeln till storstadens utbud, finns World Trade Center med kontor i toppklass och nyrenoverade effektiva konferenslokaler och eventlokaler. Med personal, service och faciliteter i perfekt anda</p><p>Med ambitionen att vara en av landets ledande arrangör av konferenser och möten erbjuder vi också välkompenerade menyer - dag som kväll. Från Piazzan, den perfekta lunchrestaurangen, till WTC Restaurang som serverar á la carte och affärslunch. För sittningar på tu man hand eller fest för många.</p><p>För bokning, ring 079-324 03 97 eller<a href=\"#\">maila oss</a>.</p><hr/><img src=\"http://placehold.it/900x300\" alt=\"\"/><p>World Trade Center Stockgolm strävar efter det perfekta. Det perfekta läget. Det perfekta mötet. Det perfekta serviceutbudet.</p><p>Mitt i Stockholm city, 20 minuter från Arlandas landnings-och startbanor och på tröskeln till storstadens utbud, finns World Trade Center med kontor i toppklass och nyrenoverade effektiva konferenslokaler och eventlokaler. Med personal, service och faciliteter i perfekt anda</p><p>Med ambitionen att vara en av landets ledande arrangör av konferenser och möten erbjuder vi också välkompenerade menyer - dag som kväll. Från Piazzan, den perfekta lunchrestaurangen, till WTC Restaurang som serverar á la carte och affärslunch. För sittningar på tu man hand eller fest för många.</p><p>För bokning, ring 079-324 03 97 eller<a href=\"#\">maila oss</a>.</p></div></dd><dd><a href=\"#map\">Karta</a><div id=\"map\" class=\"content\"><div" + (jade.attr("id", "mapmed" + (_id) + "", true, false)) + " style=\"width:100%, height:300px;\"></div></div></dd><dd><a href=\"#media\">Media</a><div id=\"media\" class=\"content\"><h2>Om World Trade Center</h2><p>World Trade Center Stockgolm strävar efter det perfekta. Det perfekta läget. Det perfekta mötet. Det perfekta serviceutbudet.</p><p>Mitt i Stockholm city, 20 minuter från Arlandas landnings-och startbanor och på tröskeln till storstadens utbud, finns World Trade Center med kontor i toppklass och nyrenoverade effektiva konferenslokaler och eventlokaler. Med personal, service och faciliteter i perfekt anda</p><p>Med ambitionen att vara en av landets ledande arrangör av konferenser och möten erbjuder vi också välkompenerade menyer - dag som kväll. Från Piazzan, den perfekta lunchrestaurangen, till WTC Restaurang som serverar á la carte och affärslunch. För sittningar på tu man hand eller fest för många.</p></div></dd></dl></div></div><div class=\"row\"><div class=\"small-12 columns\"><h4>Kategorier</h4><dl><dt>Aktiviteter<div class=\"listarrow\"></div></dt><dd>Mat & Dryckesaktiviteter</dd><dd>Motor</dd><dt>Event & Möteslokaler<div class=\"listarrow\"></div></dt><dd>Fest & Bröllopslokaler</dd><dd>Konferens</dd><dt>Konferenslokaler<div class=\"listarrow\"></div></dt><dd>Konferens</dd><dd>Fest/event</dd><dt>Underhållning<div class=\"listarrow\"></div></dt><dd>Magi/Trolleri</dd><dd>Standup</dd></dl></div></div></section></section><a class=\"close-reveal-modal\"><div class=\"rightribbon ribbon closeribbon show-for-medium-up\">× Stäng</div></a><a class=\"close-reveal-modal\"><div class=\"close hide-for-medium-up\">×</div></a></div>");;return buf.join("");
};