var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var DateB = function(options) {
  this.F_ID = options.F_ID;
  this.Date = options.Date;
  this.Time = options.Time;
  this.Available = options.Available;
  this.Management_Unit=options.Management_Unit;
  this.F_NAME = options.F_NAME;
  this.Capacity=options.Capacity;
 
  
};

DateB.get = function(cb) {
  db  .select('facility_t.F_NAME','facility_t.Capacity','Available','Management_Unit','facilitytime_t.F_ID','facilitytime_t.Date','facilitytime_t.Time') 
    .from('facilitytime_t').join('facility_t',function(){this.on('facility_t.F_ID','=','facilitytime_t.F_ID')
      .andOn('facility_t.Capacity','>',20)})
    .whereBetween('Date',['2016-06-09','2016-06-10'])
    .where('facility_t.F_B_Name','=','綜合院館')
    .groupBy('facility_t.F_NAME')
    .sum('Available as Available')


  
    

    .map(function(row) {
      return new DateB({
       F_ID : row.F_ID,
       Date :row.Date,
       Time :row.Time,
       Available : row.Available,
       Capacity:row.Capacity,
       F_NAME: row.F_NAME,
       Management_Unit: row.Management_Unit,
       Capacity:row.Capacity

      

      });
    })
    .then(function(DateBetweenList) {
      cb(null, DateBetweenList);
    })
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

DateB.getAll = function(dateBegin, dateEnd,cb) {
  db  .select('facility_t.F_NAME','facility_t.Capacity','Available','Management_Unit','facilitytime_t.F_ID','facilitytime_t.Date','facilitytime_t.Time') 
    .from('facilitytime_t').join('facility_t',function(){this.on('facility_t.F_ID','=','facilitytime_t.F_ID')
      .andOn('facility_t.Capacity','>',20)})
    .whereBetween('Date',[dateBegin,dateEnd])
    .where('facility_t.F_B_Name','=','綜合院館')
    .groupBy('facility_t.F_NAME')
    .sum('Available as Available')
    .map(function(row) {
      return new DateB({
       F_ID : row.F_ID,
       Date :row.Date,
       Time :row.Time,
       Available : row.Available,
       Capacity:row.Capacity,
       F_NAME: row.F_NAME,
       Management_Unit: row.Management_Unit,
       Capacity:row.Capacity
      });
    })
    .then(function(DateBetweenList) {
      cb(null, DateBetweenList);

    }.bind(this))
    .catch(function(err) {
      cb(new GeneralErrors.Database());
    });
}

module.exports = DateB;


