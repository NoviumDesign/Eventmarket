

var pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
/**
 * Mimix sql date format YYYY-MM-DD HH:II:SS
 * @return {string} Formatted date
 */
var sqlDateFormat = function(time)
{
  if (time instanceof Date) {
    return time.getFullYear()+
      '-'+pad((time.getMonth()+1), 2)+
      '-'+pad(time.getDate(), 2)+
      ' '+pad(time.getHours(), 2)+
      ':'+pad(time.getMinutes(), 2)+
      ':'+pad(time.getSeconds(),2);
  }
}

module.exports.sqlDateFormat = sqlDateFormat;

