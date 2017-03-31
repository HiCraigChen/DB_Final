var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Used = function(options) {
  this.F_ID = options.F_ID;
  this.Time = options.Time;
  this.Date = options.Date;
  this.Available = options.Available;
};

Used.get = function(cb) {
  db.select()
    .from('FacilityTime_T')
    .where({
      F_ID : '215',
      Date : '2016-06-09'
    })
    .map(function(row) {
      return new Used({
        F_ID : row.F_ID,
        Time : row.Time,
        Date : row.Date,
        Available : row.Available //這邊剛剛忘記修正了
      });
    })
    .then(function(UsedList) {
      cb(null, UsedList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

// Used.get = function(F_ID, cb) {
//   db.select()
//     .from('FacilityTime_T')
//     .where({
//       id : F_ID
//     })
//     .map(function(row) {
//       return new Used({
//         F_ID : row.F_ID,
//         Time : row.Time,
//         Available : row.Available
//       });
//     })
//     .then(function(UsedList) {
//       if(UsedList.length) {
//         cb(null, UsedList[0]);
//       } else {
//         cb(null, new GeneralErrors.NotFound());
//       }
//     })
//     .catch(function(err) {
//       console.log(err);
//       cb(new GeneralErrors.Database());
//     });
// }

module.exports = Used;
