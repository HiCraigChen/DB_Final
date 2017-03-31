var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Capacity = function(options) {
  this.F_ID = options.F_ID;
  this.F_B_Number = options.F_B_Number;
  this.F_R_Number = options.F_R_Number;
  this.F_NAME = options.F_NAME;
  this.F_Level = options.F_Level;
  this.Capacity = options.Capacity;
  this.Management_Unit = options.Management_Unit;
  this.Maintainer_ID = options.Maintainer_ID;

};

Capacity.get = function(cb) {
  db.select()
    .from('facility_t')
    .where('capacity','>', 100)
    .map(function(row) {
      return new Capacity({
       F_ID : row.F_ID,
       F_B_Number : row.F_B_Number,
       F_R_Number : row.F_R_Number,
       F_NAME : row.F_NAME,
       F_Level : row.F_Level,
       Capacity : row.Capacity,
       Management_Unit : row.Management_Unit,
       Maintainer_ID : row.Maintainer_ID

      });
    })
    .then(function(CapacityList) {
      cb(null, CapacityList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}


module.exports = Capacity;
